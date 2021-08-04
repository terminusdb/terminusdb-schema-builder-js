import {WoqlDocument} from "./woqlDocument"
type Card = ['Card',any,number,number] | any
//type LEXICAL = ['Lexical',[any]]
//type KEY =LEXICAL | RANDOM |


/*export class Address extends WoqlDocument {
    idgen : ['street','region','postalCode'];
    street : string;
    region : string;
    postalCode : string;
}*/

enum Region {
    Leinster='Leinster',
    Munster='Munster',
    Connacht='Connacht',
    Ulster='Ulster',
  }

  class Address extends WoqlDocument{
      //_key  = LEXICAL =['']
      cardValue: Card = ['string','Card',1,3]
      idgen : ['street','region','postalCode'];
      street?: string;
      region?: Region;
      postalCode : string;
           
  }
  
  
  /*interface Test {
    name?: string;
    age?: number;
    phone: string;
}*/


 /* class Person extends WoqlDocument{
      x:number;
      y:number;
      address: Address;
      multiValue: Address[];
      test: string;
      cardValue: Card = ['string','Card',1,3]
  
}*/

