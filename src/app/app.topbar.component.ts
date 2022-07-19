import { Component, OnDestroy } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { AuthorizationService } from "@service/authorization.service";
import { Constants } from '@constants/constants';
import { StorageUtils } from './utils/storage.utils';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    model: any[];

    public username: string;

    constructor(public appMain: AppMainComponent, public authorizationService: AuthorizationService) {}

    ngOnInit(){
        var user = StorageUtils.getUser();
        if (user) {
            this.username = user.username;
        }
    }
       
}
