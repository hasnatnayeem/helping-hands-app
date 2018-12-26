import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../app/auth/auth.service';
import { CollectionPage } from '../collection/collection';
import { DonorPage } from '../donor/donor';

import { FormPage } from '../form/form';
// import { ProfilePage } from '../profile/profile';
// import { TimelinePage } from '../timeline/timeline';
// import { ContactPage } from '../contact/contact';
// import { StatusPage } from '../status/status';
import { LoginPage } from '../login/login';
// import { EventPage } from '../event/event';
// import { DocumentsPage } from '../documents/documents';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-menu',
    templateUrl: 'menu.html',
})
export class MenuPage {
    news: any;
    session: any;
    responseData: any;
    loading: any;

    constructor(public navCtrl: NavController,
        public navParams: NavParams, public authService: AuthService) {
        this.session = this.authService.getSession();
        
    }

    logout() {
        this.authService.logout()
        this.navCtrl.setRoot(LoginPage);
    }

    goFormPage() {
        this.navCtrl.push(FormPage);
    }

    goCollectionPage(title) {
        this.navCtrl.push(CollectionPage, { collector_id: this.session.user.id, title: title });
    }

    goDonorPage() {
        this.navCtrl.push(DonorPage);
    }

}
