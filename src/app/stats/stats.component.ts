import { Component, OnInit } from '@angular/core';

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
  echos! : number;

  constructor() { }

  

  ngOnInit(): void {
    this.initStats();
  }

  initStats(): void{
    this.pv=100;
    this.stamina=100;
    this.fioles=5;
    this.balles=5;
    this.echos=10;
  }
}
