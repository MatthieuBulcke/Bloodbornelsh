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
      if (this.life <= 0) {
        let playerEchos = this.service.getUserProfile().subscribe(data => {
          playerEchos = data.echos;
          if (this.monster) {
            console.log(+playerEchos + +this.monster.loots)
            this.service.UpdateEchos(parseInt(localStorage.getItem('userId') as string), +playerEchos + +this.monster.loots).subscribe(data => console.log(data));
            this.monster = null;
          }
        });
      }
    });
    if (this.monster != null) {
      this.service.takeDamage(this.monster.atk);
      let playerLife = this.service.getUserProfile().subscribe(data => {
        playerLife = data.life.split('/')[0]; console.log(data.life.split('/')[0])
        //Si le monstre existe, applique ses dégats au joueur
        if (this.monster) {
          this.service.UpdateLife(parseInt(localStorage.getItem('userId') as string), +playerLife - this.monster.atk).subscribe(data => console.log(data));
        }
      });
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
    this.life = this.life - 5;
    this.service.useBullet();
    if (this.life <= 0) {
      this.monster = null;
    }
  }
}
