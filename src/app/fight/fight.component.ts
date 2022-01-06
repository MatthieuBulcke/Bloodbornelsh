import { Component, OnInit } from '@angular/core';
import { Monster } from '../monster';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.css']
})
export class FightComponent implements OnInit {

  monster! : Monster;
  constructor() { }

  ngOnInit(): void {
  }

}
