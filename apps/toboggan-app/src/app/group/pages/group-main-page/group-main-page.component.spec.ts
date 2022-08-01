import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ModalButtonConfig, StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { ModalModule } from "ngx-bootstrap/modal";
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { of } from 'rxjs';
import { UserService } from '../../../shared/services/user/user.service';
import { AddUsersComponent } from '../../components/add-users/add-users.component';
import { CreateGroupComponent } from '../../components/create-group/create-group.component';
import { GroupService } from '../../services/group.service';
import { GroupMainPageComponent } from './group-main-page.component';

const mockUsers = [{ 
  username: 'user1', 
  firstName: 'name1', 
  lastName: 'last1', 
  email: 'email1@sada.com',
  groups: [],
 }, { 
  username: 'user2', 
  firstName: 'name2', 
  lastName: 'last2', 
  email: 'email2@sada.com',
  groups: [],
 }
];

const mockModalService = { 
  show: jest.fn(),
  _hideModal: jest.fn()
};

const mockUserService = { 
  fetchUsers: jest.fn().mockReturnValue(of(mockUsers))
};

const mockGroupService = {
  createGroup: jest.fn(),
  addUsertoGroup: jest.fn().mockReturnValue(of({}))
}
describe('GroupMainPageComponent', () => {
  let component: GroupMainPageComponent;
  let fixture: ComponentFixture<GroupMainPageComponent>;
  let createGroupFixture: ComponentFixture<CreateGroupComponent>;
  let createGroupComponent: CreateGroupComponent;
  let createGroupButton: ModalButtonConfig;
  let cancelButton: ModalButtonConfig;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [
        StoriesModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
        TypeaheadModule.forRoot(),

      ],
      declarations: [GroupMainPageComponent, CreateGroupComponent,AddUsersComponent],
      providers: [
        { provide : UserService, useValue: mockUserService},
        { provide: GroupService, useValue: mockGroupService} 
      ]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ AddUsersComponent ],
      }
    }).compileComponents();

    fixture = TestBed.createComponent(GroupMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    createGroupFixture = TestBed.createComponent(CreateGroupComponent);
    createGroupComponent = createGroupFixture.componentInstance;
    component.createGroupComponent = createGroupComponent;
   
    createGroupButton =  component.modalButtons.find(
      (button) => button.title === 'Create user group'
    ) as ModalButtonConfig;

    cancelButton =  component.modalButtons.find(
      (button) => button.title === 'Cancel'
    ) as ModalButtonConfig;
    createGroupFixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Modal buttons should be configured', () => {
    expect(createGroupButton).toBeTruthy();
    expect(cancelButton).toBeTruthy();
  });

  it(' "Create user group" modal button calls createGroup on CreateGroupComponent', () => {
    const createGroupSpy = jest.spyOn(
      component.createGroupComponent,
      'createGroup'
    );
    createGroupButton?.onClick();
    expect(createGroupSpy).toHaveBeenCalled();
  });

  it('Cancel modal button is configured to call hideModal', () => {
    const hideModalSpy = jest.spyOn(component, 'hideModal');
    cancelButton?.onClick();
    expect(hideModalSpy).toHaveBeenCalled();
  });

  it('should open "Add user to this group" modal once user successfully submits "Create Group" form',()  => {
    const group = {
      name: 'new test group',
      description: 'test description',
      addUser : true
    };
    const createGroupSpy = jest.spyOn(component.createGroupComponent, 'createGroup');
    const openAddUserModalSpy = jest.spyOn(component,'openAddUserModal');
    expect(component.addUserModalRef).toBeUndefined();
    
    component.createGroupComponent.createGroupForm.setValue(group);
    createGroupButton?.onClick();
    expect(createGroupSpy).toHaveBeenCalled();
    expect(openAddUserModalSpy).toHaveBeenCalled();
  });

  
  it('should call submit function when user clicks on "Add user" button ',(()=>{
    const modalSpy = jest.spyOn(component, 'openAddUserModal');
    component.openAddUserModal();
    fixture.detectChanges();
    const addUserFixture = TestBed.createComponent(AddUsersComponent);
    const addUserComponent = addUserFixture.componentInstance;
    component.addUserComponent = addUserComponent;
    component.addUserComponent.ngOnInit();
    addUserComponent.addUserForm.setValue({
      "user": "email2@sada.com", 
      "groupId": "2AE9GWE5E1A9",
    });
    const addUsertoGroupSpy = jest.spyOn(component.addUserComponent, 'addUsertoGroup');
    addUserFixture.detectChanges();
    const button  = document.querySelector('modal-container button.gp-button-primary');
    button?.dispatchEvent(new Event('click'));
    
    addUserFixture.detectChanges();
    expect(addUsertoGroupSpy).toHaveBeenCalled();

    // Check if whether API call is fired
    const apiCallspy = jest.spyOn(mockGroupService,'addUsertoGroup');
    expect(apiCallspy).toHaveBeenCalled();

  }));

  
});