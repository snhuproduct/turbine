import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { CreateUserComponent } from '../../components/create-user/create-user.component';

import { UserMainPageComponent } from './user-main-page.component';

describe('UserMainPageComponent', () => {
  let component: UserMainPageComponent;
  let fixture: ComponentFixture<UserMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserMainPageComponent, CreateUserComponent],
      imports: [StoriesModule, NoopAnimationsModule,ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UserMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Modal buttons should be configured', () => {
    const addNewUserButton = component.createUserModalButtonsConfig.find(button => button.title === 'Add New User');
    expect(addNewUserButton).toBeTruthy();

    const cancelButton = component.createUserModalButtonsConfig.find(button => button.title === 'Cancel');
    expect(cancelButton).toBeTruthy();
  });

  it('Add New User modal button calls handleAddNewUserModalButton on User Component', () => {
    // arrange
    const createUserFixture = TestBed.createComponent(CreateUserComponent);
    const createUserComponent = createUserFixture.componentInstance;
    createUserFixture.detectChanges();
    component.createUserComponent = createUserComponent
    const addNewUserButton = component.createUserModalButtonsConfig.find(button => button.title === 'Add New User');  
    const spy = jest.spyOn(component.createUserComponent, 'handleAddNewUserModalButton');

    // act
    addNewUserButton?.onClick();

    // assert
    expect(spy).toHaveBeenCalled();
  })

  it('handleCancelCreateUserModalButton true to close the modal', () => {
    expect(component.handleCancelCreateUserModalButton()).toBeTruthy();
  })

  it('Cancel modal button is configured to call handleCancelCreateUserModalButton', () => {
    const cancelButton = component.createUserModalButtonsConfig.find(button => button.title === 'Cancel'); 
    const spy = jest.spyOn(component, 'handleCancelCreateUserModalButton');
    cancelButton?.onClick();
    expect(spy).toHaveBeenCalled();
  })
});
