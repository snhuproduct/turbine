import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { of } from 'rxjs';
import { TableDataService } from '../../../shared/services/table-data/table-data.service';
import { PermissionService } from '../../services/permission.service';
import { permissionTableHeader } from './permission-table-header';
import { mockPermissions } from './permission-test.mock';

import { PermissionsListComponent } from './permissions-list.component';

describe('PermissionsListComponent', () => {
  let component: PermissionsListComponent;
  let fixture: ComponentFixture<PermissionsListComponent>;
  const mockPermissionService = {
    fetchPermissions: jest.fn().mockReturnValue(of(mockPermissions)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoriesModule, NoopAnimationsModule, RouterTestingModule],
      declarations: [PermissionsListComponent],
      providers: [
        TableDataService,
        { provide: PermissionService, useValue: mockPermissionService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service for fetching permissions', () => {
    const fetchGroups = jest.spyOn(mockPermissionService, 'fetchPermissions');
    fixture.detectChanges();
    expect(fetchGroups).toHaveBeenCalled();
  });

  it('should render list of permissions', () => {
    fixture.detectChanges();

    fixture.whenRenderingDone().then(() => {
      const tableHeaders = fixture.debugElement.queryAll(
        By.css('.gp-table-x-table thead th')
      );
      const tableRows = fixture.debugElement.queryAll(
        By.css('.gp-table-x-table tbody tr')
      );
      expect(tableHeaders.length).toBe(permissionTableHeader.length + 1);
      expect(tableRows.length).toBe(10);
    });
  });
});
