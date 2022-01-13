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
  echos!:number;
  constructor(private changeText: ChangeTextService) { }

  ngOnInit(): void {
    this.changeText.getUserProfile().subscribe((profiles: Profile) => this.profile = profiles);
    this.changeText.LoadWeapons().subscribe((inventory: any) => { this.weapons = inventory; console.log(this.weapons) });
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
    this.changeText.currentEchos.subscribe((echos)=>this.echos=echos);
  }
  initShop() {

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
      if(this.profile.echos>=weapon.price){
        this.changeText.changeEchos(-weapon.price);
        this.changeText.getUserProfile().subscribe((profiles: Profile) => {
          this.changeText.UpdateEchos(parseInt(localStorage.getItem('userId') as string), profiles.echos - weapon.price).subscribe(data => console.log(data));
          this.profile = profiles
        });
        let weaponsString: string;
        this.inventory.push(weapon);
        weaponsTable.push(weapon.idWeapon);
        weaponsString = weaponsTable.join(',');
        console.log(localStorage.getItem('userId'));
        console.log('weapons:' + weaponsString);
        this.changeText.InsertWeapon(parseInt(localStorage.getItem('userId') as string), weaponsString).subscribe(data => console.log(data));
        console.log(`ajout de ${weapon.name}`);
        this.changeText.addWeaponToIventory(weapon.idWeapon);
      }
    }
  }
  buyPotion() {
    this.changeText.getUserProfile().subscribe(data => {
      let playerPotions = data.potions;
      if (data.echos >= 10) {
        this.changeText.addHeal();
        this.changeText.changeEchos(-10);
        this.changeText.UpdateEchos(parseInt(localStorage.getItem('userId') as string), +data.echos - 10).subscribe(data => console.log(data));
        this.changeText.UpdatePotions(parseInt(localStorage.getItem('userId') as string), +playerPotions + 1).subscribe(data => console.log(data));
      }
    });
  }
  buyBullet() {
    let playerBullets = this.changeText.getUserProfile().subscribe(data => {
      playerBullets = data.bullets;
      if (data.echos >= 10) {
        this.changeText.addBullet();
        this.changeText.changeEchos(-10);
        this.changeText.UpdateEchos(parseInt(localStorage.getItem('userId') as string), +data.echos - 10).subscribe(data => console.log(data));
        this.changeText.UpdateBullets(parseInt(localStorage.getItem('userId') as string), +playerBullets + 1).subscribe(data => console.log(data));
      }
    });
  }
  hideShop() {
    let shop = document.getElementsByClassName('shop');
    shop[0].classList.add('empty');
  }
}
