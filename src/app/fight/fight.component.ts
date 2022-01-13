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
    }

  }
  useHeal() {
    this.service.useHeal();
  }

  startFight(id: number) {
    if (id != 0) {
      this.service.getMonster(id)
        .subscribe(monster => {
          this.monster = monster;
          this.life = +monster.hp;
        });
    }
  }
  useBullet() {
    let fire : boolean;
    fire = this.service.useBullet();
    if(fire){
    this.life = this.life - 5;
    }
    this.monsterDeath(this.life);
  }

  /*****Fonction qui vérifie si le monstre est mort, ajoute son loot aux stats et le supprime *****/
  monsterDeath(pv: number) {
    if (this.monster) {
      if (pv <= 0) {
        let lootToNum: number;
        let lootsTab : string[]=this.monster.loots.split(',');
        lootToNum=+lootsTab[0];
        this.service.changeEchos(lootToNum);
        this.monster = null;
      }
    }
  }
  
}
