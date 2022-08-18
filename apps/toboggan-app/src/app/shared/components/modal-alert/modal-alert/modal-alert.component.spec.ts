import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalAlertService } from '../../../services/modal-alert/modal-alert.service';
import { SharedModule } from '../../../shared.module';

import { ModalAlertComponent } from './modal-alert.component';

describe('ModalAlertComponent', () => {
  let component: ModalAlertComponent;
  let fixture: ComponentFixture<ModalAlertComponent>;
  let modalAlertService: ModalAlertService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ModalAlertComponent],
      providers: [ModalAlertService],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    modalAlertService = TestBed.inject(ModalAlertService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a modal alert whenever we call modalAlertService.showModalAlert', () => {
    modalAlertService.showModalAlert({
      type: 'success',
      heading: 'Success',
      message: 'This is a success message.',
      buttons: [
        {
          title: 'Cancel',
          onClick: () => {
            modalAlertService.hideModalAlert();
          },
          style: 'secondary',
        },
        {
          title: 'OK',
          onClick: () => {
            modalAlertService.hideModalAlert();
          },
          style: 'primary',
        },
      ],
    });

    fixture.detectChanges();

    const modalAlert = fixture.nativeElement.querySelector(
      '.modal-alert-container'
    );
    expect(modalAlert).toBeTruthy();
  });
});
