import { TestBed } from '@angular/core/testing';

import { BannerService } from './banner.service';
import { INewBanner } from './banner.types';

describe('BannerService', () => {
  let service: BannerService;
  let banner: INewBanner;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BannerService);

    banner = {
      message: 'Test message',
      heading: 'Test heading',
      type: 'success',
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update the banner variable, when showBanner is called', () => {
    service.showBanner(banner);
    expect(service.banners).toEqual([
      {
        id: 0,
        ...banner,
      },
    ]);
  });

  it('should properly clear the banner variable, when hideBanner is called', () => {
    service.showBanner(banner);
    service.hideBanner(0);
    expect(service.banners.length).toBe(0);
  });
});
