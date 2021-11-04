import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  putItem(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  getItem(key: string): string {
    return sessionStorage.getItem(key);
  }

  removeItem(key: string) {
    sessionStorage.removeItem(key);
  }

  clearStorage(): void {
    sessionStorage.clear();
  }
}
