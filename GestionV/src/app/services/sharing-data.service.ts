import { EventEmitter, Injectable } from '@angular/core';

import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

 private _newUserEventEmitter:EventEmitter <User> =new EventEmitter()
 private _idUserEventEmitter = new EventEmitter()

 private _findUserByIdEventEmitter= new EventEmitter()

private _selectUserEvenEmitter= new EventEmitter()

  constructor() { }

  get newUserEventEmitter(){
    return this._newUserEventEmitter
  }

  get idUserEventEmitter(){

    return this._idUserEventEmitter
  }

  get findUserByIdEventEmitter(){

    return this._findUserByIdEventEmitter
  }

  get selectUserEvenEmitter(){

    return this._selectUserEvenEmitter
  }

}

