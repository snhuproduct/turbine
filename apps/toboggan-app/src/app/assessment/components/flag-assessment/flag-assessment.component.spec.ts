import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagAssessmentComponent } from './flag-assessment.component';

describe('FlagAssessmentComponent', () => {
  let component: FlagAssessmentComponent;
  let fixture: ComponentFixture<FlagAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlagAssessmentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlagAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
