import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmptyComponent } from './components/empty/empty.component';
import { ChartsComponent } from './components/charts/charts.component';
import { AppMainComponent } from './app.main.component';
import { ListComponent } from './components/list/list.component';
import { CrudComponent } from './components/crud/crud.component';
import { TableComponent } from './components/table/table.component';
import { TableorderComponent } from './components/table-order/tableorder.component';
import { BlocksComponent } from './components/blocks/blocks.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AccessComponent } from './components/access/access.component';
import { ProductComponent } from "./components/product/product.component";
import { Constants } from "@constants/constants";
import { AuthGuardService } from "@service/auth-guard.service";
import { TableOrdersAllComponent } from "@components/table-orders-all/table-orders-all.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: 'pages/dashboard', component: DashboardComponent},
                    {path: '', component: ListComponent, data: {permission: Constants.ACCESS_GENERAL}, canActivate: [AuthGuardService]},
                    {path: 'uikit/menu', loadChildren: () => import('./components/menus/menus.module').then(m => m.MenusModule)},
                    {path: 'uikit/charts', component: ChartsComponent},
                    {path: 'pages/crud', component: CrudComponent, data: {permission: Constants.ROLE_ADMIN}, canActivate: [AuthGuardService]},
                    {path: 'pages/empty', component: EmptyComponent},
                    {path: 'blocks', component: BlocksComponent},
                    {path: 'pages/user/:user/view', component: TableComponent, canActivate: [AuthGuardService]},
                    {path: 'pages/tableorder', component: TableorderComponent},
                    {path: 'pages/product/:product/view', component: ProductComponent, canActivate: [AuthGuardService]},
                    {path: 'pages/orders/all', component: TableOrdersAllComponent,  data: {permission: Constants.ROLE_ADMIN}},
                ],
            },
            {path:'pages/login', component: LoginComponent},
            {path:'pages/logout', component: LoginComponent},
            {path:'pages/error', component: ErrorComponent},
            {path:'pages/notfound', component: NotfoundComponent},
            {path:'pages/access', component: AccessComponent},
            {path: '**', redirectTo: 'pages/notfound'},
        ], {scrollPositionRestoration: 'enabled', anchorScrolling:'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
