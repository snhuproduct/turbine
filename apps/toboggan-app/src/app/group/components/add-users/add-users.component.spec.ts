import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserService } from '../../../shared/services/user/user.service';
import { GroupService } from '../../services/group.service';
import { AddUsersComponent } from './add-users.component';


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

describe('AddUsersComponent', () => {
  let component: AddUsersComponent;
  let fixture: ComponentFixture<AddUsersComponent>;
  const mockUserService = { 
    fetchUsers: jest.fn().mockReturnValue(of(mockUsers))
  };
  const mockGroupService = { 
    createGroup : jest.fn().mockReturnValue(of([])), 
    addUsertoGroup: jest.fn().mockReturnValue(of([]))
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUsersComponent],
      providers : [
        { provide : UserService, useValue: mockUserService},
        { provide : GroupService, useValue: mockGroupService}
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const getUsersSpy = jest.spyOn(component,'getUsers');
    expect(component).toBeTruthy();
    component.ngOnInit();
    expect(getUsersSpy).toHaveBeenCalled()
  });

  it('should show validation when user submits on empty input ',() => {
    
    component.addUserForm.setValue({
      "user": "", 
      "groupId": "2AE9GWE5E1A9",
    });
    expect(component.getFormError('user')).toEqual("This field can't be empty");
  });

  it('should show validation when user submits on invalid email ',() => {
    
    component.addUserForm.setValue({
      "user": "abc", 
      "groupId": "2AE9GWE5E1A9",
    });
    expect(component.getFormError('user')).toEqual("Check email format");
  });

  it('should show validation when user submits on invalid user ',() => {
    
    component.addUserForm.setValue({
      "user": "a@a.com", 
      "groupId": "2AE9GWE5E1A9",
    });
    expect(component.getFormError('user')).toEqual("This email doesn't exist");
  });

  it('should no validation error when user submits valid user email',() => {
    
    component.addUserForm.setValue({
      "user": "email2@sada.com", 
      "groupId": "2AE9GWE5E1A9",
    });
    expect(component.getFormError('user')).toEqual("");
  });


});
