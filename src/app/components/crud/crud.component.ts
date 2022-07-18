import { Component, OnInit } from '@angular/core';
import { Product } from '@models/product.model';
import { ProductService } from '@service/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { mergeMap } from 'rxjs/operators';

@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['../../../assets/demo/badges.scss']
})
export class CrudComponent implements OnInit {

    productDialog: boolean;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[];

    product: Product;

    selectedProducts: Product[];

    submitted: boolean;

    cols: any[];

    statuses: any[];

    categories: any[];

    trademarkies: any[];

    rowsPerPageOptions = [5, 10, 20];

    selectedStatus: any;

    selectedCategory: any;

    selectecTrademark: any;

    constructor(private productService: ProductService, private messageService: MessageService,
                private confirmationService: ConfirmationService) {}

    ngOnInit() {
        this.productService.findAll().subscribe(results => this.products = results);

        this.cols = [
            {field: 'trademarks', header: 'Trademarks'},
            {field: 'sku', header: 'sku'},
            {field: 'stocks', header: 'stocks'},
            {field: 'name', header: 'Name'},
            {field: 'price', header: 'Price'},
            {field: 'category', header: 'Category'},
            {field: 'rating', header: 'Reviews'},
            {field: 'status', header: 'Status'}
        ];

        this.statuses = [
            {label: 'En Stock', value: 'instock'},
            {label: 'Poco Stock', value: 'lowstock'},
            {label: 'Sin Stock', value: 'outofstock'}
        ];

        this.categories = [
            {label: 'Accesorios', value: 'Accessories'},
            {label: 'Fundas', value: 'Case'},
            {label: 'Protectores', value: 'ScreenProtector'},
            {label: 'Otros', value: 'Others'}
        ];

        this.trademarkies = [
            {label: 'Iphone', value: 'Iphone'},
            {label: 'Moto', value: 'Moto'},
            {label: 'Xiaomi', value: 'Xiaomi'},
            {label: 'LG', value: 'LG'},
            {label: 'Samsung', value: 'Samsung'},
            {label: 'Otra', value: 'Other'},
        ]

    }

    openNew() {
        this.product = new Product({status: "outofstock", category: 'Others'});
        this.selectedStatus = this.statuses.find(status => status.value === "outofstock");
        this.selectedCategory = this.categories.find(category => category.value === "Others");
        this.selectecTrademark = this.trademarkies.find(trademarks => trademarks.value === "Other");
        this.productDialog = true;
    }

    editProduct(product: Product) {
        this.product = product;
        this.selectedStatus = this.statuses.find(status => status.value === this.product.status);
        this.selectedCategory = this.categories.find(category => category.value === this.product.category);
        this.selectecTrademark = this.trademarkies.find(trademarks => trademarks.value === this.product.trademarks);
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.product = product;
        this.productService.delete(this.product.id).pipe(
            mergeMap(() => {
                return this.productService.findAll();
            })
        ).subscribe((productsData) => {
            this.products = productsData;
            this.productDialog = false;
            this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product borrado', life: 3000});
        }, (err) => {
            console.log(err)
        });
        this.deleteProductDialog = true;
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;
        this.product.status = this.selectedStatus.value;
        this.product.category = this.selectedCategory.value;
        this.product.trademarks = this.selectecTrademark.value;
        if (this.product.id) {
            this.productService.update(this.product).pipe(
                mergeMap(() => {
                    return this.productService.findAll();
                })
            ).subscribe((productsData) => {
                this.products = productsData;
                this.productDialog = false;
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
            }, (err) => {
                console.log(err)
            });
            
        } else {
            this.productService.save(this.product).pipe(
                mergeMap(() => {
                    return this.productService.findAll();
                })
            ).subscribe((productsData) => {
                this.products = productsData;
                this.productDialog = false;
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
            }, (err) => {
                console.log(err)
            });

        }
    }

}
