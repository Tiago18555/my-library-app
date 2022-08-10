import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storage: Storage;

  constructor() { 
    this.storage = window.localStorage;
  }

  set(key: string, value: any): boolean {
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  setString(key: string, value: string) : boolean {
    if (this.storage) {
      this.storage.setItem(key, value);
      return true;
    }
    return false;
  }

  get(key: string): JSON {
    if (this.storage) {
      return JSON.parse(this.storage.getItem(key) || '{}');
    }
    return {} as JSON;
  }

  getString(key: string): string {
    if (this.storage) {
      return this.storage.getItem(key) || '';
    }
    return '';
  }

  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }
}
