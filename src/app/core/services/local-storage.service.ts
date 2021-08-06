import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor() { }

  putItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getItem(key: string): string {
    return localStorage.getItem(key);
  }
}
