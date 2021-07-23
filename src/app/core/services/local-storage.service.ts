import { Injectable } from '@angular/core';

import { storageInterface } from '../models/local-storage-item.model';

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor() { }

  putItem(item: storageInterface) {
    localStorage.setItem(item.key, item.value);
  }

  getItem(key: string): string {
    return localStorage.getItem(key);
  }
}
