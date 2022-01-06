import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChangeTextService } from '../change-text.service';
import { Option } from '../option';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  options : Option[]=[];
@Output() sendId = new EventEmitter(); 

  constructor(private changeText:ChangeTextService) { }

  ngOnInit(): void {
  }

  continue(id:number):void{
    this.sendId.emit(id);
  }

}
