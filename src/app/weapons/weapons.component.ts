import { Component, OnInit } from '@angular/core';
import { Weapon } from '../weapon';
import { ChangeTextService } from '../change-text.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent implements OnInit {

  inventory! : Weapon[];
  weapons!: Weapon[];
  equipedWeapon! : Weapon;
  

  constructor(private service:ChangeTextService) { }

  ngOnInit(): void {

    this.service.LoadWeapons()
      .subscribe( (inventory:any) => this.inventory = inventory);
    console.log(this.inventory);
  }
  
  addWeapon(weapon : Weapon): void{
    this.inventory.push(weapon);
    console.log(`ajout de ${weapon.name}`);
  }

  selectWeapon(weapon : Weapon){
    this.equipedWeapon=weapon;
    console.log(weapon.dmgType);
    this.service.changeWeapon(weapon);
  }
}
