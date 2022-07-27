import { Injectable } from '@angular/core';
import { IBanner } from './banner.types';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  public banners: IBanner[] = [];

  public showBanner(banner: IBanner): void {
    this.banners.push(banner);
  }

  public hideBanner(index: number): void {
    this.banners.splice(index, 1);
  }
}
