import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroupComponent } from './create-group.component';

describe('CreateGroupComponent', () => {
  let component: CreateGroupComponent;
  let fixture: ComponentFixture<CreateGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('hasError should return false if control name is not found in the form', () => {
    expect(component.hasError('nonExistingControlName')).toBeFalsy();
  })
});
