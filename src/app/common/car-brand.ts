export class CarBrand {
  constructor(public id:number,
              public version:number,
              public createdDate:Date,
              public updatedDate:Date,
              public brandName:string,
              public countryOfOrigin:string,
              public yearOfFoundation:number
  ) {
  }
}
