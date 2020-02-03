export class Product {
    public id: string;
    public name: string;
    public description: string;
    public price: string;
    public imagePath: string;

    constructor(id: string, name: string, desc: string, price: string, imagePath: string) {
      this.id = id;
      this.name = name;
      this.description = desc;
      this.price = price;
      this.imagePath = imagePath;
    }
  }