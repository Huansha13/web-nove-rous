import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';


const myModulo = [
  MatCardModule,
  MatButtonModule,
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    myModulo
  ],
  exports: [
    myModulo
  ]
})
export class MaterialModule { }
