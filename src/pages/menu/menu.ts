import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthService } from '../../app/auth/auth.service';
import { CollectionPage } from '../collection/collection';
import { DonorPage } from '../donor/donor';

import { FormPage } from '../form/form';
// import { ProfilePage } from '../profile/profile';
// import { TimelinePage } from '../timeline/timeline';
// import { ContactPage } from '../contact/contact';
// import { StatusPage } from '../status/status';
import { LoginPage } from '../login/login';
import { ExpensePage } from '../expense/expense';
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
        public navParams: NavParams, public authService: AuthService,
        private alertCtrl: AlertController) {

        this.session = this.authService.getSession();
        
    }

    confirmLogout() {
		let alert = this.alertCtrl.create({
			title: 'Logout',
			message: 'Are you sure you want to logout?',
			buttons: [
				{
					text: 'No',
					role: 'cancel',
					handler: () => {
					}
				},
				{
					text: 'Yes',
					handler: () => {
						this.logout();
					}
				}
			]
		});
		alert.present();
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

    goExpensePage() {
        this.navCtrl.push(ExpensePage);
    }

    goDonorPage() {
        this.navCtrl.push(DonorPage);
    }

}
