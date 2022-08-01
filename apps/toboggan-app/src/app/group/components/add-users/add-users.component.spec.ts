import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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

  it('should show autocomplete for user email address',() => {
    // const autoComplete = fixture.debugElement.query(By.css('input'));
    // console.log(component.users);
    // autoComplete.nativeElement.value = 'email';
    // const evt = new Event('input', {bubbles: true, cancelable: false});
    // autoComplete.nativeElement.dispatchEvent(evt);

    const el: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const testValue = 'some_value';

    el.value = testValue;
    el.dispatchEvent(new Event('input'));
    
    fixture.detectChanges();
    fixture.whenStable().then(()=> {
      console.log(component.addUserForm.value);
    });
    
    // fixture.componentInstance.addUserForm.patchValue({'user' : 'email'});
    // console.log(autoComplete);
    expect(component).toBeTruthy();
  });


});
