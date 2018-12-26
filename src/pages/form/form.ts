import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthService } from '../../app/auth/auth.service';
import { NgForm } from '@angular/forms';
import { MenuPage } from '../menu/menu';

/**
 * Generated class for the FormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {
  session: any
  keys:any = []
  selectedValue:any;
  collectedAt: String = new Date().toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService) {
    this.session = this.authService.getSession()
    this.loadDonors()
  }



  loadDonors() {
    this.authService.startLoadingAlert("Please wait...")
    this.authService.getData('profiles/').then((response) => {
        this.authService.stoptLoadingAlert()
        this.keys = response;
        console.log(response)
    }, (err) => {
        this.authService.stoptLoadingAlert()
        this.authService.showAlert("Error", "An error occurred")
    });
  }

  send(form: NgForm) {
    console.log(form.value)
    let data:any = []

    if (form.value.donor && form.value.collected_at && form.value.amount) {

    }
    else {
      this.authService.showAlert("Error", "Please enter the values correctly")
      return
    }

    data = {
        "donor": form.value.donor,
        "collector": this.session.user.id,
        "collected_at": form.value.collected_at.split("T")[0],
        "amount": form.value.amount
    }

    
    this.authService.startLoadingAlert("Please wait")
		this.authService.postData(data, 'donations/').then((result) => {
      console.log(result)
			this.authService.stoptLoadingAlert()
        form.reset()
        this.authService.showAlert("Message", "Entry has been added successfully")
        this.navCtrl.setRoot(MenuPage);
		}, (err) => {
			this.authService.stoptLoadingAlert()
			this.authService.showAlert("Error", "An error occurred")
		});
  }

}
