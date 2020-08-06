import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {
   equipmentItems: object[] = [
       {name: 'Duct Tape', mass: 0.5},
       {name: 'Space Camera', mass: 20},
       {name: 'Food', mass: 150},
       {name: 'Oxygen Tanks', mass: 400},
       {name: 'AE-35 Unit', mass: 5},
       {name: 'ISS Supplies', mass: 800},
       {name: 'Water', mass: 250},
       {name: 'Satellite', mass: 1200},
       {name: 'R2 Unit', mass: 32}
   ];
   cargoHold: object[] = [];
   cargoMass: number = 0;
   maximumAllowedMass: number = 2000;
   maxItems: number = 10;
   nearCapacity: boolean = false;

   constructor() { }

   ngOnInit() { }

   allowOnlyTwoSameItems(item) {
     let indices = [];
     for (let i = 0; i < this.cargoHold.length; i++) {
       if (this.cargoHold.includes(item)){
        indices[i] = this.cargoHold.indexOf(item);
       }
     }
     if (indices.length < 2) {
      this.cargoHold.push(item);
     }
   }
   addItem(item): boolean{
     if (this.cargoMass < this.maximumAllowedMass && this.cargoHold.length < this.maxItems && this.count(item) < 2) {
      this.cargoHold.push(item);
      this.cargoMass += item.mass;
     } 
     return this.maximumAllowedMass - 200  < this.cargoMass;
   }
   canAddCargo(item) {
     return this.cargoHold.length !== this.maxItems && this.cargoMass + item.mass <= this.maximumAllowedMass && this.count(item) < 2;
   }
   emptyHold() {
    this.cargoHold = [];
    this.cargoMass = 0;
   }
   removeItem(item) {
     let index = this.cargoHold.indexOf(item);
     this.cargoHold.splice(index, 1);
     this.cargoMass -= item.mass; 
     if(this.cargoHold.length === 0) {
      this.emptyHold();
     }
   }
   count(item) {
    let sum = 0;
    for(let i = 0; i < this.cargoHold.length; i++){
      if(this.cargoHold[i] === item) {
        sum++;
      }
    }
    return sum;
   }
}
