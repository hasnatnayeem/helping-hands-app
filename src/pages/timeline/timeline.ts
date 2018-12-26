import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {ProfilePage} from '../profile/profile';
import {StatusPage} from '../status/status';

import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AuthService } from '../../app/auth/auth.service';
/**
 * Generated class for the TimelinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class TimelinePage {
  news:any;
  responseData: any;
  loading: any;
  isAuthenticated:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public authService: AuthService) {
    this.loadNews();
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimelinePage');
  }

  goToLoginPage(){
    this.navCtrl.push(LoginPage);
  }

  goToStatusPage(){
    this.navCtrl.push(StatusPage);
  }

  startLoadingAlert(message) {
		this.loading = this.loadingCtrl.create({
			content: message
		});		
		this.loading.present();
	}

	stoptLoadingAlert() {
		this.loading.dismiss();
	}

	showAlert(title, message) {
		let alert = this.alertCtrl.create({
		  title: title,
		  subTitle: message,
		  buttons: ['Dismiss']
		});
		alert.present();
  }
  
  goProfilePage(id){
    this.navCtrl.push(ProfilePage, {
      id: id
    });
  }

  loadNews() {
    this.startLoadingAlert("Please wait...")
    this.authService.getData('news/').then((result) => {
			this.stoptLoadingAlert()
        this.news = result;
		}, (err) => {
			this.stoptLoadingAlert()
			this.showAlert("Error", "An error occurred")
    });
  }
}
