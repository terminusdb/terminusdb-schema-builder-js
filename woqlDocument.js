export class WoqlDocument {
    "@type": string;
    "@id": string;
    classObj: object;

    // get the class name
    constructor(id: string = null) {
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