import { Injectable } from '@angular/core';

import { localStrorageItemInterface } from '../models/local-storage-item.model';

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor() {}

  putItem(item: localStrorageItemInterface) {
    localStorage.setItem(item.key, item.value);
  }

  getItem(key: string): string {
    return localStorage.getItem(key);
  }
}
