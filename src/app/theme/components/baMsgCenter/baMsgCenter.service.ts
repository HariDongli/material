import {Injectable} from '@angular/core'

@Injectable()
export class BaMsgCenterService {

  private _notifications = [
    {
      name: 'New feed',
      text: 'A new feed has been added.',
      time: '10 min ago'
    },
  ];

  public getNotifications(): Array<Object> {
    return this._notifications;
  }
}
