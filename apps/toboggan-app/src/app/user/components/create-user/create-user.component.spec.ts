import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';

import { CreateUserComponent } from './create-user.component';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUserComponent],
      imports: [StoriesModule, ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return handle to itself if callback is supplied', () => {    
    component.returnHandle = jest.fn();
    component.ngAfterViewInit();
    expect(component.returnHandle).toHaveBeenCalledWith(component); 
  } )

  it('hasError should return false if control name is not found in the form', () => {
    expect(component.hasError('nonExistingControlName')).toBeFalsy();
  })

  it('for invalid email adddress getError should return appropriate message', () => {
    component.userForm.setValue({
      "firstName": "", 
      "lastName": "",
      "email": "invalidemail"
    });
    expect(component.getErrorMessage('email', 'Email')).toEqual('Email format is invalid');
  })

  it('when control is valid getError should return empty string', () => {
    component.userForm.setValue({
      "firstName": "Bob", 
      "lastName": "",
      "email": ""
    });
    expect(component.getErrorMessage('firstName', 'First Name')).toEqual('');
  })
});
