import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IGroup } from '@toboggan-ws/toboggan-common';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'toboggan-ws-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent implements OnInit {
  createGroupForm!: FormGroup;
  constructor(private groupService: GroupService) { }

  ngOnInit(): void {
    this.createGroupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$'), this.specialCharactersValidation]),
      description: new FormControl('', [Validators.required]),
      addUser: new FormControl(false),
    });
  }

  getErrorMessage(controlName: string, friendlyName: string) {
    const control = this.createGroupForm.get(controlName);
    if (control)
      if (control.hasError('required')) {
        return friendlyName + ' is required';
      } else if (control.hasError('specialCharacters')) {
        return `Don't use these characters: ! @ # $`;
      } else if (control.hasError('pattern')) {
        return `Use only letters and numbers.`;
      }
    return '';
  }

  specialCharactersValidation(control: FormControl) {
    const value = control.value;
    const spChars = /[!@#$]+/;
    if (spChars.test(value)) {
      return {
        specialCharacters: {
          errors: true
        }
      }
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
      const group: IGroup = {
        name: this.createGroupForm.value.name,
        description: this.createGroupForm.value.description,
      }
      this.groupService.createGroup(group).subscribe({
        next: (response) => {
          // handle success
        },
        error: (error) => { // handle error scenario
        }

      });
    }

  }

}
