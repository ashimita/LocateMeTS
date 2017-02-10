import { Injectable, EventEmitter, Output, Input } from '@angular/core';
import { User } from './user';

@Injectable()
export class UserService {


  public user: User;

  public userChangeEvent: EventEmitter<User> = new EventEmitter();
  constructor(){}


  getUserChangeEmitter() {
    return this.userChangeEvent;
  }

  setUser(user: User) {
    this.user = user;
    console.log('setting user', user);
    this.userChangeEvent.emit(user);
  }

}
