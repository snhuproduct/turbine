import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InterstitialLoaderType } from '@snhuproduct/toboggan-ui-components-library';
import { IUser } from '@toboggan-ws/toboggan-common';
import { ValidatorPattern } from '@toboggan-ws/toboggan-constants';
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
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern(ValidatorPattern.nameValidation),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern(ValidatorPattern.nameValidation),
    ]),
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
            newValue: this.reviewing.lastName,
            oldValue: this.user.lastName,
          },
          {
            label: 'First Name',
            newValue: this.reviewing.firstName,
            oldValue: this.user.firstName,
          },
          {
            label: 'Email',
            newValue: this.reviewing.email,
            oldValue: this.user.email,
          },
        ]) ||
      []
    );
  }

  async onSubmit() {
    try {
      if (this.user) {
        const userObj = {...this.userForm.getRawValue() as IUser, userType: this.user.userType};
        this.isLoading = true;

        await this.userService.updateUser(userObj, this.user?.userId);

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
      this.userService.publishUserEditComplete(this.user as IUser);
      this.isLoading = false;
    }
    return true;
  }
}
