/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { Component, Input, NgModule } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterModule } from "@angular/router";

@Component({
    selector: 'ng-app',
    template: `<div>
                    <h2>Loan Details</h2>
                    <b>Monthly Payment:</b> {{calculateMontlyPayment()}} <br/>
                    <b>Late Payment Fee : {{calculateLatePayment()}}</b> <br/>
                </div>`
})
export class Test01Component {

    loan_amount: number = 1000;
    monthly_payment: number = 200;
    late_payment = 10;
    constructor(private currencyPipe: CurrencyPipe) {

    }
    changeLoanAmount($event){
        this.loan_amount = Number($event.value.target) ?? 0; 
    }

    calculateMontlyPayment() {
        if (this.loan_amount) {
            return this.calculatePaymentAndReturn(this.loan_amount, 0.2);
        } else {
            return 'N/A'
        }
    }

    calculateLatePayment() {
        if (this.loan_amount) {
            return this.calculatePaymentAndReturn(this.monthly_payment,0.5);
        } else {
            return 'N/A'
        }
    }

    calculatePaymentAndReturn(payment: number, factor: number) {
        const result = factor * payment;
        return this.currencyPipe.transform(result, 'USD');
    }
}


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: "",
                component: Test01Component
            }
        ])
    ],
    declarations: [Test01Component],
    providers: [CurrencyPipe]
})
export class Test01Module { }