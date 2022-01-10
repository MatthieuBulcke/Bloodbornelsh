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
  options! : Option[];
  constructor(private changeText:ChangeTextService) { }

  ngOnInit(): void {
    // this.getOption(0);
  }

  // getOption(id:number): void{
  //   this.changeText.getOption(id)
  //     .subscribe((option) => this.option=option);
  
  // }
}
