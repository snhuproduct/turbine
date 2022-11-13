import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAssessment } from '@toboggan-ws/toboggan-common';
import { FormError } from '@toboggan-ws/toboggan-constants';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { BannerService } from '../../../shared/services/banner/banner.service';
import { AssessmentService } from '../../services/assessment.service';

@Component({
  selector: 'toboggan-ws-flag-assessment',
  templateUrl: './flag-assessment.component.html',
  styleUrls: ['./flag-assessment.component.scss'],
})
export class FlagAssessmentComponent implements AfterViewInit {
  @ViewChild('editflag') editFlagModal!: ModalComponent;
  @Output() editFlagAssessmentAction = new EventEmitter<boolean | undefined>();
  @Input() group!: IAssessment;

  editAssessmentForm: FormGroup = new FormGroup({
    is_flagged: new FormControl(true),
    comments: new FormControl('', [
      Validators.required,
      Validators.maxLength(300),
      this.specialCharactersValidation,
    ]),
  });
  constructor(
    private assessmentService: AssessmentService,
    private bannerService: BannerService
  ) {}

  ngAfterViewInit(): void {
    this.editFlagModal.open();
  }

  getErrorMessage(controlName: string) {
    const control = this.editAssessmentForm.get(controlName);
    if (control)
      if (control.hasError('required')) {
        return `${FormError.empty}`;
      } else if (control.hasError('specialCharacters')) {
        return `${FormError.characters} ! @ # $`;
      } else if (control.hasError('pattern')) {
        return `${FormError.lettersAndNumbers}`;
      } else if (control.hasError('maxlength')) {
        return 'Shorten the description';
      }
    return '';
  }

  specialCharactersValidation(control: FormControl) {
    const value = control.value;
    const spChars = /[!@#$]+/;
    if (spChars.test(value)) {
      return {
        specialCharacters: {
          errors: true,
        },
      };
    }
    return null;
  }

  hasError(controlName: string) {
    const control = this.editAssessmentForm.get(controlName);
    if (control) {
      return !control.valid && (control.dirty || control.touched);
    }
    return false;
  }

  editModalHidden() {
    this.editFlagAssessmentAction.emit(true);
    this.editFlagModal.close();
  }

  editModalAccept() {
    this.editAssessmentForm.markAllAsTouched();
    if (this.editAssessmentForm.valid) {
      const body = {
        is_flagged: this.editAssessmentForm.value.is_flagged as boolean,
        comments: this.editAssessmentForm.value.comments as string,
      };
      this.assessmentService
      .updateFlagAssessment(
        this.group.id,
        body
      )
      .subscribe({
        next: (response) => {
          // handle success
          console.log(response);
          this.editFlagAssessmentAction.emit(true);
          this.editFlagModal.close();
          this.bannerService.showBanner({
            type: 'success',
            heading: '',
            message: `<strong>${this.group?.learner}</strong>'s submission has been flagged for the instructor to review.`,
            button: null,
            autoDismiss: true,
          });
        },
        error: (error: unknown) => {
          // handle error scenario
          this.editFlagModal.modal?.content?.alertBanners.push({
            type: 'error',
            heading: '',
            message: `The flag couldn't be removed from <strong>${this.group?.learner}</strong>'s submission. Please try again.`,
          });
        },
      });
    }
  }
}
