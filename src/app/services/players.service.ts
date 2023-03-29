import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, doc, getDoc, limit, query, where } from 'firebase/firestore';
import { map, Observable } from 'rxjs';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(
    private firestore: Firestore
  ) { }

  getPlayers() {
    const playersRef = collection(this.firestore, 'players3');
    return collectionData(
      query(playersRef, limit(100))
    ) as Observable<any[]>
  }

  getPlayerById(inputId: string) {
    const playersRef = collection(this.firestore, 'players3');
    return collectionData(
      query(playersRef, where('playerId', '==', inputId))
    ) as Observable<any>
  }

  addPlayer(player: Player) {
    const playersRef = collection(this.firestore, 'players3');
    return addDoc(playersRef, player);
  }

}
