import { Injectable } from '@angular/core';

import { NavigationStart, Router } from '@angular/router';
import {CoreService} from "../core/core.service";

@Injectable()
export class DataService {
  message = '';
  messageType = 'danger';

  user: any;

  constructor(private router: Router, private rest: CoreService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.message = '';
      }
    });
  }

  error(message) {
    this.messageType = 'danger';
    this.message = message;
  }

  success(message) {
    this.messageType = 'success';
    this.message = message;
  }

  warning(message) {
    this.messageType = 'warning';
    this.message = message;
  }
}
