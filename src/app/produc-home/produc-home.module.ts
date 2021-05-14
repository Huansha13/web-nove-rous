import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProducHomeRoutingModule } from './produc-home-routing.module';
import { DetailsProductComponent } from './page/details-product/details-product.component';
import {MaterialModule} from '../material.module';
import {ToolbarComponent} from '../shared/toolbar/toolbar.component';
import {HomeComponent} from '../home/home.component';
import {CarouselComponent} from '../shared/componets/carousel/carousel.component';
import { BtnWspComponent } from '../shared/componets/btn-wsp/btn-wsp.component';


@NgModule({
  declarations: [
    DetailsProductComponent,
    ToolbarComponent,
    HomeComponent,
    CarouselComponent,
    ToolbarComponent,
    BtnWspComponent
  ],
  imports: [
    CommonModule,
    ProducHomeRoutingModule,
    MaterialModule,
  ],
})
export class ProducHomeModule { }
