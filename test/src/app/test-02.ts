/**
 * Update the following components to meet the requirements : 
 * * Bind `field` of [textfield] component to its text input
 * * Pass value of `field` from [textfield] component to [title] property of component [ng-app]
 */
import { Component, EventEmitter, NgModule, Output  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector : 'textfield',
    template : '<input type="text" [(ngModel)]="field" placeholder="With NgModel" (ngModelChange)="dataChanged($event)"/>'
})
export class TextField {
    field :string;
    @Output() fieldOutput = new EventEmitter<string>();
    dataChanged(newObj) {
        this.fieldOutput.emit(newObj);
    }
}

@Component({
    selector : 'child-component',
    template : `<h2>Title:<h2><br/><textfield (fieldOutput)="newTitleEmit($event)"></textfield>`
})
export class ChildComponent {
    @Output() newTitle = new EventEmitter<string>();

    newTitleEmit(newObj) {
        this.newTitle.emit(newObj);
    }
}


@Component({
    selector : 'ng-app',
    template : `<div>
                    <child-component (newTitle)="title = $event"></child-component> <br/>
                    Title is {{title}}
                </div>`
})
export class Test02Component {

    title:string = "";
    
}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test02Component
            }
        ]),
        FormsModule
    ],
    declarations : [Test02Component,ChildComponent,TextField]
})
export class Test02Module {};