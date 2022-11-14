import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InterstitialLoaderType } from '@snhuproduct/toboggan-ui-components-library';
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
  @Input() assessment!: IAssessment;

  editAssessmentForm: FormGroup = new FormGroup({
    is_flagged: new FormControl(true),
    comments: new FormControl('', [
      Validators.required,
      Validators.maxLength(300)
    ]),
  });
  isLoading = false;
  loaderType = InterstitialLoaderType.Large;
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
      } else if (control.hasError('maxlength')) {
        return 'Shorten the description';
      }
    return '';
  }


  hasError(controlName: string) {
    const control = this.editAssessmentForm.get(controlName);
    if (control) {
      return !control.valid && (control.dirty || control.touched);
    }
    return false;
  }

  hideModal() {
    this.editFlagAssessmentAction.emit(true);
    this.editFlagModal.close();
  }

  async updateAssessment() {
    
    this.editAssessmentForm.markAllAsTouched();
    if (this.editAssessmentForm.valid) {
      const body = {
        is_flagged: this.editAssessmentForm.value.is_flagged as boolean,
        comments: this.editAssessmentForm.value.comments as string,
      };
      try{
          this.isLoading=true;
          await this.assessmentService.updateFlagAssessment(this.assessment?.id,body);
          this.editFlagAssessmentAction.emit(true);
          this.editFlagModal.close();
          this.bannerService.showBanner({
            type: 'success',
            heading: '',
            message: `<strong>${this.assessment?.learner}</strong>'s submission has been flagged for the instructor to review.`,
            button: null,
            autoDismiss: true,
          });
          this.isLoading=false;
        }catch(error){
          // handle error scenario
          this.isLoading=false;
          this.editFlagModal.modal?.content?.alertBanners.push({
            type: 'error',
            heading: '',
            message: `<strong>${this.assessment?.learner}</strong>'s couldn't be flagged.`,
          });
          return false;
        }
      }
    return true;
  }
}
