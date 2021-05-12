import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ListProductComponent } from './page/list-product/list-product.component';
import { NavComponent } from './page/nav/nav.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { ProductEditComponent } from './page/product-edit/product-edit.component';
import {MaterialModule} from '../material.module';
import { ModalComponent } from './dialog/modal/modal.component';
import { ProductAddComponent } from './page/product-add/product-add.component';
/* Imports external,*/
import {FirebsModule} from '../firebs/firebs.module';
import { TableComponent } from './components/table/table.component';
import { DetailsComponent } from './components/details/details.component';
import { OrderPipe } from './pipes/order.pipe';


@NgModule({
  declarations: [
    ListProductComponent,
    NavComponent,
    ProductEditComponent,
    ModalComponent,
    ProductAddComponent,
    TableComponent,
    DetailsComponent,
    OrderPipe,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    ClipboardModule,
    MaterialModule,
    FirebsModule,
  ],
  entryComponents: [ModalComponent],
})
export class ProductModule { }
