import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { AuthService } from '../../app/auth/auth.service';
import {TimelinePage} from '../timeline/timeline';
/**
 * Generated class for the StatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {
  responseData: any;
  loading: any;
  element: HTMLElement
  src: string = "";
  constructor(public navCtrl: NavController, public authService: AuthService, public loadingCtrl: LoadingController, public navParams: NavParams, private alertCtrl: AlertController) {
  }


  ionViewDidLoad() {
    this.element = document.getElementById("imageElement") as HTMLElement;
  }

  resizeOptions: ResizeOptions = {
    resizeMaxWidth: 400,
    resizeMaxHeight: 500
  };

  selected(imageResult: ImageResult) {
    this.src = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
  }

  selectFile(event) {
    this.element.click();
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

  onUpload() {
    if (this.src == "") {
      return;
    }

		this.startLoadingAlert("Please wait")
		this.authService.postData({ image_data: this.src }, 'news').then((result) => {
			this.responseData = result;
			this.stoptLoadingAlert()
			if (this.responseData.message) {
				//this.showAlert("Message", this.responseData.message) 
				console.log(this.responseData);
				this.navCtrl.push(TimelinePage, {message: "News added successfully"});
			}
			else { 
				this.showAlert("Message", this.responseData.message) 
			}
		}, (err) => {
			this.stoptLoadingAlert()
			this.showAlert("Error", err)
			// this.showAlert("Error", "An error occurred")
		});
	}

}
