/**
 * Add 2 input forms in the following component for first name and last name. Once both forms are filled out by the user, and user has clicked out of the fields, then beside it a username should be automatically generated which should be in the following format: [firstname]_[lastname]_[random integer]
 * First name and last name should be lowercased, and then a random integer between 1 and 9 should be added to the end
 * For example: if the inputs are "John" and "DOE" the generated username could be "john_doe_4" or "john_doe_2"
 */
import { ChangeDetectorRef, Component, NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'ng-app',
    template: `
                <h2>Enter your first and last name</h2>
                <div>
                <form>
                <input name="firstName" [(ngModel)]="firstName" placeholder="First Name">
                <input name="lastName" [(ngModel)]="lastName"  placeholder="Last Name">
                </form>

                <span>{{getUsername()}}</span>
                </div>
                `,
    styles: []
})
export class UserNameComponent {

    constructor(private cdr:ChangeDetectorRef) {
        
    }

    firstName: string = '';
    lastName: string = '';
    username: string = '';
    randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    getUsername() {
        if (this.firstName && this.lastName) {
            this.username = this.firstName + '_' + this.lastName + '_' + this.randomIntFromInterval(1, 9);
            return this.username;
        } else {
            return 'fields are empty.'
        }

    }


}

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: "",
                component: UserNameComponent
            }
        ]),
        FormsModule
    ],
    declarations: [UserNameComponent]
})
export class UserNameModule { };