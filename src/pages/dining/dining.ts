import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../app/auth/auth.service';

/**
 * Generated class for the DiningPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-dining',
    templateUrl: 'dining.html',
})
export class DiningPage {
    menus: any;
    responseData: any;
    selected: string;
    weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


    constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService) {
        this.selected = "today";
    }

    ionViewDidLoad() {
        this.loadMenu(); //important
        // this.loadAllMenus()
    }

    loadMenu() {
        this.authService.startLoadingAlert("Please wait...");
        let currentDate = new Date();
        this.authService.getData('dining/?day=' + this.weekdays[currentDate.getDay()]).then((result) => {
            this.authService.stoptLoadingAlert();
            this.menus = result;
        }, (err) => {
            this.authService.stoptLoadingAlert()
            this.authService.showAlert("Error", "An error occurred")
        });
    }

    loadAllMenus() {
        this.selected = "all"
        this.authService.startLoadingAlert("Please wait...");
        this.authService.getData('dinings/').then((result) => {
            console.log(result);
            this.authService.stoptLoadingAlert();
            this.menus = result;
        }, (err) => {
            this.authService.stoptLoadingAlert()
            this.authService.showAlert("Error", "An error occurred")
        });
    }

}
