import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../app/auth/auth.service';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-expense',
    templateUrl: 'expense.html',
})
export class ExpensePage {
    title: any = "Expenses   ";
    expenses: any;
    summary: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService) {
        this.loadExpenses();
    }


    loadExpenses() {
        this.authService.startLoadingAlert("Please wait...")
        this.authService.getData('expense-summary/').then((response: any) => {
            this.authService.stoptLoadingAlert();
            this.expenses = response.expenses;
            this.summary = response.summary;
        }, (err) => {
            this.authService.stoptLoadingAlert()
            this.authService.showAlert("Error", "An error occurred")
        });
    }


}

