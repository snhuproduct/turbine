import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  StoriesModule,
  TableComponent,
} from '@snhuproduct/toboggan-ui-components-library';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { of } from 'rxjs';
import { UserService } from '../../../shared/services/user/user.service';
import { mockUsers } from './mock/usersMock';
import { UserTableComponent } from './user-table.component';

const mockUserService = {
  fetchUsers: jest.fn().mockReturnValue(of(mockUsers)),
};

describe('UserTableComponent', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserTableComponent, TableComponent],
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: UserService,
          useValue: mockUserService,
        },
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

    expect(component.dynamicRowData).toHaveLength(mockUsers.length);
  });
});
