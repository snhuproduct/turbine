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
  isFormSubmited = false;
  addUserForm: FormGroup = new FormGroup( {
    groupId: new FormControl(''),
    user: new FormControl('', [Validators.required, Validators.email])
  });
  users: IUser[] = [];

  constructor(private userService: UserService, private groupService: GroupService){}

  ngOnInit(): void {
      this.getUsers();
  }

  getUsers() :void {
    this.userService.fetchUsers().subscribe((users:IUser[]) => this.users = users);
    console.log(this.users);
  }
  
  addUsertoGroup() {
    this.isFormSubmited = true;
    const emailArray = this.users.map(user => user.email);
    const userEmail = this.addUserForm.value.user;
    if(!emailArray.includes(userEmail)) {
      this.addUserForm.get('user')?.setErrors({'incorrect': true});
      return;
    } 
    if(this.addUserForm.valid ) {
      this.groupService.addUsertoGroup(this.addUserForm.value.groupId, this.addUserForm.value.user).subscribe( {
        next : (response) =>  { 
          // handle success
        },
        error: (error) => { // handle error scenario
        }
        
      });
    }
    
    return false;
  } 

  getFormError(field: string): string {
    const control = this.addUserForm.get(field);
    const userEmails = this.users.map(user => user.email);
    if(control?.hasError('required')) {
      return 'This field can’t be empty'
    } 
    if(control?.hasError('email')) {
      return 'Check email format';
    } 
    if(!userEmails.includes(control?.value)) {
      return 'This user not available'
    } 
    return '';
     
  }
  
}