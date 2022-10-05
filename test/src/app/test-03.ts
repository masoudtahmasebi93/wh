/**
 * Update the following components to meet the requirements : 
 * 
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 * 
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 * 
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';

@Component({
    selector : 'ng-app',
    template : `<form>
                    <h2>Login</h2>
                    <br/>
                    <input type="email" value="" name="email" [ngModel]="email" [pattern]="emailPattern" #offEmail="ngModel" required />
                    <div *ngIf="offEmail.errors"> 
                        <div *ngIf="offEmail.errors.required"> 
                            <span>Email is required.</span>
                        </div>			   
                        <div *ngIf="offEmail.errors.pattern"> 
                            <span>Email not valid.</span>
                        </div>	
                    </div> 
                    <br/>
                    <input type="password" value="" name="password" [(ngModel)]="password" [pattern]="passwordPattern" #offPassword="ngModel" required />
                    <div *ngIf="offPassword.errors"> 
                        <div *ngIf="offPassword.errors.required"> 
                            <span>Password is required.</span>
                        </div>			   
                        <div *ngIf="offPassword.errors.pattern"> 
                            <span>Password not valid.</span>
                        </div>	
                     </div> 
                    <button type="submit">Submit</button>
                    <br/><br/>
                    <div *ngIf="logged_in">Logged In!</div>
                </form>`
})
export class Test03Component {
    emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$";
    email:string = "";
    password:string = "";

    logged_in = false;

    isPasswordValid(){
        
    }
    
}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test03Component
            }
        ]),
        FormsModule
    ],
    declarations : [Test03Component]
})
export class Test03Module {};