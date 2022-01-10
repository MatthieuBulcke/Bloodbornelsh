import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChangeTextService } from '../change-text.service';
import { Option } from '../option';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  main_Text!: Option;
  choices! : Option[]; 

  constructor(private changeText:ChangeTextService) { }

  ngOnInit(): void {
    this.initOptions("2");
    
  }


  continue(id:string):void{
    this.changeText.getOption(id)
      .subscribe(main => this.main_Text = main);
    this.changeText.getOptions(this.main_Text)
      .subscribe( options => this.choices=options);

  }

  getMainText(idText:string){
    console.log("ça marche au moins ?!");
  }

  initOptions(idText:string):void{
    console.log("ALLO ?!");
    this.changeText.getOption(idText)
      .subscribe(main => this.main_Text= main);
    console.log("sortie une");
    this.changeText.getOptions(this.main_Text)
      .subscribe( options => this.choices=options); 
    console.log("sortie");
  }
}
