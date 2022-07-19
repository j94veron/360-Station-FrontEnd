export class Product {

    public id: number;
    public sku: number;
    public name: string;
    public price: string;
    public made: string;
    public typedesign: string;
    public descriptions: string;
    public category: string;
    public trademarks: string;
    public create_date: string;
    public stocks: number;
    public image: string;
    public status: string;


    constructor(data?: any) {
      if (data) {
        this.id = data.id;
        this.sku = data.sku;
        this.name = data.name;
        this.price = data.price;
        this.made = data.made;
        this.typedesign = data.typedesign;
        this.descriptions = data.descriptions;
        this.category = data.category;
        this.trademarks = data.trademarks;
        this.create_date = data.create_date;
        this.stocks = data.stocks;
        this.image = data.image;
        this.status = data.status;
      }
    }
  }