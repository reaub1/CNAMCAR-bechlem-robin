export class Vehicle {
    constructor(
      public id: number,
      public brand: string,
      public model: string,
      public price: number,
      public km: number, 
      public year: number,
      public description: string,
      public isSold: boolean,
      public isRented: boolean,
      public isDamaged: boolean,
      public imageUrl: string,
    ) {}
  }
  