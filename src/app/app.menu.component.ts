import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { Constants } from '@constants/constants';
import { AuthorizationService } from '@service/authorization.service';

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-menu-container">
            <ul class="layout-menu" role="menu" (keydown)="onKeydown($event)">
                <li app-menu class="layout-menuitem-category" *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true">
                    <div class="layout-menuitem-root-text" [attr.aria-label]="item.label" *ngIf="authorizationService.isAuthorized(item.role)">{{item.label}}</div>
                    <ul role="menu">
                        <li app-menuitem *ngFor="let child of item.items" [item]="child" [index]="i" role="none">
                        </li>
                    </ul>
                </li>
                
            </ul>
        </div>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public appMain: AppMainComponent, public authorizationService: AuthorizationService) { }

    ngOnInit() {
        this.model = [

            {
                label: 'Tienda 360 Station',
                items: [
                    {label: 'Tienda', icon: 'pi pi-fw pi-home', routerLink:['/'], role: Constants.ACCESS_GENERAL},
                ],
                role: Constants.ACCESS_GENERAL
            },

            {
                label: 'Mi Cuenta',
                items:[
                    {label: 'Mis Pedidos', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/pages/tableorder'], role: Constants.ROLE_USER},
                    {label: 'Mi Cuenta', icon: 'pi pi-fw pi-user', routerLink: ['pages/user/:user/view'], role: Constants.ROLE_USER},
                    /*{label: 'Login', icon: 'pi pi-fw pi-sign-in', routerLink: ['pages/login'], role: Constants.ACCESS_GENERAL},
                    {label: 'Logout', icon: 'pi pi-fw pi-sign-in', routerLink: ['pages/logout'],role: Constants.ROLE_USER},*/
                ],
                role: Constants.ROLE_USER
            },

            {
                label: 'Dashboard',
                items:[
                    {label: 'Dashboard',icon: 'pi pi-fw pi-chart-line', routerLink:['/pages/dashboard'], role: Constants.ROLE_USER},
                ],
                role: Constants.ROLE_USER
            },
            
            {
                label: 'Administrador del Sitio',
                items: [
                    {label: 'ABM Articulos', icon: 'pi pi-fw pi-user-edit', routerLink: ['/pages/crud'], role: Constants.ROLE_ADMIN},
                    {label: 'Pedidos Solicitados', icon: 'pi pi-fw pi-list', routerLink: ['pages/orders/all'], role: Constants.ROLE_ADMIN},
                    /*{label: 'Error', icon: 'pi pi-fw pi-times-circle', routerLink: ['pages/error']},
                    {label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['pages/notfound']},
                    {label: 'Access Denied', icon: 'pi pi-fw pi-lock', routerLink: ['pages/access']},
                    {label: 'Empty', icon: 'pi pi-fw pi-circle', routerLink: ['/pages/empty']}*/
                ],
                role: Constants.ROLE_ADMIN
            }
        ];
    }

    onKeydown(event: KeyboardEvent) {
        const nodeElement = (<HTMLDivElement> event.target);
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }
}
