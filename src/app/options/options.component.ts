import { Component, OnInit } from '@angular/core';
import { Option } from '../option';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  options : Option[]=[];

  constructor() { }

  ngOnInit(): void {
  }

}
