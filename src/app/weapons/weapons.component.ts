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

  profile!: any;
  inventory: Weapon[] = [];
  weapons!: Weapon[];
  equipedWeapon!: Weapon;


  constructor(private service: ChangeTextService) { }

  ngOnInit(): void {
    this.service.getUserProfile().subscribe((profile: any) => {
      this.profile = profile;
      this.profile.inventory = profile.inventory.split(','); console.log(this.profile);
      for (let i = 0; i < this.profile.inventory.length; i++) {
        this.service.LoadWeapon(profile.inventory[i])
          .subscribe((weapon: Weapon) => this.inventory.push(weapon));
      }
    });
    //this.service.LoadWeapons().subscribe((inventory:any) => this.inventory = inventory);
  }

  addWeapon(weapon: Weapon): void {
    let weaponsTable: any[] = [];
    let weaponsString: any;
    let alreadyOwned: boolean = false;
    this.inventory.forEach(element => {
      weaponsTable.push(element.idWeapon);
      if (element.idWeapon == weapon.idWeapon) {
        console.log('arme déja dans l\'inventaire');
        alreadyOwned = true;
      }
    });
    if (!alreadyOwned) {
      let weaponsString: string;
      this.inventory.push(weapon);
      weaponsTable.push(weapon.idWeapon);
      weaponsString = weaponsTable.join(',');
      console.log(localStorage.getItem('userId'));
      console.log('weapons:' + weaponsString);
      this.service.InsertWeapon(parseInt(localStorage.getItem('userId') as string), weaponsString).subscribe(data => console.log(data));
      console.log(`ajout de ${weapon.name}`);
    }
  }
  selectWeapon(weapon: Weapon) {
    this.equipedWeapon = weapon;
    console.log(weapon.dmgType);
    this.service.changeWeapon(weapon);
  }
}
