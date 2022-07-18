import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api'
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from "@service/orders.service";
import { Orders } from '@app/models/orders.model';
import { mergeMap } from 'rxjs/operators';
import { StorageUtils } from '@utils/storage.utils';
import { User } from '@app/models/user.model';
import { Constants } from "@constants/constants";

@Component({
    templateUrl: './tableorder.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['../../../assets/demo/badges.scss']
})
export class TableorderComponent implements OnInit {

    statuses: any[];

    orders: Orders[];

    order: Orders;

    public OrderId: number;

    errorMessage: String;

    cols: any[];

    orderDialog: boolean;

    deleteOrderDialog: boolean = false;

    rowGroupMetadata: any;

    selectedOrders: Orders[];

    expandedRows = {};

    estadosVisibles = [];

    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading:boolean = true;

    constructor(private messageService: MessageService, private confirmService: ConfirmationService, private cd: ChangeDetectorRef, private ordersService: OrdersService,
                private route:ActivatedRoute, private router: Router,) {}

    ngOnInit() {

        this.ordersService.findByUsername(this.getUser().username).subscribe(result => this.orders = result)

        //this.ordersService.findAll().subscribe(results => this.orders = results);

        /*this.OrderId = +this.route.snapshot.paramMap.get(Constants.CUSTOMER_PATH);
        if (this.OrderId) {
          this.ordersService.findOne(this.OrderId).subscribe({
            next: order => this.order = order,
            error: err => this.errorMessage = err
          });
        } else [
          this.errorMessage = 'El producto id es requerido'
        ];
    
        */

        this.cols = [
            {field: 'Producto', header: 'name_product'},
            {field: 'Categoria', header: 'category_product'},
            {field: 'Tipo de Envio', header: 'shipping'},
            {field: 'Direccion de Envio', header: 'address_user'},
            {field: 'Precio', header: 'price_product'},
            {field: 'Cantidad', header: 'quantity'},
            {field: 'Status', header: 'order_status'}
        ];
    }

    public getUser(): User {
        return StorageUtils.getUser();
    }

    deleteOrders(order: Orders) {
        this.order = order;
        this.ordersService.delete(this.order.id).pipe(
            mergeMap(() => {
                return this.ordersService.findAll();
            })
        ).subscribe((ordersData) => {
            this.orders = ordersData;
            this.orderDialog = false;
            this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Order Delete', life: 3000});
        }, (err) => {
            console.log(err)
        });
        this.deleteOrderDialog = true;
    }

   

}
