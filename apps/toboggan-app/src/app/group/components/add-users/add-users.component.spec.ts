import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { IGroup } from '@toboggan-ws/toboggan-common';
import { mock, MockProxy } from 'jest-mock-extended';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { of } from 'rxjs';
import { BannerService } from '../../../shared/services/banner/banner.service';
import { UserService } from '../../../shared/services/user/user.service';
import { SharedModule } from '../../../shared/shared.module';
import { GroupService } from '../../services/group.service';
import { AddUsersComponent } from './add-users.component';

const mockUsers = [
  {
    userType: 'type',
    userName: 'user1',
    status: 'status',
    userId: 'userid1',
    firstName: 'name1',
    lastName: 'last1',
    email: 'email1@sada.com',
    groups: [],
    userGroups: [],
    enabled: true
  },
  {
    userType: 'type',
    userName: 'user2',
    status: 'status',
    userId: 'userid2',
    firstName: 'name2',
    lastName: 'last2',
    email: 'email2@sada.com',
    groups: [],
    userGroups: [],
    enabled: true
  },
];

describe('AddUsersComponent', () => {
  let component: AddUsersComponent;
  let fixture: ComponentFixture<AddUsersComponent>;
  let groupService: GroupService;
  const mockUserService = {
    fetchUsers: jest.fn().mockReturnValue(of(mockUsers)),
  };
  const mockGroupService: MockProxy<GroupService> = mock<GroupService>();

  const mockBannerService = {
    showBanner: jest.fn().mockReturnValueOnce(of(true)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoriesModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule,
        TypeaheadModule.forRoot(),
      ],
      declarations: [AddUsersComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: GroupService, useValue: mockGroupService },
        { provide: BannerService, useValue: mockBannerService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUsersComponent);
    groupService = TestBed.inject(GroupService);
    component = fixture.componentInstance;
    component.group = {
      uuid: '2AE9GWE5E1A9',
      name: 'group1',
      description: 'desc',
    } as IGroup;
    fixture.detectChanges();
  });

  it('should create', () => {
    const getUsersSpy = jest.spyOn(component, 'getUsers');
    expect(component).toBeTruthy();
    component.ngOnInit();
    expect(getUsersSpy).toHaveBeenCalled();
  });

  it('should show validation when user submits on empty input ', () => {
    component.addUserForm.setValue({
      user: '',
      groupId: '2AE9GWE5E1A9',
    });
    expect(component.getFormError('user')).toEqual("This field can't be empty");
  });

  it('should show validation when user submits on invalid email ', () => {
    component.addUserForm.setValue({
      user: 'abc',
      groupId: '2AE9GWE5E1A9',
    });
    expect(component.getFormError('user')).toEqual('Check email format');
  });

  it('should show validation when user submits on invalid user ', () => {
    component.addUserForm.setValue({
      user: 'a@a.com',
      groupId: '2AE9GWE5E1A9',
    });
    expect(component.getFormError('user')).toEqual(
      'No user found with that email'
    );
  });

  it('should call update call updategroup with valid user ', () => {
    const approveGroupSpy = jest.spyOn(groupService, 'updateGroup');
    component.addUserForm.setValue({
      user: 'email1@sada.com',
      groupId: '2AE9GWE5E1A9',
    });
    component.users = mockUsers;
    component.userEmails = mockUsers.map((user) => user.email as string);
    component.addUsertoGroup();
    expect(component.addUserForm.valid).toBeTruthy();
    expect(approveGroupSpy).toHaveBeenCalledWith(
      component.group,
      component.group.uuid
    );
  });

  it('Should call banner service after user is added', async () => {
    const showBannerSpy = jest.spyOn(mockBannerService, 'showBanner');
    component.addUserForm.setValue({
      user: 'email1@sada.com',
      groupId: '2AE9GWE5E1A9',
    });
    component.users = mockUsers;
    component.userEmails = mockUsers.map((user) => user.email as string);
    await component.addUsertoGroup();
    expect(showBannerSpy).toBeCalled();
  });

  it('should no validation error when user submits valid user email', () => {
    component.addUserForm.setValue({
      user: 'email2@sada.com',
      groupId: '2AE9GWE5E1A9',
    });
    expect(component.getFormError('user')).toEqual('');
  });
});
