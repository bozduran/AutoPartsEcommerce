export class OrderHistory {
  constructor(
              public orderTrackingId:string,
              public totalPrice:number,
              public status:string,
              public createdDate:Date) {
  }
}
