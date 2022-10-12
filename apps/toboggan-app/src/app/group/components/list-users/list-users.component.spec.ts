import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  StoriesModule,
  TableComponent,
} from '@snhuproduct/toboggan-ui-components-library';
import { of } from 'rxjs';
import { ModalAlertService } from '../../../shared/services/modal-alert/modal-alert.service';
import { UserService } from '../../../shared/services/user/user.service';
import { ListUsersComponent } from './list-users.component';
import { mockUsers } from './mock/usersMock';

const mockUserService = {
  fetchUsers: jest.fn().mockReturnValue(of(mockUsers)),
};

describe('ListUsersComponent', () => {
  let component: ListUsersComponent;
  let fixture: ComponentFixture<ListUsersComponent>;
  let modalAlertService: ModalAlertService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
      imports: [StoriesModule, BrowserModule, BrowserAnimationsModule],
      declarations: [ListUsersComponent, TableComponent],
    }).compileComponents();

    modalAlertService = TestBed.inject(ModalAlertService);
    fixture = TestBed.createComponent(ListUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render all users', () => {
    const fetchUsers = jest.spyOn(mockUserService, 'fetchUsers');
    expect(fetchUsers).toHaveBeenCalled();
    expect(component.getAllRows()).toHaveLength(mockUsers.length);
  });
  it('remove user should bring the confirmation modal', () => {
    const spy = jest.spyOn(modalAlertService, 'showModalAlert');
    component.openRemoveUserConfirmation({id:123,firstName:'first', lastName:'last', email:'email'});
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({
      'heading': `Remove user from this group?`, 
     }))
});
})