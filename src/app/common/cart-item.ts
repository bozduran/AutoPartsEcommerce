import {Part} from './part';

export class CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;

  constructor(part: Part) {
    this.id = part.id;
    this.name = part.partName;
    this.price = part.price;
    this.quantity = 1;
  }
}



