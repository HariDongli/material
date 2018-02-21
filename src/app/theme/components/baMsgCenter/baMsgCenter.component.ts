import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { BaMsgCenterService } from './baMsgCenter.service';

@Component({
  selector: 'ba-msg-center',
  styleUrls: ['./baMsgCenter.scss'],
  templateUrl: './baMsgCenter.html',
  providers: [BaMsgCenterService],
})
export class BaMsgCenter {

  notifications: Array<Object>;
  languages: Array<{ image: string, name: string, key: string }>;

  constructor(
    private _baMsgCenterService: BaMsgCenterService,
    private translateService: TranslateService
  ) {
    this.notifications = this._baMsgCenterService.getNotifications();
    this.languages = [
      {
        image: 'assets/flags/fr.png',
        name: 'french',
        key: 'fr'
      },
      {
        image: 'assets/flags/us.png',
        name: 'english',
        key: 'en'
      }
    ];
  }

  changeLanguage(language: string): void {
    this.translateService.use(language);
  }
}
