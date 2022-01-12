import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangeTextService } from '../change-text.service';
import { OptionsComponent } from '../options/options.component';
import { Option } from '../option';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  option!: Option;
  id!: string;
  backUrl! : string;
  constructor(private changeText: ChangeTextService) { }

  ngOnInit(): void {
    this.changeText.currentId
      .subscribe(mainId => {
        this.getOption(mainId);
      });
    this.changeText.currentZone.subscribe(zone => {
      this.backUrl=this.changeBack(zone);
    });
  }

  getOption(id: string): void {
    this.changeText.getOption(id)
      .subscribe((story) => this.option = story);
  }

  /***** Fonction qui permet de changer le background image selon la zone  *****/
  changeBack(zone: string) {
    if (zone == "Place de Yarnham") {
      return "../../assets/img/Outback-1.png";
    }
    else if (zone == "Egout") {
      return "../../assets/img/Egouts.jpeg";

    }
    else if (zone == "Faubourg de la cathédrale") {
      return "../../assets/img/Faubourg.jpeg";
    }
    else{
     return "../../assets/img/Outback-1.png";
    }
  }
}