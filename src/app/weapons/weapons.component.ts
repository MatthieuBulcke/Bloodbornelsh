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
  //Fonction Update vie(id utilisateur, valeur de vie -> varchar)
  updateLife():void{
    this.service.UpdateLife(parseInt(localStorage.getItem('userId') as string),'5').subscribe(data => console.log(data));
  }
  //Fonction Update stam(id utilisateur, valeur de stamina -> varchar)
  updateStam():void{
    this.service.UpdateStam(parseInt(localStorage.getItem('userId') as string),'5').subscribe(data => console.log(data));
  }
  //Fonction Update Time(id utilisateur, Temps -> int)
  updateTime():void{
    this.service.UpdateTime(parseInt(localStorage.getItem('userId') as string),2).subscribe(data => console.log(data));
  }
  //Fonction Update echos(id utilisateur, echos('TOTAL') -> int)
  updateEchos():void{
    this.service.UpdateEchos(parseInt(localStorage.getItem('userId') as string),150).subscribe(data => console.log(data));
  }
  //Fonction Update weapon(id utilisateur, id de l'arme a équiper -> int)
  updateWeapon():void{
    this.service.UpdateWeapon(parseInt(localStorage.getItem('userId') as string),1).subscribe(data => console.log(data));
  }
  //FIN DE TESTS
  //fonction ajout d'arme dans l'inventaire
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
      this.service.InsertWeapon(parseInt(localStorage.getItem('userId') as string), weaponsString).subscribe(data => console.log(data));
      console.log(`ajout de ${weapon.name}`);
    }
  }
  selectWeapon(weapon: Weapon) {
    this.equipedWeapon = weapon;
    console.log(weapon.dmgType);
    this.service.changeWeapon(weapon);
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


