import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { SharedModule } from '../../../shared/shared.module';

import { UserMainPageComponent } from './user-main-page.component';

describe('UserMainPageComponent', () => {
  let component: UserMainPageComponent;
  let fixture: ComponentFixture<UserMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoriesModule, BrowserAnimationsModule, SharedModule],
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
