import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RealidadAumentadaPage } from './realidad-aumentada.page';

const routes: Routes = [
  {
    path: '',
    component: RealidadAumentadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RealidadAumentadaPageRoutingModule {}
