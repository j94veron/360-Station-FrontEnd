import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api'
import { OrdersService } from "@service/orders.service";
import { Orders } from '@app/models/orders.model';
import { mergeMap } from 'rxjs/operators';

@Component({
    templateUrl: './table-orders-all.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['../../../assets/demo/badges.scss']
})
export class TableOrdersAllComponent implements OnInit {

    statuses: any[];

    selectedStatus: any;

    submitted: boolean;

    orders: Orders[];

    order: Orders;

    cols: any[];

    orderDialog: boolean;

    deleteOrderDialog: boolean = false;

    rowGroupMetadata: any;

    selectedOrders: Orders[];

    expandedRows = {};

    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading:boolean = true;

    constructor(private messageService: MessageService, private confirmService: ConfirmationService, private cd: ChangeDetectorRef, private ordersService: OrdersService) {}

    ngOnInit() {
        this.ordersService.findAll().subscribe(results => this.orders = results);

        this.cols = [
            {field: 'customerId', header: 'customerId'},
            {field: 'name_product', header: 'name_product'},
            {field: 'category_product', header: 'category_product'},
            {field: 'shipping', header: 'shipping'},
            {field: 'address_user', header: 'address_user'},
            {field: 'price_product', header: 'price_product'},
            {field: 'quantity', header: 'quantity'},
            {field: 'order_status', header: 'order_status'}
        ];

        this.statuses = [
            {label: 'SOLICITADO', value: 'SOLICITADO'},
            {label: 'EN PREPARACION', value: 'PREPARACION'},
            {label: 'EN CAMINO', value: 'EN CAMINO'},
            {label: 'ENTREGADO', value: 'ENTREGADO'},
        ];
    }

    hideDialog() {
        this.orderDialog = false;
        this.submitted = false;
    }

    editOrder(order: Orders) {
        this.order = order;
        this.selectedStatus = this.statuses.find(status => status.value === this.order.order_status);
        this.orderDialog = true;
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

    saveProduct() {
        this.submitted = true;
        this.order.order_status = this.selectedStatus.value;
        if (this.order.id) {
            this.ordersService.update(this.order).pipe(
                mergeMap(() => {
                    return this.ordersService.findAll();
                })
            ).subscribe((ordersData) => {
                this.orders = ordersData;
                this.orderDialog = false;
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
            }, (err) => {
                console.log(err)
            });
            
        } else {
            this.ordersService.save(this.order).pipe(
                mergeMap(() => {
                    return this.ordersService.findAll();
                })
            ).subscribe((ordersData) => {
                this.orders = ordersData;
                this.orderDialog = false;
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
            }, (err) => {
                console.log(err)
            });

        }
    }

}
