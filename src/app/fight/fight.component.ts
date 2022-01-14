import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { ChangeTextService } from '../change-text.service';
import { Profile } from '../model/profile.model';
import { Monster } from '../monster';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.css']
})
export class FightComponent implements OnInit {

  monster!: Monster | null;
  atk!: Element;
  heal!: Element;
  shoot!: Element;
  profiles!: Profile;
  life!: number;
  constructor(private service: ChangeTextService) { }

  ngOnInit(): void {
    this.service.currentFight.subscribe(idFight => {
      this.startFight(idFight);
    });
  }

  dealDamages() {
    this.service.currentAtk.subscribe(atk => {
      this.life = this.life - atk;
      this.monsterDeath(this.life);
    });
    if (this.monster != null) {
      this.service.takeDamage(this.monster.atk);
      let playerLife = this.service.getUserProfile().subscribe(data => {
        if(this.monster!=null && this.monster.atk>=data.life){
          this.service.ResetUser(localStorage.getItem('userId')).subscribe(data => console.log(data));
          document.location.href="/";
        }
        playerLife = data.life.split('/')[0]; console.log(data.life.split('/')[0])
        //Si le monstre existe, applique ses dégats au joueur
        if (this.monster) {
          this.service.UpdateLife(parseInt(localStorage.getItem('userId') as string), +playerLife - this.monster.atk).subscribe(data => console.log(data));
        }
      });
    }
  }
  useHeal() {
    this.service.getUserProfile().subscribe(data => {
      let playerPotions = data.potions;
      if (this.monster && playerPotions > 0) {
        this.service.useHeal();
        this.service.UpdatePotions(parseInt(localStorage.getItem('userId') as string), +playerPotions - 1).subscribe(data => console.log(data));
      }
    });
  }

  startFight(id: number) {
    if (id != 0 && id!=1) {
      this.service.getMonster(id)
        .subscribe(monster => {
          this.monster = monster;
          this.life = +monster.hp;
        });
    }
  }
  useBullet() {
    this.life = this.life - 5;
    this.service.useBullet();
    this.monsterDeath(this.life);
    let playerBullets = this.service.getUserProfile().subscribe(data => {
      playerBullets = data.bullets;
      if (this.monster) {
        this.service.UpdateBullets(parseInt(localStorage.getItem('userId') as string), +playerBullets - 1).subscribe(data => console.log(data));
      }
    });
  }
  /*****Fonction qui vérifie si le monstre est mort, ajoute son loot aux stats et le supprime *****/
  monsterDeath(pv: number) {
    if (this.monster) {
      if (pv <= 0) {
        let lootToNum: number;
        let lootsTab: string[] = this.monster.loots.split(',');
        lootToNum = +lootsTab[0];
        this.service.changeEchos(lootToNum);
        let playerEchos = this.service.getUserProfile().subscribe(data => {
          playerEchos = data.echos;
          if (this.monster) {
            this.service.UpdateEchos(parseInt(localStorage.getItem('userId') as string), +playerEchos + +this.monster.loots).subscribe(data => console.log(data));
            this.monster = null;
          }
        });
      }
    }
  }
}
