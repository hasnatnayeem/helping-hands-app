import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

// let apiUrl = "http://192.168.178.46:8000/api/"
let apiUrl = "http://127.0.0.1:8000/api/v1/"
// let apiUrl = "http://35.200.224.144:5003/api/v1/"

@Injectable()
export class AuthService {
    constructor(private http: Http, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }
    baseUrl: string = apiUrl;
    loading: any;


    postData(data, type) {
        return new Promise((resolve, reject) => {
            let headers = new Headers({ 'Content-Type': 'application/json' });
            headers.append('Authorization', 'Bearer ' + this.getToken());
            this.http.post(apiUrl + type, JSON.stringify(data), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    getData(type) {
        return new Promise((resolve, reject) => {
            let headers = new Headers({ 'Content-Type': 'application/json' });
            headers.append('Authorization', 'Bearer ' + this.getToken());
            // console.log(headers);
            this.http.get(apiUrl + type, { headers: headers })
                .subscribe(res => {
                    console.log("rcvd " + res)
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }


    logout() {
        localStorage.clear();
        // console.log("Called logout()")
    }

    getToken() {
        let token = ""
        if (localStorage.getItem('session') != null) {
            token = JSON.parse(localStorage.getItem('session')).token
        }

        // console.log("Called getToken()")
        return token
    }

    isAuthenticated() {
        // console.log("Called isAuthenticated()")
        return this.getToken() != "";
    }

    getSession() {
        // console.log("Called getSession()")
        let session = ""
        if (localStorage.getItem('session') != null) {
            session = JSON.parse(localStorage.getItem('session'))
        }
        return session
    }

    showAlert(title, message) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['Dismiss']
        });
        alert.present();
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

}
