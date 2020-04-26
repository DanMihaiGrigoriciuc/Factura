/*Magazie
Un magazioner gestioneaza stocuri de materiale in magazia sa
Un material are: denumire, categorie, brand(firma producatoare)
O intrare in stoc inseamna: un material, data intrare si cantitatea intrata
Un stoc poate avea una sau mai multe intrari de materiale si o metoda de intrare iesire in/din stoc.
Metodele de intrare/iesire pot fi: FIFO (primul intrat - primul iesit), LIFO (ultimul intrat - primul iesit)
Fiecare stoc de materiale are o capacitate maxima si un prag minim (cand e nevoie de aprovizionare).
In stoc nu poate intra o cantitate mai mare de materiale decat capacitate maxima.

Magazionerul tre sa poata opera intrarea si iesirea materialelor in/din stoc

Magazionerul trebuie sa aiba o modalitate de a verifica daca are stocuri care necesita aprovizionare
Magazionerul trebuie sa aiba o modalitate de a verifica daca are stocuri care se apropie de capacitatea maxima cu mai putin de 10%.

Lucram cu clase (ECMAScript 2015/ES6)*/


class Material{
    constructor(denumire, categorie, brand){
        this.denumire = denumire;
        this.categorie = categorie;
        this.brand =brand;
        
    }
}

class IntrareInStoc{
  constructor(dataIntrare, cantitate){
    this.dataIntrare = dataIntrare;
    this.cantitate = cantitate;
  }
}

class Stoc extends Material{
    constructor(denumire, categorie, brand, metoda, capacitateMinima, capacitateMaxima){
        super(denumire, categorie, brand);  
        this.metoda = metoda;
        this.capacitateMinima = capacitateMinima;
        this.capacitateMaxima = capacitateMaxima;      
        this.intrari = [];        
    }

    cantitateExistenta(){
      let totalExistenta = 0;
      for(let i = 0; i < this.intrari.length;i++){
        totalExistenta += this.intrari[i].cantitate;
      }       
      return totalExistenta;
    }

    intrareStoc(intrareInStoc){      
      if(intrareInStoc.cantitate <= this.capacitateMaxima-this.cantitateExistenta()){
          this.intrari.push(intrareInStoc);
          return true;
      }else{
          return ("Nu mai incape marfa");
      }      
    } 

    iesireStoc(cantitate){      
      let scoate = this.metoda=="FIFO" ? this.intrari[0].cantitate < cantitate : this.intrari[this.intrari.length-1].cantitate < cantitate;
      while(scoate){
        if(this.metoda=="FIFO"){
          cantitate = cantitate-this.intrari[0].cantitate;        
          this.intrari.shift();
        }
        else{
          cantitate = cantitate-this.intrari[this.intrari.length-1].cantitate;        
          this.intrari.pop();
        }
        scoate = this.metoda=="FIFO" ? this.intrari[0].cantitate < cantitate : this.intrari[this.intrari.length-1].cantitate < cantitate;
      }
      this.intrari[0].cantitate = this.intrari[0].cantitate - cantitate;     

    } 

    necesitaAprovizionare(){
        return this.cantitateExistenta() > this.capacitateMinima;
        /*let necesitatiAprov = true;
        if(this.cantitateExistenta() > capacitateMinima){
            necesitatiAprov = false;
        }
        return necesitatiAprov;*/
    }

    preaMultaCantitateInStoc(){
        return this.cantitateExistenta() > this.capacitateMaxima - this.capacitateMaxima*0.1;        
    }

}

//
let stocFainaBaneasa = new Stoc("Faina baneasa", "Alimente","Baneasa", "FIFO", 200, 1500);
let stocLapteAlba = new Stoc("Lapte", "Alimente", "Alba", "LIFO", 350, 2000);

let intrare1Lapte = new IntrareInStoc(new Date(2020, 4, 20), 400);
stocLapteAlba.intrareStoc(intrare1Lapte);
let intrare2Lapte = new IntrareInStoc(new Date(2020, 5, 20), 700);
stocLapteAlba.intrareStoc(intrare2Lapte);
let intrare3Lapte = new IntrareInStoc(new Date(2020, 8, 20), 600);
stocLapteAlba.intrareStoc(intrare3Lapte);
let intrare4Lapte = new IntrareInStoc(new Date(2020, 8, 20), 2000);
stocLapteAlba.intrareStoc(intrare4Lapte);


console.log("Stoc lapte Alba ", stocLapteAlba.cantitateExistenta());
console.log("Stoc lapte Alba ", stocLapteAlba.intrareStoc(2000));
console.log("Stoc lapte Alba ", stocLapteAlba.cantitateExistenta());

// stocLapteAlba.iesireStoc(500);
// console.log("Stoc lapte Alba ", stocLapteAlba.cantitateExistenta());
// stocLapteAlba.iesireStoc(800);
// console.log("Stoc lapte Alba ", stocLapteAlba.cantitateExistenta());
// stocLapteAlba.iesireStoc(300);
// console.log("Stoc lapte Alba ", stocLapteAlba.cantitateExistenta());

console.log(stocLapteAlba.necesitaAprovizionare());
console.log(stocLapteAlba.preaMultaCantitateInStoc());


let intrare1 = new IntrareInStoc(new Date(2020, 1, 10), 300);
stocFainaBaneasa.intrareStoc(intrare1);
console.log(intrare1.cantitate);

let intrare2 = new IntrareInStoc(new Date(2020, 2, 10), 700);
stocFainaBaneasa.intrareStoc(intrare2);

let intrare3 = new IntrareInStoc(new Date(2020, 3, 10), 100);
let intrat = stocFainaBaneasa.intrareStoc(intrare3);
console.log("Stoc faina Baneasa ", stocFainaBaneasa.cantitateExistenta())

if(!intrat){
  //console.log("Nu mai am loc!");
  stocFainaBaneasa.capacitateMaxima += 500;
  let intrat = stocFainaBaneasa.intrareStoc(intrare3);
}

let necesita = stocFainaBaneasa.necesitaAprovizionare();
if(necesita){
  //dau telefon la furnizor
}