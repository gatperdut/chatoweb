import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemTemplate } from './models/item-template.model';

@Component({
  selector: 'cw-item-templates',
  templateUrl: './item-templates.component.html',
  styleUrls: ['./item-templates.component.scss']
})
export class ItemTemplatesComponent implements OnInit {

  public itemTemplates: ItemTemplate[];

  public readonly displayedColumns: String[] = ['code', 'short_desc', 'types'];

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.itemTemplates = this.activatedRoute.snapshot.data['itemTemplates'];
  }

}
