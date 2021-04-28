import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcountRoutingModule } from './acount-routing.module';
import { LoginComponent } from './page/login/login.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AcountRoutingModule
  ]
})
export class AcountModule { }
