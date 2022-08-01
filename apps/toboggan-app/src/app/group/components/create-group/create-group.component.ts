import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IGroup } from '@toboggan-ws/toboggan-common';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'toboggan-ws-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent implements OnInit {
  createGroupForm!: FormGroup;
  constructor(private fb: FormBuilder, private groupService: GroupService) { }

  ngOnInit(): void {
    this.createGroupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]),
      description: new FormControl('', [Validators.required]),
      addUser: new FormControl(false),
    });
  }

  getErrorMessage(controlName: string, friendlyName: string) {
    const control = this.createGroupForm.get(controlName);
    if (control)
      if (control.hasError('required')) {
        return friendlyName + ' is required';
      } else if (control.hasError('pattern')) {
        return `${friendlyName} use only letters and numbers. Don't use these characters: ! @ # $`;
      }
    return '';
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
