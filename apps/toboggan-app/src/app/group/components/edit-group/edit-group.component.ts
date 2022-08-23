import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormError } from '@toboggan-ws/toboggan-constants';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'toboggan-ws-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss'],
})
export class EditGroupComponent implements OnInit {
  editGroupForm!: FormGroup;
  constructor(private groupService: GroupService) { }

  ngOnInit(): void {
    this.editGroupForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$'),
      ]),
      description: new FormControl('', [
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

}
