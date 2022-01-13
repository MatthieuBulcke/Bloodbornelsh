import { Component, OnInit } from '@angular/core';
import { ChangeTextService } from '../change-text.service';
import { Profile } from '../model/profile.model';
import { Weapon } from '../weapon';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  weapons!: Weapon[];
  profile!: Profile;
  inventory: Weapon[] = [];
  constructor(private changeText:ChangeTextService) { }

  ngOnInit(): void {
    this.changeText.getUserProfile().subscribe((profiles: Profile) => this.profile = profiles);
    this.changeText.LoadWeapons().subscribe((inventory:any) => {this.weapons = inventory;console.log(this.weapons)});
    this.changeText.getUserProfile().subscribe((profile: any) => {
      this.profile = profile;
      this.profile.inventory = profile.inventory.split(','); console.log(this.profile);
      if (this.profile.inventory != "") {
        for (let i = 0; i < this.profile.inventory.length; i++) {
          this.changeText.LoadWeapon(profile.inventory[i])
            .subscribe((weapon: Weapon) => this.inventory.push(weapon));
        }
      }
    });
  }
  initShop(){

  }
  addWeapon(weapon: Weapon): void {
    let weaponsTable: any[] = [];
    let alreadyOwned: boolean = false;
    //pour chaque élément dans l'inventaire, vérifie si le joueur possède déja l'arme
    this.inventory.forEach(element => {
      weaponsTable.push(element.idWeapon);
      if (element.idWeapon == weapon.idWeapon) {
        console.log('arme déja dans l\'inventaire');
        alreadyOwned = true;
      }
    });
    //Si le joueur ne possède pas l'arme, lui ajoute //TODO ADD PAY
    if (!alreadyOwned) {
      let weaponsString: string;
      this.inventory.push(weapon);
      weaponsTable.push(weapon.idWeapon);
      weaponsString = weaponsTable.join(',');
      console.log(localStorage.getItem('userId'));
      console.log('weapons:' + weaponsString);
      this.changeText.InsertWeapon(parseInt(localStorage.getItem('userId') as string), weaponsString).subscribe(data => console.log(data));
      console.log(`ajout de ${weapon.name}`);
    }
  }
  hideShop(){
    let shop = document.getElementsByClassName('shop');
    shop[0].classList.add('empty');
  }
}
