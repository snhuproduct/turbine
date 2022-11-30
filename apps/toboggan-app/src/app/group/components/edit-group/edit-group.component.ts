import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InterstitialLoaderType } from '@snhuproduct/toboggan-ui-components-library';
import { IGroup } from '@toboggan-ws/toboggan-common';
import { FormError } from '@toboggan-ws/toboggan-constants';
import * as R from 'ramda';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';
import { BannerService } from '../../../shared/services/banner/banner.service';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'toboggan-ws-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss'],
  providers: [SafeHtmlPipe],
})
export class EditGroupComponent implements OnChanges, AfterViewInit {
  // editGroupForm!: FormGroup;
  @Input() mode = 'edit';
  @Input() group: IGroup = {} as IGroup;
  @Input() oldGroup: IGroup = {} as IGroup;
  @ViewChild('edit') editModal!: ModalComponent;
  @ViewChild('review') reviewModal!: ModalComponent;
  reviewing?: Partial<IGroup> | null = null;
  isLoading = false;
  loaderType = InterstitialLoaderType.Large;
  editGroupForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9 ]*$'),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(300),
      this.specialCharactersValidation,
    ]),
  });
  constructor(
    private groupService: GroupService,
    private bannerService: BannerService,
    private safeHtmlPipe: SafeHtmlPipe
  ) {}

  // ngOnInit(): void {}

  ngOnChanges({ group }: SimpleChanges): void {
    if (group.currentValue && !group.previousValue) {
      this.editGroupForm.patchValue({
        name: group.currentValue.name,
        description: group.currentValue.description,
      });
      this.oldGroup = group.currentValue;
    }
  }
  ngAfterViewInit(): void {
    if (this.group) this.editModal?.open();
  }

  getErrorMessage(controlName: string) {
    const control = this.editGroupForm.get(controlName);
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
    const control = this.editGroupForm.get(controlName);
    if (control) {
      return !control.valid && (control.dirty || control.touched);
    }
    return false;
  }

  editModalHidden() {
    if (!this.reviewing) {
      this.editGroupForm.reset();
      this.groupService.publishGroupCompleted(this.group as IGroup);
    }
  }

  editModalAccept() {
    this.editGroupForm.markAllAsTouched();
    if (this.editGroupForm.valid) {
      const reviewing = this.editGroupForm.getRawValue();
      if (!R.equals(R.pick(R.keys(reviewing), this.group), reviewing)) {
        this.reviewing = this.editGroupForm.getRawValue() as IGroup;
        this.group = { ...this.group, ...(this.reviewing as IGroup) };
        this.editModal.close();
        this.reviewModal.open();
      }
    }
  }
  reviewModalHidden() {
    if (this.reviewing) {
      this.reviewing = null;
      setTimeout(() => {
        this.editModal.open();
      }, 200);
    }
  }

  async approveChanges() {
    const group: Partial<IGroup> = {
      name: this.editGroupForm.value.name as string,
      description: this.editGroupForm.value.description as string,
    };
    try {
      this.isLoading = true;
      if (this.reviewModal && this.reviewModal.modal) {
        this.reviewModal.modal.content.alertBanners = [];
      }

      await this.groupService.updateGroup(group, this.group.uuid);
      // handle success
      this.bannerService.showBanner({
        type: 'success',
        heading: ``,
        message: `The <strong>${group.name}</strong> user group's details have been edited.`,
        button: {
          label: 'Dismiss',
          action: (bannerId: number) => this.bannerService.hideBanner(bannerId),
        },
        autoDismiss: true,
      });
      this.reviewing = null;
      this.reviewModal.close();
      this.groupService.publishGroupCompleted(group as IGroup);
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      this.reviewModal.modal?.content?.alertBanners.push({
        type: 'error',
        heading: 'Create Group',
        message: "<b>Edit group details</b> couldn't be completed.`",
      });
      return false;
    }
    return true;
  }
}
