import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../app/auth/auth.service';
import { Calendar } from '@ionic-native/calendar';

/**
 * Generated class for the EventDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-event-details',
    templateUrl: 'event-details.html',
})
export class EventDetailsPage {
    event:any = {transport: 0};

    constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService,
        private calendar: Calendar) {
        this.loadEvent(this.navParams.get('event_id'));
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EventDetailsPage');
    }

    loadEvent(id) {
        this.authService.startLoadingAlert("Please wait...");
        this.authService.getData('events/' + id + '/').then((response:any) => {
            this.authService.stoptLoadingAlert();
            this.event = response;
        }, (err) => {
            this.authService.stoptLoadingAlert()
            this.authService.showAlert("Error", "An error occurred")
        });
    }

    save() {
        this.calendar.createEvent(this.event.title, this.event.venue, this.event.description, new Date(this.event.date), new Date(this.event.date)).then(
            (msg) => {
                this.authService.showAlert('Success!', 'Event added to calendar successfully')
                this.navCtrl.pop();
            },
            (err) => {
                this.authService.showAlert('Failed!', err)
            }
        );
    }

    requestTransportation(id) {
        this.authService.startLoadingAlert("Please wait...")
        let data = {"event_id": id}
        this.authService.postData(data, 'transportation/').then((result: any) => {
            if (result.reserved == "1") {
                console.log("Reserved", result.reserved)
                this.event.transport = false;
            }
            this.authService.stoptLoadingAlert()
            this.authService.showAlert("Message", result.message)
        }, (err) => {
            this.authService.stoptLoadingAlert()
            this.authService.showAlert("Error", "An error occurred")
        });
    }

}
