import { Injectable } from '@angular/core';
import { IBanner } from './banner.types';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  public banner: IBanner | null = null;

  public showBanner(banner: IBanner): void {
    this.banner = banner;
  }

  public hideBanner(): void {
    this.banner = null;
  }
}
