import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatTooltip } from '@angular/material/tooltip';
import * as _ from 'underscore';

@Component({
  selector: 'cw-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {

  @ViewChild('tooltip') private tooltip: MatTooltip;

  public errorsArray: String[];

  public copying: boolean = false;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { message: string, errors: { [key: string]: string }}
  ) {

  }
  ngOnInit(): void {
    this.errorsArray = _.map(
      _.keys(this.data.errors),
      (key: string): string => {
        return `${key}: ${this.data.errors[key]}`
      }
    );
  }

  public toggleCopying(): void {
    this.copying = true;
    setTimeout(
      (): void => {
        this.tooltip.show();
      },
      0
    );
    setTimeout(
      (): void => {
        this.copying = false;
      },
      1500
    );
  }

  public copy(): string {
    return this.errorsArray.join('\n');
  }

  public close(): void {

  }

}
