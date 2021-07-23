import { Injectable } from '@angular/core';

import { storageInterface } from '../models/local-storage-item.model';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  putItem(item: storageInterface) {
    sessionStorage.setItem(item.key, item.value);
  }

  getItem(key: string): string {
    return sessionStorage.getItem(key);
  }
}
