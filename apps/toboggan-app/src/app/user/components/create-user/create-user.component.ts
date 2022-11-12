import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  InterstitialLoaderType,
  ModalComponent,
} from '@snhuproduct/toboggan-ui-components-library';
import { IGroup, IUser, UserType } from '@toboggan-ws/toboggan-common';
import { ValidatorPattern } from '@toboggan-ws/toboggan-constants';
import { GroupService } from '../../../group/services/group.service';
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
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern(ValidatorPattern.nameValidation),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern(ValidatorPattern.nameValidation),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    userGroups: new FormArray([]),
  });
  userGroups!: IGroup[];
  constructor(
    public userService: UserService,
    private bannerService: BannerService,
    private groupService: GroupService
  ) {
    this.groupService.fetchGroups().subscribe((response) => {
      this.userGroups = response;
    });
  }

  onCheckboxToggle(e: any) {
    const groups: FormArray = this.userForm.get('userGroups') as FormArray;
    if (e.target.checked) {
      const userGroup = this.userGroups.find(
        (group) => group.uuid == e.target.value
      );
      groups.push(new FormControl(userGroup));
    } else {
      let i = 0;
      groups.controls.forEach((item: any) => {
        if (item.value.uuid == e.target.value) {
          groups.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  async handleAddNewUserModalButton() {
    const delay = (ms: number) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };
    this.userForm.markAllAsTouched();
    if (this.userForm.valid) {
      try {
        if (this.modalHandle) {
          this.modalHandle.alertBanners = []; //reset if there is was error from previous attempt
        }
        const userObj = this.userForm.getRawValue() as unknown as IUser;
        userObj.enabled = true;
        userObj.userType = UserType.Faculty;
        this.isLoading = true;
        await delay(400); // add delay if need to demo loader
        await this.userService.createUser(userObj);
        this.bannerService.showBanner({
          type: 'success',
          heading: `${userObj.firstName} ${userObj.lastName}`,
          message: 'has been added as a user.',
          button: {
            label: 'Dismiss',
            action: (bannerId: number) =>
              this.bannerService.hideBanner(bannerId),
          },
        });
        this.userService.publishUserEditComplete(userObj);
        return true;
      } catch (error) {
        this.modalHandle?.alertBanners.push({
          type: 'error',
          heading: 'Add new user',
          message: "couldn't be completed.",
        });
        return false;
      } finally {
        this.isLoading = false;
      }
    } else {
      // don't close modal
      return false;
    }
  }
}
