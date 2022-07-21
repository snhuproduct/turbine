import { Component } from '@angular/core';
import { BannerService } from '../../services/banner/banner.service';

@Component({
  selector: 'toboggan-ws-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent {
  constructor(public bannerService: BannerService) {}
}
