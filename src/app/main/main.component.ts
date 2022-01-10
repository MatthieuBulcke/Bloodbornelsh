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

  option! : Option;
  id! : string;
  constructor(private changeText:ChangeTextService) { }

  ngOnInit(): void {
    this.changeText.currentId
      .subscribe(mainId =>{ 
        this.id = mainId;
        this.changeText.getOption(mainId);
    });
  }

  // getOption(id:string): void{
  //   this.changeText.getOption(id)
  //     .subscribe((story) => this.option=story);
  
  // }
}
