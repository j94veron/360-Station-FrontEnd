import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Product } from '@models/product.model';
import { ProductService } from '@service/product.service';

@Component({
    templateUrl: './list.component.html',
    styleUrls: ['../../../assets/demo/badges.scss']
})
export class ListComponent implements OnInit {

    products: Product[];
    
    sortOptions: SelectItem[];

    sortOrder: number;

    sortField: string;

    sourceCities: any[];

    targetCities: any[];

    orderCities: any[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.findAll().subscribe(results => this.products = results);

        this.sortOptions = [
            {label: 'Ordenar por Mayor Precio', value: '!price'},
            {label: 'Ordenar por Menor Precio', value: 'price'}
        ];
    }

    onSortChange(event) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    onSelect(product: Product): void{
        this.productService.findOne()
    }
}
