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
  choices!: Option[];
  ids!: string[];

  constructor(private changeText: ChangeTextService) { }

  ngOnInit(): void {
    this.getMainText("2");
  }


  continue(id: string): void {
    this.changeText.getOption(id)
      .subscribe(main => this.main_Text = main);

  }

  getMainText(id: string) {
    this.changeText.getOption(id)
      .subscribe((main) => {
        this.main_Text = main
        this.ids = main.options.split(',');
        console.log(this.ids);
        this.initOptions(this.ids);
      });
  }

  initOptions(idText: string[]): void {
    console.log("ALLO ?!");
    let i: number;
    for (i = 0; i < idText.length; i++) {
      console.log("t'es là mamène ?");
      this.changeText.getOption(idText[i])
        .subscribe((choice) => {
          this.choices[i] = choice;
          console.log(choice);
        });
    }

  }
}
