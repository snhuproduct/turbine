import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { of } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { mockPermissions } from '../../components/permissions-list/permission-test.mock';
import { PermissionsListComponent } from '../../components/permissions-list/permissions-list.component';
import { PermissionService } from '../../services/permission.service';

import { PermissionsMainPageComponent } from './permissions-main-page.component';

describe('PermissionsMainPageComponent', () => {
  let component: PermissionsMainPageComponent;
  let fixture: ComponentFixture<PermissionsMainPageComponent>;

  const mockPermissionService = {
    fetchPermissions: jest.fn().mockReturnValue(of(mockPermissions)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoriesModule,
        NoopAnimationsModule,
        SharedModule,
        RouterTestingModule,
      ],
      declarations: [PermissionsMainPageComponent, PermissionsListComponent],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: PermissionService, useValue: mockPermissionService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionsMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
