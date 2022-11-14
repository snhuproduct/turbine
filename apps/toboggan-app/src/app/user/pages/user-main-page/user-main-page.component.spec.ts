import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { ReactiveFormsModule } from '@angular/forms';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../../shared/services/user/user.service';
import { SharedModule } from '../../../shared/shared.module';
import { CreateUserComponent } from '../../components/create-user/create-user.component';
import { EditUserComponent } from '../../components/edit-user/edit-user.component';
import { mockUsers } from '../../components/user-table/mock/usersMock';
import { UserTableComponent } from '../../components/user-table/user-table.component';

import { UserMainPageComponent } from './user-main-page.component';

describe('UserMainPageComponent', () => {
  let component: UserMainPageComponent;
  let fixture: ComponentFixture<UserMainPageComponent>;

  const mockUserService = {
    fetchUsers: jest.fn().mockReturnValue(of(mockUsers)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserMainPageComponent,
        CreateUserComponent,
        EditUserComponent,
        UserTableComponent,
      ],
      imports: [
        StoriesModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        SharedModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
        { provide: UserService, useValue: mockUserService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Modal buttons should be configured', () => {
    const addNewUserButton = component.createUserModalButtonsConfig.find(
      (button) => button.title === 'Add new user'
    );
    expect(addNewUserButton).toBeTruthy();

    const cancelButton = component.createUserModalButtonsConfig.find(
      (button) => button.title === 'Cancel'
    );
    expect(cancelButton).toBeTruthy();
  });

  it('Add New User modal button calls handleAddNewUserModalButton on User Component', () => {
    // arrange
    const createUserFixture = TestBed.createComponent(CreateUserComponent);
    const createUserComponent = createUserFixture.componentInstance;
    createUserFixture.detectChanges();
    component.createUserModal = createUserComponent;
    const addNewUserButton = component.createUserModalButtonsConfig.find(
      (button) => button.title === 'Add new user'
    );
    const spy = jest.spyOn(
      component.createUserModal,
      'handleAddNewUserModalButton'
    );

    // act
    addNewUserButton?.onClick();

    // assert
    expect(spy).toHaveBeenCalled();
  });

  it('handleCancelCreateUserModalButton true to close the modal', () => {
    expect(component.handleCancelCreateUserModalButton()).toBeTruthy();
  });

  it('Cancel modal button is configured to call handleCancelCreateUserModalButton', () => {
    const cancelButton = component.createUserModalButtonsConfig.find(
      (button) => button.title === 'Cancel'
    );
    const spy = jest.spyOn(component, 'handleCancelCreateUserModalButton');
    cancelButton?.onClick();
    expect(spy).toHaveBeenCalled();
  });
});
