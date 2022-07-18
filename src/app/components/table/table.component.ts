import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Customer, Representative } from '../../api/customer';
import { CustomerService } from '../../service/customerservice';
import { Product } from '@models/product.model';
import { ProductService } from '@service/product.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api'
import { User } from '@app/models/user.model';
import { AppConfig } from '../../api/appconfig';
import { StorageUtils } from '@app/utils/storage.utils';

@Component({
    templateUrl: './table.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['../../../assets/demo/badges.scss'],
    styles: [`
        :host ::ng-deep  .p-frozen-column {
            font-weight: bold;
        }

        :host ::ng-deep .p-datatable-frozen-tbody {
            font-weight: bold;
        }

        :host ::ng-deep .p-progressbar {
            height:.5rem;
        }
    `]
})
export class TableComponent implements OnInit {

    pageTitle = 'Informacion de Cuenta: ';

    config: AppConfig;

    errorMessage: String;

    public userId: number;

    submitted: boolean;

    users: User[];

    user: User;

    constructor(private customerService: CustomerService, private productService: ProductService, 
                private messageService: MessageService, private confirmService: ConfirmationService, private cd: ChangeDetectorRef) {}

    ngOnInit(): void {
    }

    public getUser(): User {
        return StorageUtils.getUser();
    }
    
}