import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerService } from '../../services/banner/banner.service';
import { INewBanner } from '../../services/banner/banner.types';
import { SharedModule } from '../../shared.module';

import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let bannerService: BannerService;
  let testBanner: INewBanner;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [BannerComponent],
      providers: [BannerService],
    }).compileComponents();

    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    testBanner = {
      message: 'Test message',
      heading: 'Test heading',
      type: 'success',
    };

    bannerService = TestBed.inject(BannerService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a banner whenever we call bannerService.showMessage', () => {
    bannerService.showBanner(testBanner);

    fixture.detectChanges();

    const banner = fixture.nativeElement.querySelector('.banner-container');
    expect(banner).toBeTruthy();
  });

  it("shouldn't display a banner if we call bannerService.hideBanner", () => {
    bannerService.showBanner(testBanner);
    bannerService.hideBanner(0);

    fixture.detectChanges();

    const banner = fixture.nativeElement.querySelector('.banner-container');
    expect(banner).toBeFalsy();
  });

  it('should properly display the banner message', () => {
    bannerService.showBanner(testBanner);

    fixture.detectChanges();

    const banner = fixture.nativeElement.querySelector('.banner-container');

    const html = banner.innerHTML as string;

    expect(html.includes(testBanner.message as string)).toBeTruthy();
  });
});
