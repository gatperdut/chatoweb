import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ItemTemplateFormComponent } from './item-template-form/item-template-form.component';
import { ItemTemplateData } from './models/item-template.data';
import { ItemTemplate } from './models/item-template.model';
import { MeleeStatTemplateData } from './models/melee-stat-template.data';
import { WeaponStatTemplateData } from './models/weapon_stat_template.data';
import { ItemTemplateActionsService } from './services/item-template-actions.service';
import { ItemTemplateService } from './services/item-template.service';
import { MeleeStatTemplateService } from './services/melee-stat-template.service';
import { WeaponStatTemplateService } from './services/weapon-stat-template.service';

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
    private matDialog: MatDialog,
    private itemTemplateService: ItemTemplateService,
    private weaponStatTemplateService: WeaponStatTemplateService,
    private meleeStatTemplateService: MeleeStatTemplateService,
    private itemTemplateActionsService: ItemTemplateActionsService
  ) {

  }

  ngOnInit(): void {
    this.itemTemplates = this.activatedRoute.snapshot.data['itemTemplates'];
  }

  public createMeleeWeapon(): void {
    const itemTemplateData: ItemTemplateData = this.itemTemplateService.emptyItemTemplate();
    const weaponStatTemplateData: WeaponStatTemplateData = this.weaponStatTemplateService.emptyWeaponStatTemplate();
    const meleeStatTemplateData: MeleeStatTemplateData = this.meleeStatTemplateService.emptyMeleeStatTemplate();

    weaponStatTemplateData.melee_stat_template = meleeStatTemplateData;
    itemTemplateData.weapon_stat_template = weaponStatTemplateData;

    this.matDialog.open(ItemTemplateFormComponent, { width: '500px', data: { itemTemplateData: itemTemplateData } })
    .afterClosed()
    .subscribe(
      (itemTemplateData: ItemTemplateData) => {
        if (!itemTemplateData) {
          return;
        }

        this.itemTemplateActionsService.update(itemTemplateData).subscribe();
      }
    );
  }

  public createRangedWeapon(): void {

  }

}
