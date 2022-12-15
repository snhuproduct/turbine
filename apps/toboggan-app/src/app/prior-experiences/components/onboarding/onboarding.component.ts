import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IUser } from '@toboggan-ws/toboggan-common';
import { AuthService } from '../../../shared/auth/auth.service';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'toboggan-ws-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit,AfterViewInit{
  loggedInUser = {} as Partial<IUser>;
  @ViewChild('onboarding') onboardingModal!: ModalComponent;

  constructor(private auth: AuthService) {}

  ngOnInit() {
   this.loggedInUser = this.auth.loggedInUser;   
  }

  ngAfterViewInit(): void {
    this.onboardingModal?.open();
  }

  onBoardingHidden() {
    this.onboardingModal.close();
  }
  onBoardingAccept() {
    this.onboardingModal.close();
  }
  get title(): string {
    return `Hello,${this.loggedInUser.firstName }! Looks like you’re new here. Let’s show you around.`
  }
}
