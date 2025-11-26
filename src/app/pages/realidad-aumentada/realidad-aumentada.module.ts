import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RealidadAumentadaPageRoutingModule } from './realidad-aumentada-routing.module';

import { RealidadAumentadaPage } from './realidad-aumentada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RealidadAumentadaPageRoutingModule
  ],
  declarations: [RealidadAumentadaPage]
})
export class RealidadAumentadaPageModule {}
