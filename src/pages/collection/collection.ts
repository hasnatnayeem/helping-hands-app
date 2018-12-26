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
    selector: 'page-collection',
    templateUrl: 'collection.html',
})
export class CollectionPage {
    contacts: any;
    title: any = "Collections   ";
    collections: any;
    summary: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService) {
        this.title = this.navParams.get('title');
        let query = ""
        if (this.title == "My Collections") {
            query = "?collector_id=" + this.navParams.get('collector_id')
        }
        this.loadCollections(query);
    }


    loadCollections(query) {
        this.authService.startLoadingAlert("Please wait...")
        this.authService.getData('donation-summary/' + query).then((response: any) => {
            this.authService.stoptLoadingAlert();
            console.log(response)
            this.collections = response.donations;
            this.summary = response.summary;
        }, (err) => {
            this.authService.stoptLoadingAlert()
            this.authService.showAlert("Error", "An error occurred")
        });
    }


}

