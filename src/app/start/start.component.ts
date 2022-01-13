import { Component, OnInit } from '@angular/core';
import { ChangeTextService } from '../change-text.service';
import { Option } from '../option';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  start:boolean = false;

  constructor(private service: ChangeTextService) { }

  ngOnInit(): void {
    this.service.currentId
      .subscribe(id => {
    this.startGame(id);
      });
  }

  startGame(id :string ){
    if(id=="2"){
      this.start=true;
    }
    else{
      this.start=false;
    }
  }

  selectWeapon(id : number){
    this.service.addWeaponToIventory(id);
    this.start=false;
  }
}
