import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiningPage } from './dining';

@NgModule({
  declarations: [
    DiningPage,
  ],
  imports: [
    IonicPageModule.forChild(DiningPage),
  ],
})
export class DiningPageModule {}
