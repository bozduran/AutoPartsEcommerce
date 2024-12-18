export class CarModel {
  constructor(public id:number,
                                     public version:number,
                                     public createdDate:Date,
                                     public updatedDate:Date,
                                      public modelName:string,
              public yearOfProduction:number,
              public drive:string,
              public fuelType:string,
              public transmission:string,
              public carType:string


) {
}
}


