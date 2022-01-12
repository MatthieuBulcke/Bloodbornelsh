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
  atk! : Element;
  heal! : Element;
  shoot! : Element;
  profiles! : Profile;
  life!:number;
  constructor(private service: ChangeTextService) { }

  ngOnInit(): void {
    this.service.currentFight.subscribe(idFight=>{
      this.startFight(idFight);
    });
  }
  
  dealDamages(){
    this.service.currentAtk.subscribe(atk=>{
      this.life= this.life-atk;
      if(this.life <= 0){
        this.monster=null;
      }
    })

  }
  useHeal(){
  }

  startFight(id: number){
    if (id != 0) {
      this.service.getMonster(id)
        .subscribe(monster => {
          this.monster = monster;
          this.life=+monster.hp;
        });
    }
  }
  useBullet(){

  }

  
  // ngAfterViewInit(){
  //   this.atk = document.getElementsByClassName('atk')[0];
  //   this.heal = document.getElementsByClassName('useHeal')[0];
  //   this.shoot = document.getElementsByClassName('shoot')[0];
  //   this.atk.addEventListener('click',this.dealDamages);
  //   this.heal.addEventListener('click',this.useHeal);
  //   this.shoot.addEventListener('click',this.useBullet);
  // }
}
