import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IGroup, INewGroup } from '@toboggan-ws/toboggan-common';
import { FormError } from '@toboggan-ws/toboggan-constants';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { BannerService } from '../../../shared/services/banner/banner.service';
import { IBannerButton } from '../../../shared/services/banner/banner.types';
import { groupActionType } from '../../pages/group-main-page/group-main-page.component';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'toboggan-ws-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent implements OnInit, AfterViewInit {
  @ViewChild('createGroupModal') createGroupModal!: ModalComponent;
  @Output() groupCreateAction = new EventEmitter<groupActionType>();
  createGroupForm!: FormGroup;
  constructor(
    private groupService: GroupService,
    private bannerService: BannerService
  ) {}

  ngOnInit(): void {
    this.createGroupForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$'),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(300),
        this.specialCharactersValidation,
      ]),
      addUser: new FormControl(false),
    });
  }

  ngAfterViewInit(): void {
    this.createGroupModal.open();
  }

  getErrorMessage(controlName: string) {
    const control = this.createGroupForm.get(controlName);
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
    const control = this.createGroupForm.get(controlName);
    if (control) {
      return !control.valid && (control.dirty || control.touched);
    }
    return false;
  }

  createGroup() {
    this.createGroupForm.markAllAsTouched();
    if (this.createGroupForm.valid) {
      const group: INewGroup = {
        name: this.createGroupForm.value.name,
        description: this.createGroupForm.value.description,
      };
      this.groupService.createGroup(group).subscribe({
        next: (response) => {
          // handle success
          this.groupCreateAction.emit({
            group: response as IGroup,
            addUser: this.createGroupForm.value?.addUser,
          });
          this.createGroupModal.close();
          const newGroup = response as IGroup;
          this.bannerService.showBanner({
            type: 'success',
            heading: '',
            message: `The <strong>${newGroup.name}</strong> user group has been created.`,
            button: null,
            autoDismiss: true,
          });
        },
        error: (error) => {
          // handle error scenario
          this.createGroupModal.modal?.content?.alertBanners.push({
            type: 'error',
            heading: 'Create Group',
            message: "couldn't be completed.",
          });
        },
      });
    }
    return false;
  }

  hideModal() {
    this.createGroupModal.close();
    this.groupCreateAction.emit();
  }

  private showSuccessNotification(
    heading: string,
    message: string,
    autoDismiss: boolean,
    dismissButton: IBannerButton | null = {
      label: 'Dismiss',
      action: (bannerId: number) => this.bannerService.hideBanner(bannerId),
      style: 'secondary',
    }
  ) {
    this.bannerService.showBanner({
      type: 'success',
      heading,
      message,
      button: dismissButton,
      autoDismiss,
    });
  }
}
