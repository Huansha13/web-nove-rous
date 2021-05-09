import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { AddProductComponent } from './page/add-product/add-product.component';
import { ListProductComponent } from './page/list-product/list-product.component';
import { NavComponent } from './page/nav/nav.component';
import { EditProducComponent } from './page/edit-produc/edit-produc.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ProductFormComponent } from './page/product-form/product-form.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { ProductEditComponent } from './page/product-edit/product-edit.component';


@NgModule({
  declarations: [AddProductComponent, ListProductComponent, NavComponent, EditProducComponent, ProductFormComponent, ProductEditComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    ClipboardModule,
  ]
})
export class ProductModule { }
