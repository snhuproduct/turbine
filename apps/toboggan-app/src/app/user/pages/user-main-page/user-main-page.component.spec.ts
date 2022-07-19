import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMainPageComponent } from './user-main-page.component';

describe('UserMainPageComponent', () => {
  let component: UserMainPageComponent;
  let fixture: ComponentFixture<UserMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserMainPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
