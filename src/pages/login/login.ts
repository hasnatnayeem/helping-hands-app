import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { AuthService } from '../../app/auth/auth.service';


@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {
	responseData: any;
	loading: any;
	userData = { "username": "", "password": "" };

	constructor(public navCtrl: NavController, public authService: AuthService) {
		if (authService.isAuthenticated()) {
			this.navCtrl.setRoot(MenuPage)
		}
	}


	login() {
		this.authService.startLoadingAlert("Please wait")
		this.authService.postData(this.userData, 'login/').then((result) => {
			this.responseData = result;
			this.authService.stoptLoadingAlert()
			if (this.responseData.token) {
				console.log(this.responseData);
				localStorage.setItem('session', JSON.stringify(this.responseData));
				this.navCtrl.setRoot(MenuPage);
			}
			else {
				this.authService.showAlert("Message", this.responseData.message)
			}
		}, (err) => {
			this.authService.stoptLoadingAlert()
			this.authService.showAlert("Error", "An error occurred")
		});
	}
}
