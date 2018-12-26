import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { AuthService } from '../../app/auth/auth.service';

/**
 * Generated class for the DocumentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-documents',
  templateUrl: 'documents.html',
})
export class DocumentsPage {
  htmlSource: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService) {
    this.authService.getData('documents/' + `?v=${new Date().getTime()}`).then((result) => {
      this.htmlSource = result[0].content;
		}, (err) => {
			this.authService.showAlert("Error", "An error occurred")
		});
  }

  ionViewDidLoad() {
    
  }

}
