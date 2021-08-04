// type checking in Typescript is only done at compile time rather than runtime.
// http://blog.wolksoftware.com/decorators-metadata-reflection-in-typescript-from-novice-to-expert-part-4
// The name reflection is used to describe code which
// is able to inspect other code in the same system (or itself).

type Card = ['Card',any,number,number] | any
type CardP = Partial<Card>

type String = string |  'string'

const test:Card =['Card',"hello",1,3]

// type MinCard = ['CardMin',string,'mim']


class WoqlDocument {
    "@type": string;
    "@id": string;
    classObj: object;

    // get the class name
    constructor(id:string = null) {
      this['@type'] = this.constructor.name
      if(id)
        this['@id'] = id
    }

    optional(prop:string){
       return ['Optional',prop]
    }

    getClassObj(){
      return this.classObj
    }

    /*cardBetween(prop:string,min:number,max:number):[string,string,number,number]{
      return ['Card',prop,min,max]
    }*/



    json(){
      console.log(JSON.stringify(this))
      // return (JSON.stringify(this)
    }
}



// return Object.getOwnPropertyNames(a);
// you cannot get the properties from mere class (you can get only methods from prototype).
// You must create an instance. Then you get the properties by calling Object.getOwnPropertyNames().

interface Document {
  "@type":string,
  "@id":string,
}
// That's because properties in JavaScript start extisting only after they have some value.
// You have to assign the properties some value.
/*interface Region {
    Leinster : "Leinster";
    Munster : "Munster";
    Connacht : "Connacht";
    Ulster : "Ulster";
}*/

enum Region {
  Leinster='Leinster',
  Munster='Munster',
  Connacht='Connacht',
  Ulster='Ulster',
}

// ??
class Address extends WoqlDocument{
    idgen : ['street','region','postal_code'];
    street : string;
    region : Region;
    postalCode : string;
}

class Person extends WoqlDocument{
    x:number;
    y:number;
    address: Address;
    multiValue: Address[];
    test?: string;
    cardValue: Card = ['string','Card',1,3]

}

const address = new Address()
address.street="my street"
address.region= Region.Munster
address.postalCode ='my postal code'

const person = new Person("Tom");
person.x= 10
person.json()
person.address = address;
person.multiValue=[address]
person.multiValue.push(address)
person.cardValue = ['test']
person.cardValue.push('test001')


export interface AnimalProperties {
  species?: string;
  id?: string;
  color?: string;
}


export class Animal {
  constructor(attributes: AnimalProperties = {}) {
    for (const key in attributes) {
      // this[key] = attributes[key];
    }
  }
}



console.log(Object.getOwnPropertyNames(person))

// console.log("getOwnPropertyDescriptor",
// Object.getOwnPropertyDescriptor(person))

// var ggg = JSON.parse({,,,,...})

// ggg.gggg=kkkkk

const keys = Object.keys(Person);
console.log('key',keys)

// [ '@type', '@id', 'x' ]

console.log("test")
console.log("nEWWWWWW",person.json());
/*interface Person {

}





class Person extends WoqlDocument{
     x:number;
     y:number;
}*/

// Person.json()

// const person = new Person("Tom");
// console.log("ppppp",JSON.stringify(Document));
// console.log("TEST",JSON.stringify(Person));

/*
      { '@type' : 'Class',
  '@id' : 'Person',
  'name' : 'xsd:string',
  'age' : [ 'Optional', 'xsd:decimal' ],
  'friend_of' : [ 'Set', 'Person' ]
}*/


/*function Person(first, last, age, eyecolor) {
  this.firstName = first; // we wrap it around a function to have pseudo-types
  this.lastName = last;
  this.age = age;
  this.eyeColor = eyecolor;
}
undefined
const v = new Person("hello","new","age","ggg")
//undefined
console.log(JSON.stringify(v)"
//"{\"firstName\":\"hello\",\"lastName\":\"new\",\"age\":\"age\",\"eyeColor\":\"ggg\"}"*/


