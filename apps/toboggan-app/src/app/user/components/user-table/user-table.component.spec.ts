import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  StoriesModule,
  TableComponent
} from '@snhuproduct/toboggan-ui-components-library';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { of } from 'rxjs';
import { ModalAlertService } from '../../../shared/services/modal-alert/modal-alert.service';
import { UserService } from '../../../shared/services/user/user.service';
import { mockUsers } from './mock/usersMock';
import { UserTableComponent } from './user-table.component';

const mockUserService = {
  fetchUsers: jest.fn().mockReturnValue(of(mockUsers)),
};

describe('UserTableComponent', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;
  let modalAlertService: ModalAlertService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserTableComponent, TableComponent],
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: UserService,
          useValue: mockUserService,
        }
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        BsDropdownModule,
        FormsModule,
        CollapseModule,
        StoriesModule,
      ],
    }).compileComponents();

    modalAlertService = TestBed.inject(ModalAlertService);
    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all users, on start', () => {
    const fetchUsers = jest.spyOn(mockUserService, 'fetchUsers');

    expect(fetchUsers).toHaveBeenCalled();

    expect(component.getAllRows()).toHaveLength(mockUsers.length);
  });

  it('reset password should bring the confirmation modal', () => {
    const spy = jest.spyOn(modalAlertService, 'showModalAlert');
    component.resetPassword('id','first','last');
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({
      'heading': `Reset user's password?`, 
     }))
  })  

  it('activate user should bring the confirmation modal', () => {
    const spy = jest.spyOn(modalAlertService, 'showModalAlert');
    component.activateUser('id',{firstName:'first', lastName:'last', email:'email'});
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({
      'heading': `Activate this user?`, 
     }))
  }) 

  it('de-activate user should bring the confirmation modal', () => {
    const spy = jest.spyOn(modalAlertService, 'showModalAlert');
    component.deactivateUser('id',{firstName:'first', lastName:'last', email:'email'});
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({
      'heading': `Deactivate this user?`, 
     }))
  }) 
});
