import { Component, OnInit } from '@angular/core';
import { Weapon } from '../weapon';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  weapons!: Weapon[];
  constructor() { }

  ngOnInit(): void {
  }
  initShop(){

  }
}
