import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'cw-unlocked',
  templateUrl: './unlocked.component.html',
  styleUrls: ['./unlocked.component.scss']
})
export class UnlockedComponent implements OnInit {

  public unlock: boolean;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
    .pipe(
      first()
    )
    .subscribe(
      (params: Params): void => {
        this.unlock = params['unlock'] === 'true';
      }
    );
  }

}
