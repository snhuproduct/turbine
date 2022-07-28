import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'toboggan-ws-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent implements OnInit {
  createGroupForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createGroupForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
      description: ['', [Validators.required]],
      addUser: false
    });
  }

  get groupFormControls() {
    return this.createGroupForm.controls;
  }

  getGroupFormError(field: string) {

    let errorMessage = "";
    const control = this.groupFormControls[field];
    if (control?.errors) {
      if (control?.errors['required'])
        errorMessage += "This field can’t be empty";
      if (control?.errors['pattern'])
        errorMessage += "Use only letters and numbers";
    }
    return errorMessage;

  }
}
