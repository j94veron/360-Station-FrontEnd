import { Component, OnDestroy } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { AuthorizationService } from "@service/authorization.service";
import { Constants } from '@constants/constants';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    model: any[];

    constructor(public appMain: AppMainComponent, public authorizationService: AuthorizationService) {}

    ngOnInit(){
        
    }
       
}
