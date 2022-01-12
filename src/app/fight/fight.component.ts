import { Component, OnInit } from '@angular/core';
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
  }

  startFight(id: number) {
    if (id != 0) {
      this.service.getMonster(id)
        .subscribe(monster => {
          this.monster = monster;
        });
    }
  }
}
