import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _newUserEventEmitter: EventEmitter<User> = new EventEmitter();
  private _idUserEventEmitter = new EventEmitter<number>();
  private _findUserByIdEventEmitter = new EventEmitter<number>();
  private _selectUserEvenEmitter: EventEmitter<User> = new EventEmitter();

  private _PageUserEventEmitter = new EventEmitter()

  constructor() { }

  get newUserEventEmitter() {
    return this._newUserEventEmitter;
  }

  get idUserEventEmitter() {
    return this._idUserEventEmitter;
  }

  get findUserByIdEventEmitter() {
    return this._findUserByIdEventEmitter;
  }

  get selectUserEvenEmitter() {
    return this._selectUserEvenEmitter;
  }

  get PageUserEventEmitter(){

    return this._PageUserEventEmitter
  }
}
