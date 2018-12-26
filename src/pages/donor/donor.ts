import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../app/auth/auth.service';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-donor',
    templateUrl: 'donor.html',
})
export class DonorPage {
    contacts: any;
    items: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService) {
        this.loadDonors();
    }

    loadDonors() {
        this.authService.startLoadingAlert("Please wait...")
        this.authService.getData('profiles/').then((response) => {
            this.authService.stoptLoadingAlert()
            this.items = response;
        }, (err) => {
            this.authService.stoptLoadingAlert()
            this.authService.showAlert("Error", "An error occurred")
        });
    }


}

