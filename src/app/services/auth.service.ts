import { User } from "firebase/auth";
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User | undefined;
  private _authState$ = new BehaviorSubject<boolean | undefined>(undefined);

  constructor(
  ) { }

  get authState$(): Observable<boolean> {
    return this._authState$.pipe(filter((state) => state !== undefined && state !== null)) as BehaviorSubject<boolean>;
  }
  
}