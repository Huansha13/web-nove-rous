import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcountRoutingModule } from './acount-routing.module';
import { LoginComponent } from './page/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../../environments/environment';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AcountRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
  ]
})
export class AcountModule { }
