import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { ModalAlertService } from '../../../shared/services/modal-alert/modal-alert.service';
import { SharedModule } from '../../../shared/shared.module';
import { UpdatePermissionComponent } from '../update-permission/update-permission.component';
import { PermissionComponent } from './permission.component';
describe('PermissionComponent', () => {
  let component: PermissionComponent;
  let fixture: ComponentFixture<PermissionComponent>;
  let modalAlertService: ModalAlertService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
      imports: [
        StoriesModule,
        BrowserModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        SharedModule,
        ReactiveFormsModule,
      ],
      declarations: [
        UpdatePermissionComponent,
        PermissionComponent,
      ],
    }).compileComponents();
    
    modalAlertService = TestBed.inject(ModalAlertService);
    fixture = TestBed.createComponent(PermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('No chnages in group permission form and submit it, should open confirmation alert modal', () => {
   
    const spy = jest.spyOn(modalAlertService, 'showModalAlert');
    component.groupPermissionForm.markAsPristine();
    fixture.detectChanges();
   
    const reviewChangesBtn = fixture.debugElement.query(
      By.css('.review-changes-btn')
    ).nativeElement;
    reviewChangesBtn.click(); 
    fixture.detectChanges();

    expect(spy).toBeCalledWith(expect.objectContaining({
      'heading': `You didn't make any changes`
     }))
});

it('should open update permission confirmation modal', () => {
  component.groupPermissionForm.markAsDirty();
  fixture.detectChanges();
 
  const reviewChangesBtn = fixture.debugElement.query(
    By.css('.review-changes-btn')
  ).nativeElement;
  reviewChangesBtn.click(); 
  fixture.detectChanges();
  expect(component.showPermissionModal).toBeTruthy();
});
});
