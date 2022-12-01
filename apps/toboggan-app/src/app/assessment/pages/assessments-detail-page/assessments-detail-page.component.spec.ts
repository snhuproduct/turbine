import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { SharedModule } from '../../../shared/shared.module';

import { AssessmentsDetailPageComponent } from './assessments-detail-page.component';

describe('AssessmentsDetailPageComponent', () => {
  let component: AssessmentsDetailPageComponent;
  let fixture: ComponentFixture<AssessmentsDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, CollapseModule, NoopAnimationsModule],
      declarations: [AssessmentsDetailPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentsDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
