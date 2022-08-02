import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupMainPageComponent } from './group-main-page.component';

describe('GroupMainPageComponent', () => {
  let component: GroupMainPageComponent;
  let fixture: ComponentFixture<GroupMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupMainPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
