import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../app/auth/auth.service';
import { EventDetailsPage } from '../event-details/event-details';

/**
 * Generated class for the EventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-event',
    templateUrl: 'event.html',
})
export class EventPage {
    events:any;
    constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EventPage');
        this.loadAllEvents();
    }

    loadAllEvents() {
        this.authService.startLoadingAlert("Please wait...");
        this.authService.getData('events/').then((response:any) => {
            this.authService.stoptLoadingAlert();
            this.events = response;
        }, (err) => {
            this.authService.stoptLoadingAlert()
            this.authService.showAlert("Error", "An error occurred")
        });
    }

    goToEventDetailsPage(event) {
        this.navCtrl.push(EventDetailsPage, {
            event_id: event.id,
        });
    }

}
