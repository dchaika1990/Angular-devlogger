import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class AlertService {

  private alertSource = new BehaviorSubject<String>(null);
  alertText = this.alertSource.asObservable();

  constructor() { }

  setAlertText(text: string){
    this.alertSource.next(text);
  }

  clearStateAlert() {
    this.alertSource.next(null);

  }

}
