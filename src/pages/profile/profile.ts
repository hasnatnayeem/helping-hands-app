import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AuthService } from '../../app/auth/auth.service';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
// import {MenuPage} from '../menu/menu';
import { MenuPage } from '../menu/menu';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {
    session: any;
    isMyProfile: boolean = false;
    id: number;
    isEmployee: boolean = false;
    employeeData = {
        name: '',
        email: '',
        phone: '',
        image: '',
    };
    responseData: any;
    loading: any;
    contact = { name: "", first_name: "", last_name: "", email: "", phone: "", unit: "" }
    tempContact = { name: "", first_name: "", last_name: "", email: "", phone: "", unit: "", image: "" };
    editMode: boolean = false;
    imageSrc: string = "";
    ImageElement: HTMLElement;
    profilePictureSrc: string = "./assets/imgs/profile-pic.png";
    resizeOptions: ResizeOptions = {
        resizeMaxWidth: 150,
        resizeMaxHeight: 200,
    };


    constructor(public navCtrl: NavController, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public navParams: NavParams, public authService: AuthService) {
        this.id = this.navParams.get('id');
        this.session = this.authService.getSession();
        this.isMyProfile = this.id == this.session.user.profile_id;
        this.isEmployee = this.navParams.get('employee')
        

        authService.startLoadingAlert("Please wait...")
        if (this.isEmployee == true) {
            this.authService.getData('employees/' + this.id + '/').then((result) => {
                // console.log(result);
                this.responseData = result;
                authService.stoptLoadingAlert()
                this.employeeData = this.responseData
                
            }, (err) => {
                authService.stoptLoadingAlert()
                authService.showAlert("Error", "An error occurred")
            });
        }
        else {
            this.authService.getData('profiles/' + this.id + '/').then((result) => {
                this.responseData = result;
                authService.stoptLoadingAlert()
                this.contact.name = this.responseData.first_name + " " + this.responseData.last_name
                this.contact.first_name = this.responseData.first_name
                this.contact.last_name = this.responseData.last_name
                this.contact.email = this.responseData.email
                this.contact.phone = this.responseData.phone
                this.contact.unit = this.responseData.unit
                if (this.responseData.image != "") {
                    this.profilePictureSrc = this.responseData.image;
                }
                // console.log(this.responseData)
            }, (err) => {
                authService.stoptLoadingAlert()
                authService.showAlert("Error", "An error occurred")
            });
        }

    }

    ionViewDidLoad() {
        this.ImageElement = document.getElementById("imageElement") as HTMLElement;
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

    toggleEditMode() {
        this.editMode = !this.editMode;
        if (this.editMode) {
            this.tempContact = JSON.parse(JSON.stringify(this.contact));
            // this.tempContact.image = this.imageSrc;
            // this.tempContact.name = this.contact.first_name + " " + this.contact.last_name;
        }
    }

    selectImage(event) {
        this.ImageElement.click();
    }

    imageSelected(imageResult: ImageResult) {
        console.log(imageResult)
        this.tempContact.image = imageResult.resized
            && imageResult.resized.dataURL
            || imageResult.dataURL;
        this.imageSrc = this.tempContact.image;
    }

    onUpdate() {
        let errors = '';
        if (this.tempContact.first_name === '') {
            errors += 'First name is required<br>';
        }
        if (this.tempContact.last_name === '') {
            errors += 'Last name is required<br>';
        }
        if (this.tempContact.phone === '') {
            errors += 'Phone number is required<br>';
        }
        // else if (!/^\(?([0-9]{3})[-]?([0-9]{4})$/.test(this.tempContact.phone)) {
        //     errors += 'Invalid phone number<br>';
        // }

        if (this.tempContact.email != '' && !/[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}/.test(this.tempContact.email)) {
            errors += 'Invalid email address<br>';
        }

        if (errors != '') {
            this.authService.showAlert('Error', errors);
            return;
        }

        
        this.startLoadingAlert("Please wait");
        if (this.tempContact.image == '') {
            delete this.tempContact.image;
        }
        
        delete this.tempContact.name;
        if (this.tempContact.email == null) {
            this.tempContact.email = "";
        }


        this.authService.postData(this.tempContact, 'profiles/' + this.id + "/").then((result) => {
            console.log(result);
            this.responseData = result;
            this.stoptLoadingAlert()
            if (this.responseData.message) {
                this.showAlert("Message", this.responseData.message)

                if (localStorage.getItem('session') != null) {
                    let session = JSON.parse(localStorage.getItem('session'))
                    session.user.first_name = this.tempContact.first_name
                    session.user.last_name = this.tempContact.last_name
                    session.user.phone = this.tempContact.phone
                    session.user.email = this.tempContact.email
                    session.user.unit = this.tempContact.unit
                    localStorage.setItem('session', JSON.stringify(session));
                }

                this.navCtrl.setRoot(MenuPage);
            }
            else {
                this.showAlert("Message", this.responseData.message)
            }
        }, (err) => {
            this.stoptLoadingAlert()
            this.showAlert("Error", err)
            console.log("Error", JSON.stringify(err))
        });

    }


}
