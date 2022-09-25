import {
  Component, Input
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InterstitialLoaderType, ModalComponent } from '@snhuproduct/toboggan-ui-components-library';
import { IGroup, IUser } from '@toboggan-ws/toboggan-common';
import { ValidatorPattern } from '@toboggan-ws/toboggan-constants';
import { BannerService } from '../../../shared/services/banner/banner.service';
import { UserService } from '../../../shared/services/user/user.service';
import { mockGroups } from '../mock/groupsMock';
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
    firstName: new FormControl('', [ Validators.required, 
      Validators.pattern(ValidatorPattern.nameValidation)]),
    lastName: new FormControl('', [ Validators.required, 
      Validators.pattern(ValidatorPattern.nameValidation)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    public userService: UserService,
    private bannerService: BannerService
  ) {}

  userGroups :IGroup[] = mockGroups()
  groups:any=[] ;
  selectGroup(e:any,data:any){
    if(e.target.checked){
      this.groups.push(data);
    }else {
      let i = 0;
      this.groups.forEach((item: any) => {
        if (item.id == e.target.id) {
          this.groups.splice(i,1);
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
        if(this.modalHandle)
        {
          this.modalHandle.alertBanners = [];  //reset if there is was error from previous attempt
        }
        const userObj = this.userForm.getRawValue() as IUser;
        userObj.enabled = true;
        this.isLoading = true;
        userObj.groups = this.groups;
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
          message: 'couldn\'t be completed.',
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
}
