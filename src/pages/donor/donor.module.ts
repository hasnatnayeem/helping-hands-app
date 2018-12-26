import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonorPage } from './donor';

@NgModule({
  declarations: [
    DonorPage,
  ],
  imports: [
    IonicPageModule.forChild(DonorPage),
  ],
})
export class DonorPageModule {}
