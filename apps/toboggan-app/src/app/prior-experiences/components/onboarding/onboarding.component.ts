import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'toboggan-ws-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements AfterViewInit{
  @ViewChild('onboarding') onboardingModal!: ModalComponent;

  ngAfterViewInit(): void {
    this.onboardingModal?.open();
  }

  onBoardingHidden() {
    this.onboardingModal.close();
  }
  onBoardingAccept() {
    this.onboardingModal.close();
  }
  
}
