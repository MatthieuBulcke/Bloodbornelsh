import { Component, OnInit } from '@angular/core';
import { Weapon } from '../weapon';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent implements OnInit {

  weapons : Weapon[]=[];
  constructor() { }

  ngOnInit(): void {
  }

}
