import { Component, OnInit } from '@angular/core';
import { ChangeTextService } from '../change-text.service';
import { Profile } from '../model/profile.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  profile!: Profile;
  pv!: string;
  stamina!: string;
  fioles!: number;
  balles!: number;
  echos!: number;
  dmg_type!: number;
  dmgString!: string;
  atk!: number;
  time!: number;


  constructor(private changeText: ChangeTextService) { }



  ngOnInit(): void {
    this.dmgTypeToText(1);
    this.changeText.currentDmgType
      .subscribe((dmg) => {
        this.dmg_type = dmg;
        this.dmgString = this.dmgTypeToText(dmg);
      });
    this.changeText.currentTime
      .subscribe(time => {
        this.time = time;
      });
    this.changeText.currentVial
      .subscribe(fioles => this.fioles = fioles);
    this.changeText.currentPv
      .subscribe(pv => this.pv = pv.toString());
    this.changeText.currentBullets
    .subscribe(bul => this.balles=bul);

    this.changeText.currentAtk.subscribe(atk => this.atk = atk);
    this.changeText.getUserProfile().subscribe((profiles: Profile) => { this.profile = profiles; console.log(this.profile); this.initStats(); });
  }

  initStats(): void {
    this.pv = (this.profile.life).split('/')[0];
    this.stamina = (this.profile.stamina).split('/')[0];
    this.fioles = this.profile.potions;
    this.balles = this.profile.bullets;
    this.echos = this.profile.echos;
  }

  dmgTypeToText(dmg: number): string {
    if (dmg == 1) {
      return "Tranchant";
    }
    else if (dmg == 2) {
      return "Contondant";
    }
    else if (dmg == 3) {
      return "Magique";
    }
    else if (dmg == 11) {
      return "Tranchant + Feu";
    }
    else if (dmg == 12) {
      return "Tranchant + Electricité";
    }

    else if (dmg == 21) {
      return "Contondant + Feu";
    }

    else if (dmg == 22) {
      return "Contondant + Electricité";
    }
    //Need more content
    return "OH LES DEGATS";
  }
}
