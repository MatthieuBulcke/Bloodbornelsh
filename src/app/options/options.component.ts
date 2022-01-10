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
  choice1!: Option;
  choice2!: Option;
  choice3!: Option;
  choice4!: Option;
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
        this.initOptions(this.ids);
      });
  }

  initOptions(idText: string[]): void {
    console.log("ALLO ?!");
    let i: number;
    if (idText[0]) {
      console.log("t'es là mamène ?");
      this.changeText.getOption(idText[0])
        .subscribe((choice) => {
          console.log(choice);
          this.choice1 = choice;
        });
      }
      if (idText[1]) {
        console.log("t'es là mamène ?");
        this.changeText.getOption(idText[1])
          .subscribe((choice) => {
            console.log(choice);
            this.choice2 = choice;
          });
        }
        if (idText[2]) {
          console.log("t'es là mamène ?");
          this.changeText.getOption(idText[2])
            .subscribe((choice) => {
              console.log(choice);
              this.choice3 = choice;
            });
          }
          if (idText[3]) {
            console.log("t'es là mamène ?");
            this.changeText.getOption(idText[3])
              .subscribe((choice) => {
                console.log(choice);
                this.choice3 = choice;
              });
          }

    }
  }
