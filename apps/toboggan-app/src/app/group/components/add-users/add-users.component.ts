import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '@toboggan-ws/toboggan-common';
import { UserService } from '../../../shared/services/user/user.service';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'toboggan-ws-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss'],
})
export class AddUsersComponent implements OnInit {
  addUserForm: FormGroup = new FormGroup({
    groupId: new FormControl(''),
    user: new FormControl('', [Validators.required, Validators.email]),
  });
  users: IUser[] = [];
  userEmails: string[] = [];

  constructor(
    private userService: UserService,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.fetchUsers().subscribe((users: IUser[]) => {
      this.users = users;
      this.userEmails = this.users.map((user) => user.email);
    });
  }

  addUsertoGroup() {
    const userEmail = this.addUserForm.value.user;
    if (!this.userEmails.includes(userEmail)) {
      this.addUserForm.get('user')?.setErrors({ incorrect: true });
      return;
    }
    if (this.addUserForm.valid) {
      this.groupService
        .addUsertoGroup(
          this.addUserForm.value.groupId,
          this.addUserForm.value.user
        )
        .subscribe({
          next: (response) => {
            // handle success
          },
          error: (error) => {
            // handle error scenario
          },
        });
    }

    return false;
  }

  hasError(controlName: string) {
    const control = this.addUserForm.get(controlName);
    if (control) {
      return (
        (!control.valid || !this.userEmails.includes(control?.value)) &&
        (control.dirty || control.touched)
      );
    }
    return false;
  }

  getFormError(field: string): string {
    const control = this.addUserForm.get(field);
    if (control?.hasError('required')) {
      return "This field can't be empty";
    }
    if (control?.hasError('email')) {
      return 'Check email format';
    }
    if (!this.userEmails.includes(control?.value)) {
      return "This email doesn't exist";
    }
    return '';
  }
}
