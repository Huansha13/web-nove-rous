import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';

// module external
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import {BUCKET} from '@angular/fire/storage';
import {MaterialModule} from './material.module';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [
    AngularFirestore,
    {provide: BUCKET, useValue: 'gs://nove-rous.appspot.com\n'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
