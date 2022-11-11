import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActivityMonitorService } from './shared/auth/activity-monitor.service';
import { TokenInterceptorService } from './shared/auth/auth-interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoriesModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    {
      provide: 'BASE_API_URL',
      useValue: environment.baseApiUrl,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    ActivityMonitorService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
