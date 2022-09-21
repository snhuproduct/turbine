import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { SharedModule } from '../../../shared/shared.module';
import { PermissionsListComponent } from '../../components/permissions-list/permissions-list.component';

import { PermissionsMainPageComponent } from './permissions-main-page.component';

describe('PermissionsMainPageComponent', () => {
  let component: PermissionsMainPageComponent;
  let fixture: ComponentFixture<PermissionsMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoriesModule,
        NoopAnimationsModule,
        SharedModule,
        RouterTestingModule,
      ],
      declarations: [PermissionsMainPageComponent, PermissionsListComponent],
      providers: [HttpClient, HttpHandler],
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionsMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
