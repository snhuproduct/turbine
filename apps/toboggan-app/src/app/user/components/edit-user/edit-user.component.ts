import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InterstitialLoaderType } from '@snhuproduct/toboggan-ui-components-library';
import { IUser } from '@toboggan-ws/toboggan-common';
import * as R from 'ramda';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { BannerService } from '../../../shared/services/banner/banner.service';
import { UserService } from '../../../shared/services/user/user.service';

@Component({
  selector: 'toboggan-ws-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnChanges {
  constructor(
    public userService: UserService,
    private bannerService: BannerService
  ) {}
  isLoading = false;
  reviewing?: Partial<IUser> | null = null;
  loaderType = InterstitialLoaderType.Large;
  @ViewChild('edit') editModal!: ModalComponent;
  @ViewChild('review') reviewModal!: ModalComponent;
  @Input() user?: IUser;
  @Output() userChange = new EventEmitter<IUser | undefined>();

  userForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  ngOnChanges({ user }: SimpleChanges): void {
    if (user.currentValue && !user.previousValue) {
      this.userForm.patchValue({
        firstName: user.currentValue.firstName,
        lastName: user.currentValue.lastName,
        email: user.currentValue.email,
      });
      this.editModal?.open();
    }
  }

  hasError(controlName: string) {
    const control = this.userForm.get(controlName);
    if (control) {
      return !control.valid && (control.dirty || control.touched);
    }
    return false;
  }

  getErrorMessage(controlName: string, friendlyName: string) {
    const control = this.userForm.get(controlName);
    if (control)
      if (control.hasError('required')) {
        return friendlyName + ' is required';
      } else if (control.hasError('email')) {
        return friendlyName + ' format is invalid';
      }
    return '';
  }

  editModalHidden() {
    if (!this.reviewing) {
      this.userChange.emit();
      this.userForm.reset();
    }
  }

  editModalAccept() {
    this.userForm.markAllAsTouched();
    if (this.userForm.valid) {
      const reviewing = this.userForm.getRawValue();
      if (!R.equals(R.pick(R.keys(reviewing), this.user), reviewing)) {
        this.reviewing = this.userForm.getRawValue();
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

  get approveChanges() {
    return (
      (this.reviewing &&
        this.user && [
          {
            label: 'Last Name',
            oldValue: this.reviewing.lastName,
            newValue: this.user.lastName,
          },
          {
            label: 'First Name',
            oldValue: this.reviewing.firstName,
            newValue: this.user.firstName,
          },
          {
            label: 'Email',
            oldValue: this.reviewing.email,
            newValue: this.user.email,
          },
        ]) ||
      []
    );
  }

  async onSubmit() {
    try {
      if (this.user) {
        const userObj = this.userForm.getRawValue() as IUser;
        this.isLoading = true;

        await this.userService.patchUser(userObj, this.user?.id);

        this.bannerService.showBanner({
          type: 'success',
          heading: ``,
          message: `<b>${userObj.firstName} ${userObj.lastName}</b>'s user details have been edited.`,
          button: {
            label: 'Dismiss',
            action: (bannerId: number) =>
              this.bannerService.hideBanner(bannerId),
          },
          autoDismiss: true,
        });
      }
    } catch (error) {
      this.bannerService.showBanner({
        type: 'error',
        heading: ``,
        message: `<b>Edit user</b> couldn't be completed.`,
        button: {
          label: 'Dismiss',
          action: (bannerId: number) => this.bannerService.hideBanner(bannerId),
        },
        autoDismiss: true,
      });

      return false;
    } finally {
      this.reviewing = null;
      this.reviewModal.close();
      this.userChange.emit();
      this.isLoading = false;
    }
    return true;
  }
}
