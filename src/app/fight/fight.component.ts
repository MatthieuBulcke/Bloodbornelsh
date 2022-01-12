import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { ChangeTextService } from '../change-text.service';
import { Profile } from '../model/profile.model';
import { Monster } from '../monster';
import { ChangeTextService } from '../change-text.service';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.css']
})
export class FightComponent implements OnInit {

  monster!: Monster;
  constructor(private service: ChangeTextService) { }

  ngOnInit(): void {
    this.service.currentFight.subscribe(idFight=>{
      this.startFight(idFight);
      console.log(this.monster);
    });
  content : Element = document.getElementsByClassName('monsterFrame')[0];
  monster! : Monster;
  atk! : Element;
  heal! : Element;
  shoot! : Element;
  profiles! : Profile;
  constructor(private service:ChangeTextService) { }

  ngOnInit(this:any): void {
    this.service.getUserProfile(window.localStorage.getItem('userId')).subscribe((profiles:Profile) => {this.profiles = profiles ;console.log(this.profiles)});
    console.log('ici');
  }
  insertFight(): void{
    
    //Rècupérer le monstre

  }
  dealDamages(){

  }
  useHeal(){

  startFight(id: number) {
    if (id != 0) {
      this.service.getMonster(id)
        .subscribe(monster => {
          this.monster = monster;
        });
    }
  }
  useBullet(){

  }
  ngAfterViewInit(){
    this.atk = document.getElementsByClassName('atk')[0];
    this.heal = document.getElementsByClassName('useHeal')[0];
    this.shoot = document.getElementsByClassName('shoot')[0];
    this.atk.addEventListener('click',this.dealDamages);
    this.heal.addEventListener('click',this.useHeal);
    this.shoot.addEventListener('click',this.useBullet);
  }
}
