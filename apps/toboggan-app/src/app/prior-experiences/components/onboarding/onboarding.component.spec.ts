import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../shared/auth/auth.service';
import { SharedModule } from '../../../shared/shared.module';

import { OnboardingComponent } from './onboarding.component';

describe('OnboardingComponent', () => {
  let component: OnboardingComponent;
  let fixture: ComponentFixture<OnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingComponent ],
      imports: [
        StoriesModule,
        SharedModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        RouterTestingModule
      ],
      providers: [AuthService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
