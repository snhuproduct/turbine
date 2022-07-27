import { Injectable } from '@angular/core';
import { IBanner, INewBanner } from './banner.types';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  public banners: IBanner[] = [];

  public showBanner(banner: INewBanner): void {
    this.banners.push({
      id: this.banners.length,
      ...banner,
    });
  }

  public hideBanner(index: number): void {
    this.banners = this.banners.filter((banner) => banner.id !== index);
  }
}
