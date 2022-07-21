import { Component, OnInit } from '@angular/core';
import { BannerService } from '../../../shared/services/banner/banner.service';

@Component({
  selector: 'toboggan-ws-user-main-page',
  templateUrl: './user-main-page.component.html',
  styleUrls: ['./user-main-page.component.css'],
})
export class UserMainPageComponent implements OnInit {
  constructor(private bannerService: BannerService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.bannerService.showBanner({
        type: 'success',
        message: 'This is a success banner',
        heading: 'Success',
        button: {
          label: 'Dismiss',
          action: () => this.bannerService.hideBanner(),
        },
      });
    }, 2000);
  }
}
