export class Orders {

    public id: number;
    public customerId: string;
    public product_id: number;
    public name_product: string;
    public made_product: string;
    public category_product: string;
    public shipping: string;
    public address_user: string;
    public order_date: string;
    public order_status: string;
    public quantity: number;
    public price_product: string;
    public active: string;

    constructor(data?: any) {
      if (data) {
        this.id = data.id;
        this.customerId = data.customerId;
        this.product_id = data.product_id;
        this.name_product = data.name_product;
        this.made_product = data.made_product;
        this.category_product = data.category_product;
        this.shipping = data.shipping;
        this.address_user = data.address_user;
        this.order_date = data.order_date;
        this.order_status = data.order_status;
        this.quantity = data.quantity;
        this.price_product = data.price_product;
        this.active = data.active;
     }
    }
  }