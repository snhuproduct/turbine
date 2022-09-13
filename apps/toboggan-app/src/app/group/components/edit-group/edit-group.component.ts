import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IGroup } from '@toboggan-ws/toboggan-common';
import { FormError } from '@toboggan-ws/toboggan-constants';
import { BannerService } from '../../../shared/services/banner/banner.service';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'toboggan-ws-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss'],
})
export class EditGroupComponent implements OnInit {
  editGroupForm!: FormGroup;
  @Input() mode = 'edit';
  @Input() group!: IGroup;
  @Input() oldGroup!: IGroup;
  constructor(private groupService: GroupService ,private bannerService: BannerService) { }

  ngOnInit(): void {
    this.editGroupForm = new FormGroup({
      name: new FormControl(this.group.name, [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$'),
      ]),
      description: new FormControl(this.group.description, [
        Validators.required,
        Validators.maxLength(300),
        this.specialCharactersValidation
      ])
    });
  }

  getErrorMessage(controlName: string, friendlyName: string) {
    const control = this.editGroupForm.get(controlName);
    if (control)
      if (control.hasError('required')) {
        return `${friendlyName} ${FormError.isRequired}`;
      } else if (control.hasError('specialCharacters')) {
        return `${FormError.characters} ! @ # $`;
      } else if (control.hasError('pattern')) {
        return `${FormError.lettersAndNumbers}`;
      } else if (control.hasError('maxlength')) {
        return `${FormError.maxLength}`;
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

  reviewGroup() {
    this.editGroupForm.markAllAsTouched();
    if (this.editGroupForm.valid) {
      const group: IGroup = {
        id: this.group.id,
        name: this.editGroupForm.value.name,
        description: this.editGroupForm.value.description,
      };
      return group;
    }
    return false;
  }

  approveChanges() {
    const group: IGroup = {
      id: this.group.id,
      name: this.editGroupForm.value.name,
      description: this.editGroupForm.value.description,
    };
    this.groupService.updateGroup(group).subscribe({
      next: (response) => {
        // handle success
        this.bannerService.showBanner({
          type: 'success',
          heading: ``,
          message: `The <strong>${group.name}</strong> user group's details have been edited.`,
          button: {
            label: 'Dismiss',
            action: (bannerId: number) =>
              this.bannerService.hideBanner(bannerId),
          },
          autoDismiss: true,
        });
      },
      error: (error) => {
        // handle error scenario
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
      },
    });
  }

}
