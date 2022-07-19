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

    madies: any[];

    trademarkies: any[];

    rowsPerPageOptions = [5, 10, 20];

    selectedStatus: any;

    selectedCategory: any;

    selectecTrademark: any;

    selectedMadies: any;

    constructor(private productService: ProductService, private messageService: MessageService,
                private confirmationService: ConfirmationService) {}

    ngOnInit() {
        this.productService.findAll().subscribe(results => this.products = results);

        this.cols = [
            {field: 'trademarks', header: 'Trademarks'},
            {field: 'sku', header: 'Sku'},
            {field: 'stocks', header: 'Stocks'},
            {field: 'name', header: 'Name'},
            {field: 'price', header: 'Price'},
            {field: 'category', header: 'Category'},
            {field: 'made', header: 'Made'},
            {field: 'status', header: 'Status'}
        ];

        this.statuses = [
            {label: 'EN STOCK', value: 'instock'},
            {label: 'POCO STOCK', value: 'lowstock'},
            {label: 'SIN STOCK', value: 'OUTOFSTOCK'}
        ];

        this.categories = [
            {label: 'Accesorios', value: 'ACCESORIOS'},
            {label: 'Fundas', value: 'FUNDAS'},
            {label: 'Protectores', value: 'PROTECTORES'},
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

        this.madies = [
            {label: 'ANIME', value: 'ANIME'},
            {label: 'SERIES', value: 'SERIES'},
            {label: 'SUPER HEROES', value: 'SUPER HEROES'},
            {label: 'PELICULAS', value: 'PELICULAS'},
            {label: 'FUTBOL', value: 'FUTBOL'},
            {label: 'OTRA', value: 'OTRA'},
        ]

    }

    openNew() {
        this.product = new Product({status: "OUTOFSTOCK", category: 'Others'});
        this.selectedStatus = this.statuses.find(status => status.value === "OUTOFSTOCK");
        this.selectedCategory = this.categories.find(category => category.value === "Others");
        this.selectecTrademark = this.trademarkies.find(trademarks => trademarks.value === "Other");
        this.selectedMadies = this.madies.find(made => made.value === "OTRA");
        this.productDialog = true;
    }

    editProduct(product: Product) {
        this.product = product;
        this.selectedStatus = this.statuses.find(status => status.value === this.product.status);
        this.selectedCategory = this.categories.find(category => category.label === this.product.category);
        this.selectecTrademark = this.trademarkies.find(trademarks => trademarks.value === this.product.trademarks);
        this.selectedMadies = this.madies.find(made => made.value === this.product.made);
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
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'El Producto no se ah podido eliminar.', life: 3000});
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
        this.product.status = this.selectedStatus.label;
        this.product.category = this.selectedCategory.value;
        this.product.trademarks = this.selectecTrademark.value;
        this.product.made = this.selectedMadies.value;
        if (this.product.id) {
            this.productService.update(this.product).pipe(
                mergeMap(() => {
                    return this.productService.findAll();
                })
            ).subscribe((productsData) => {
                this.products = productsData;
                this.productDialog = false;
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Producto Actualizado.', life: 3000});
            }, (err) => {
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'El Producto no se ha podido actualizar.', life: 3000});
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
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'El Producto no se ha podido crear.', life: 3000});
                console.log(err)
            });

        }
    }

}
