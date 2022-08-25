import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InterstitialLoaderType } from '@snhuproduct/toboggan-ui-components-library';
import { IUser } from '@toboggan-ws/toboggan-common';
import { BannerService } from '../../../shared/services/banner/banner.service';
import { UserService } from '../../../shared/services/user/user.service';

@Component({
  selector: 'toboggan-ws-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements AfterViewInit {
  @Output() changeTitle = new EventEmitter<string>();
  @Input() returnHandle?: (hendle: CreateUserComponent) => void;

  failedToAddUser = false; //indicated wether error banner is shown

  isLoading = false;
  loaderType = InterstitialLoaderType.Large;

  userForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    public userService: UserService,
    private bannerService: BannerService
  ) {}

  ngAfterViewInit(): void {
    // provide own handle to the hosting component
    if (this.returnHandle) {
      this.returnHandle(this);
    }
  }

  async handleAddNewUserModalButton() {
    const delay = (ms: number) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };
    this.userForm.markAllAsTouched();
    if (this.userForm.valid) {
      try {
        this.failedToAddUser = false; //reset if there is an error from previous attempt
        const userObj = this.userForm.getRawValue() as IUser;
        this.isLoading = true;

        await delay(400); // add delay if need to demo loader
        await this.userService.createUser(userObj);
        this.bannerService.showBanner({
          type: 'success',
          heading: `${userObj.firstName} ${userObj.lastName}`,
          message: 'has been added as user',
          button: {
            label: 'Dismiss',
            action: (bannerId: number) =>
              this.bannerService.hideBanner(bannerId),
          },
        });
        return true;
      } catch (error) {
        this.failedToAddUser = true;
        console.log('Failed creating user', error);
        return false;
      } finally {
        this.isLoading = false;
      }
    } else {
      // don't close modal
      return false;
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
}
