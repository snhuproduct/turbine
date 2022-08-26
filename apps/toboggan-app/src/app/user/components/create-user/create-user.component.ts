import {
  Component, Input
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InterstitialLoaderType, ModalComponent } from '@snhuproduct/toboggan-ui-components-library';
import { IUser } from '@toboggan-ws/toboggan-common';
import { BannerService } from '../../../shared/services/banner/banner.service';
import { UserService } from '../../../shared/services/user/user.service';

@Component({
  selector: 'toboggan-ws-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {  
  @Input() modalHandle?: ModalComponent;

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

  async handleAddNewUserModalButton() {
    const delay = (ms: number) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };
    this.userForm.markAllAsTouched();
    if (this.userForm.valid) {
      try {        
        if(this.modalHandle)
        {
          this.modalHandle.alertBanners = [];  //reset if there is was error from previous attempt
        }
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
        this.modalHandle?.alertBanners.push({
          type: 'error',
          heading: 'Add New User',
          message: 'Couldn\'t be completed.',
        });
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
