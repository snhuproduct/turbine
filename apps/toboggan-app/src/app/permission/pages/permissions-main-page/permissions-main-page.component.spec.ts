import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsMainPageComponent } from './permissions-main-page.component';

describe('PermissionsMainPageComponent', () => {
  let component: PermissionsMainPageComponent;
  let fixture: ComponentFixture<PermissionsMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PermissionsMainPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionsMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
