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
  choice1!: Option |null;
  choice2!: Option|null;
  choice3!: Option|null;
  choice4!: Option|null;
  ids!: string[];

  constructor(private changeText: ChangeTextService) { }

  ngOnInit(): void {
    this.getMainText("2");
  }


  continue(id: string): void {
    this.choice1=null;
    this.choice2=null;
    this.choice3=null;
    this.choice4=null;

    this.changeText.changeId(id);
    this.getMainText(id);
  }

  getMainText(id: string) {
    this.changeText.getOption(id)
      .subscribe((main) => {
        this.main_Text = main
        this.ids = main.options.split(',');
        this.initOptions(this.ids);
        this.changeText.changeMainGlobalInfos(main);
      });
  }

  initOptions(idText: string[]): void {
    let i: number;
    if (idText[0]) {
      this.changeText.getOption(idText[0])
        .subscribe((choice) => {
          this.choice1 = choice;
        });
      }
      if (idText[1]) {
        this.changeText.getOption(idText[1])
          .subscribe((choice) => {
            this.choice2 = choice;
          });
        }
        if (idText[2]) {
          this.changeText.getOption(idText[2])
            .subscribe((choice) => {
              this.choice3 = choice;
            });
          }
          if (idText[3]) {
            this.changeText.getOption(idText[3])
              .subscribe((choice) => {
                this.choice3 = choice;
              });
          }

    }
  }
