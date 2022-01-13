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
  weaponImg=document.getElementsByClassName("weaponImg");

  constructor(private service: ChangeTextService) { }

  ngOnInit(): void {
    this.service.getUserProfile().subscribe((profile: any) => {
      this.profile = profile;
      this.profile.inventory = profile.inventory.split(','); console.log(this.profile);
      if (this.profile.inventory != "") {
        for (let i = 0; i < this.profile.inventory.length; i++) {
          this.service.LoadWeapon(profile.inventory[i])
            .subscribe((weapon: Weapon) => this.inventory.push(weapon));
        }
      }
    });
    this.service.currentWeaponToAdd
    .subscribe(id =>{
      this.addWeaponToInventory(id);
    })
    //this.service.LoadWeapons().subscribe((inventory:any) => this.inventory = inventory);
  }
  //TEST FONCTION UPDATES
  updateLife():void{
    this.service.UpdateLife(parseInt(localStorage.getItem('userId') as string),'5').subscribe(data => console.log(data));
  }
  //FIN DE TESTS
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
    //Si le joueur ne possède pas l'arme, lui ajoute //TODO ADD PAY
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
    // this.weaponImg[id].classList.add("active");
  }

  addWeaponToInventory(id: number){
    this.service.currentId
    .subscribe(id => {
      if(id=='2'){
        this.inventory=[];
      }
    })
    this.service.LoadWeapon(id)
      .subscribe(weapon =>{
        this.addWeapon(weapon);
        if (this.inventory.length==1){
          this.selectWeapon(this.inventory[0]);
        }
      })
  }

}


