import { Component, OnInit } from '@angular/core';
import { ChangeTextService } from '../change-text.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  pv!: number;
  stamina!: number;
  fioles!: number;
  balles!: number;
  echos!: number;
  dmg_type!: number;
  dmgString!: string;
  atk!: number;


  constructor(private changeText: ChangeTextService) { }



  ngOnInit(): void {
    this.initStats();
    this.dmgTypeToText(1);
    this.changeText.currentDmgType
      .subscribe((dmg) => {
        this.dmg_type = dmg;
        this.dmgString= this.dmgTypeToText(dmg);
      });
      

    this.changeText.currentAtk.subscribe(atk => this.atk = atk);
  }

  initStats(): void {
    this.pv = 100;
    this.stamina = 100;
    this.fioles = 5;
    this.balles = 5;
    this.echos = 10;
  }

  dmgTypeToText(dmg: number) : string {
    if (dmg == 1) {
      return "Tranchant";
    }
    else if (dmg == 2) {
      return "Contondant";
    }
    else if (dmg==3){
      return "Magique";
    }
    else if (dmg==11){
      return "Tranchant + Feu";
    }
    else if (dmg == 12){
      return "Tranchant + Electricité";
    }

    else if (dmg ==21){
      return "Contondant + Feu";
    }

    else if (dmg == 22){
      return "Contondant + Electricité";
    }
    //Need more content
    return "OH LES DEGATS";
  }
}
