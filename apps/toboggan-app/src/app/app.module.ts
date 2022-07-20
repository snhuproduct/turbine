import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { StoriesModule } from "@snhuproduct/toboggan-ui-components-library";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,BrowserModule, HttpClientModule, StoriesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
