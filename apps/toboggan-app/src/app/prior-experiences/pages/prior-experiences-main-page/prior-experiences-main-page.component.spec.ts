import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorExperiencesMainPageComponent } from './prior-experiences-main-page.component';

describe('PriorExperiencesMainPageComponent', () => {
  let component: PriorExperiencesMainPageComponent;
  let fixture: ComponentFixture<PriorExperiencesMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriorExperiencesMainPageComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriorExperiencesMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
