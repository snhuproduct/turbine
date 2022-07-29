import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserService } from '../../../shared/services/user/user.service';
import { GroupService } from '../../services/group.service';

import { AddUsersComponent } from './add-users.component';

describe('AddUsersComponent', () => {
  let component: AddUsersComponent;
  let fixture: ComponentFixture<AddUsersComponent>;
  const mockUserService = { 
    fetchUsers: jest.fn().mockReturnValue(of([]))
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
    expect(component).toBeTruthy();
  });


});
