import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfig } from '../../api/appconfig';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Orders } from '@app/models/orders.model';
import { Product } from '@app/models/product.model';
import { OrdersService } from '@app/service/orders.service';
import { ProductService } from '@app/service/product.service';
import { Constants } from "@constants/constants";
import { mergeMap } from 'rxjs';
import { CredentialData } from '@app/models/credential.data.model';
import { LoginService } from "@service/login.service";
import { StorageUtils } from '@utils/storage.utils';
import { AuthorizationService } from "@service/authorization.service";



@Component({
  selector: 'app-product',
  providers: [MessageService, ConfirmationService],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  pageTitle = 'Detalle de Producto';

  config: AppConfig;

  errorMessage: String;

  product: Product;

  public productId: number;

  submitted: boolean;

  orderDialog: boolean;

  orders: Orders[];

  order: Orders;

  shipppingies: any;

  selectedShipping: any;

  selectedQuantity: any;

  stockDisp: number[];

  credentialData = new CredentialData();

  result: any;

  constructor(private route:ActivatedRoute, private router: Router, private productService: ProductService, private loginService: LoginService,
    private ordersService: OrdersService, private messageService: MessageService, private confirmationService: ConfirmationService, public authorizationService: AuthorizationService) { }

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get(Constants.PRODUCT_PATH);
    
    if (this.productId) {
      this.productService.findOne(this.productId).subscribe({
        next: product => {
          this.product = product;
          this.stockDisp = Array.from({length: this.product.stocks}, (_, i) => i + 1);
          console.dir(this.stockDisp);
        },
        error: err => this.errorMessage = err
      });
    } else [
      this.errorMessage = 'El producto id es requerido'
    ];

    this.shipppingies = [
      {label: 'RETIRO EN TIENDA', value: 'RETIRO EN TIENDA'},
      {label: 'ENVIO A DOMICILIO', value: 'ENVIO A DOMICILIO'}
    ];
  
  }

  
  onBack(): void{
    this.router.navigate(['/']);
  }

  openNew() {
    this.order = new Orders();
    this.selectedShipping = this.shipppingies.find(category => category.value === "RETIRO EN TIENDA");
    this.orderDialog = true;
  }

  hideDialog() {
    this.orderDialog = false;
    this.submitted = false;
}

saveOrder():void{
    var user = StorageUtils.getUser();

    this.submitted = true;
    this.order.customerId = user.username;
    this.order.product_id = this.product.id;
    this.order.name_product = this.product.name;
    this.order.made_product = this.product.made;
    this.order.category_product = this.product.category;
    this.order.shipping = this.selectedShipping.value;
    this.order.order_status = "SOLICITADO";
    this.order.price_product = this.product.price;
    this.order.active = "ACTIVE";
    if(this.order.id){
      this.ordersService.update(this.order).pipe(
        mergeMap(() => {
          return this.ordersService.findAll();
        })
      ).subscribe((ordersData) => {
        this.orders = ordersData;
        this.orderDialog = false;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Orden Update.', life: 3000});
      }, (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se ha podido actualizar la orden.', life: 3000});
        console.log(err)
      });
    } else {
      this.ordersService.save(this.order).pipe(
        mergeMap(() => {
          return this.ordersService.findOne(this.productId);
        })
      ).subscribe((ordersData) => {
        this.order = ordersData;
        this.orderDialog = false;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Orden Creada.', life: 3000});
      }, (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se ha podido crear la orden.', life: 3000});
        this.messageService.add({severity: 'error', summary: 'Error', detail: err, life: 3000});
        console.log(err)
      });
    }
  }

}
