import { TestBed } from '@angular/core/testing';

import { BannerService } from './banner.service';
import { IBanner } from './banner.types';

describe('BannerService', () => {
  let service: BannerService;
  let banner: IBanner;

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
    expect(service.banner).toEqual(banner);
  });

  it('should properly clear the banner variable, when hideBanner is called', () => {
    service.showBanner(banner);
    service.hideBanner();
    expect(service.banner).toBeNull();
  });
});
