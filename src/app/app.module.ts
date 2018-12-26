import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';


import { CollectionPage } from '../pages/collection/collection';
import { DonorPage } from '../pages/donor/donor';

import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { FormPage } from '../pages/form/form';

// import { ProfilePage } from '../pages/profile/profile';
// import { TimelinePage } from '../pages/timeline/timeline';
// import { StatusPage } from '../pages/status/status';
// import { DocumentsPage } from '../pages/documents/documents';
// import { DiningPage } from '../pages/dining/dining';
// import { EventPage } from '../pages/event/event';
// import { EventDetailsPage } from '../pages/event-details/event-details';

import { HttpModule } from '@angular/http';
import { AuthService } from './auth/auth.service';

import { ImageUploadModule } from 'ng2-imageupload';
import { FilterPipe }from './filter.pipe';
import { EmployeeFilterPipe }from './employee.pipe';
import { Calendar } from '@ionic-native/calendar';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Push } from '@ionic-native/push';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MenuPage,
    FormPage,
    FilterPipe,
    EmployeeFilterPipe,
    CollectionPage,
    DonorPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ImageUploadModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MenuPage,
    FormPage,
    CollectionPage,
    DonorPage,
 ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Calendar,
    LocalNotifications,
    Push,
  ]
})
export class AppModule {}
