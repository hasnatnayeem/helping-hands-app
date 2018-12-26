import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
// import { NgForm } from '@angular/forms';
import { AuthService } from '../../app/auth/auth.service';
// import { Http } from '@angular/http';

import { AlertController } from 'ionic-angular';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {
	responseData: any;
	loading: any;
	userData = { "username": "", "password": "" };

	constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public authService: AuthService, private alertCtrl: AlertController) {
		if (authService.isAuthenticated()) {
			this.navCtrl.setRoot(MenuPage)
		}
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

	login() {
		this.startLoadingAlert("Please wait")
		this.authService.postData(this.userData, 'login/').then((result) => {
			this.responseData = result;
			this.stoptLoadingAlert()
			if (this.responseData.token) {
				//this.showAlert("Token", this.responseData.token) 
				console.log(this.responseData);
				localStorage.setItem('session', JSON.stringify(this.responseData));
				this.navCtrl.setRoot(MenuPage);
			}
			else { 
				this.showAlert("Message", this.responseData.message) 
			}
		}, (err) => {
			this.stoptLoadingAlert()
			this.showAlert("Error", "An error occurred")
		});
	}
}
