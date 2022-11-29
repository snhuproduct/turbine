import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { of } from 'rxjs';
import { UserService } from '../../../shared/services/user/user.service';
import { SharedModule } from '../../../shared/shared.module';
import { AddUsersComponent } from '../../components/add-users/add-users.component';
import { CreateGroupComponent } from '../../components/create-group/create-group.component';
import { GroupListComponent } from '../../components/group-list/group-list.component';
import { GroupService } from '../../services/group.service';
import {
  groupActionType,
  GroupMainPageComponent,
} from './group-main-page.component';

const mockUsers = [
  {
    username: 'user1',
    firstName: 'name1',
    lastName: 'last1',
    email: 'email1@sada.com',
    groups: [],
  },
  {
    username: 'user2',
    firstName: 'name2',
    lastName: 'last2',
    email: 'email2@sada.com',
    groups: [],
  },
];

const mockUserService = {
  fetchUsers: jest.fn().mockReturnValue(of(mockUsers)),
};

const mockGroupService = {
  createGroup: jest.fn().mockReturnValue(of({})),
  addUsertoGroup: jest.fn().mockReturnValue(of({})),
  fetchGroups: jest.fn().mockReturnValue(of({})),
};
describe('GroupMainPageComponent', () => {
  let component: GroupMainPageComponent;
  let fixture: ComponentFixture<GroupMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoriesModule,
        SharedModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
        TypeaheadModule.forRoot(),
      ],
      declarations: [
        GroupMainPageComponent,
        CreateGroupComponent,
        AddUsersComponent,
        GroupListComponent,
      ],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: GroupService, useValue: mockGroupService },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of([{ id: 1 }]),
          },
        },
        {
          provide: Router,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open create group modal', () => {
    const createGroupBtn = fixture.debugElement.query(
      By.css('.create-group-btn')
    ).nativeElement;
    createGroupBtn.click();
    fixture.detectChanges();
    expect(component.showCreategroup).toBeTruthy();
  });

  it('should open add user to group modal', () => {
    const event: groupActionType = {
      group: {
        id: 'group-10',
        name: 'group name 0',
        description: 'description',
        uuid: 'uuid',
        members: [],
        permissions: [],
      },
      addUser: true,
    };
    component.handleGroupCreateAction(event);
    expect(component.showAddUserModal).toBeTruthy();
    expect(component.dummyGroup).toBe(event.group);
  });
});
