import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import {MaterialModule} from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/*  Import external */
import {FirebsModule} from './firebs/firebs.module';
import { CarouselComponent } from './shared/componets/carousel/carousel.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import {ProducHomeModule} from './produc-home/produc-home.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FirebsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
