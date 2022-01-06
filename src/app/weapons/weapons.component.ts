import { Component, OnInit } from '@angular/core';
import { Weapon } from '../weapon';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent implements OnInit {

  weapons : Weapon[]=[];
  saw_cleaver : Weapon = {id:1,name:"saw cleaver",atk:5,dmg_type:1,price:10,imgPath:"../assets/img/weapons/saw_cleaver.jpg"};
  constructor() { }

  ngOnInit(): void {
    this.addWeapon(this.saw_cleaver);
    console.log(this.weapons);
  }
  
  addWeapon(weapon : Weapon): void{
    this.weapons.push(weapon);
    console.log(`ajout de ${weapon.name}`);
  }

}
