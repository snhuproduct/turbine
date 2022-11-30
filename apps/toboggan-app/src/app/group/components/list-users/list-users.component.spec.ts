import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  StoriesModule,
  TableComponent,
  TableRow,
} from '@snhuproduct/toboggan-ui-components-library';
import { of } from 'rxjs';
import { BannerService } from '../../../shared/services/banner/banner.service';
import { ModalAlertService } from '../../../shared/services/modal-alert/modal-alert.service';
import { UserService } from '../../../shared/services/user/user.service';
import { userTableHeader } from './data/user-table-header';
import { ListUsersComponent } from './list-users.component';
import { mockUsers } from './mock/usersMock';
import { RowActions } from './types/list-users.type';

const mockUserService = {
  fetchUsers: jest.fn().mockReturnValue(of(mockUsers)),
};
describe('ListUsersComponent with empty results ', () => {
  let component: ListUsersComponent;
  let fixture: ComponentFixture<ListUsersComponent>;
  const mockEmptyUserService = {
    fetchUsers: jest.fn().mockReturnValue(of([])),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: UserService,
          useValue: mockEmptyUserService,
        },
        BannerService,
      ],
      imports: [StoriesModule, BrowserModule, BrowserAnimationsModule],
      declarations: [ListUsersComponent, TableComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ListUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service for fetching users', () => {
    const fetchUsers = jest.spyOn(mockEmptyUserService, 'fetchUsers');
    fixture.detectChanges();
    expect(fetchUsers).toHaveBeenCalled();
  });

  it('table should show "No Results Found" when no groups are available', () => {
    const noResultsContainer = fixture.debugElement.query(
      By.css('.gp-table-x-noresults')
    );
    expect(noResultsContainer).toBeDefined();
  });
});
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
  it('should render list of users', () => {
    fixture.detectChanges();

    fixture.whenRenderingDone().then(() => {
      const tableHeaders = fixture.debugElement.queryAll(
        By.css('.gp-table-x-table thead th')
      );
      const tableRows = fixture.debugElement.queryAll(
        By.css('.gp-table-x-table tbody tr')
      );
      expect(tableHeaders.length).toBe(userTableHeader.length + 1);
      expect(tableRows.length).toBeGreaterThan(0);
    });
  });
  it('remove user should bring the confirmation modal', () => {
    const spy = jest.spyOn(modalAlertService, 'showModalAlert');
    component.openRemoveUserConfirmation({
      id: 123,
      firstName: 'first',
      lastName: 'last',
      email: 'email',
    });
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        heading: `Remove user from this group?`,
      })
    );
  });

  it('should getAllRows returns an array', () => {
    expect(component.getAllRows().length).toBe(0);
  });

  it('should getActionMenuItems returns an array', () => {
    expect(component.getActionMenuItems({} as TableRow)).toEqual([
      RowActions.Remove,
    ]);
  });

  it('should formatTableRowsWithUserData returns an array with sort', () => {
    const data = [
      {
        userType: 'type',
        status: 'status',
        userId: 'userid',
        userName: 'username',
        firstName: 'beena',
        lastName: 'babish',
        email: 'email',
        groups: [],
        userGroups: [],
        enabled: true,
      },
      {
        userType: 'type',
        status: 'status',
        userId: 'userid',
        userName: 'username',
        firstName: 'anand',
        lastName: 'ajith',
        email: 'email',
        groups: [],
        userGroups: [],
        enabled: true,
      },
    ];
    expect(
      component.formatTableRowsWithUserData(data)[0].cellData['first']
    ).toBe('anand');
    expect(
      component.formatTableRowsWithUserData(data)[1].cellData['first']
    ).toBe('beena');
  });

  it('should check onRowAction with error', () => {
    const event = { action: 'remove', rowId: '1' };
    component.dataGenerator.rowData = [{ rowId: '0', cellData: {} }];
    expect(() => {
      component.onRowAction(event);
    }).toThrow('Could not find rowData for rowId: 1');
  });

  it('should check onRowAction without error for remove', () => {
    const spy = jest.spyOn(component, 'openRemoveUserConfirmation');
    const event = { action: 'remove', rowId: '0' };
    component.dataGenerator.rowData = [{ rowId: '0', cellData: {} }];
    component.onRowAction(event);
    expect(spy).toBeCalled();
  });

  it('should check removeuser', () => {
    const spy = jest.spyOn(modalAlertService, 'hideModalAlert');
    const user = { first: 'first', last: 'last' };
    component.removeUser(user);
    expect(spy).toBeCalledTimes(1);
  });
});
