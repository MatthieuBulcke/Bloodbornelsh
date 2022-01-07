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
  

  constructor(private service:ChangeTextService) { }

  ngOnInit(): void {
    
    this.service.loadItems()
      .subscribe( inventory => this.inventory = inventory);
    console.log(this.inventory);
  }
  
  addWeapon(weapon : Weapon): void{
    this.inventory.push(weapon);
    console.log(`ajout de ${weapon.name}`);
  }
}
