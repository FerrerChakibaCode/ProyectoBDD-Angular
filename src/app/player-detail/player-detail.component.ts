import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, of, Subject, switchMap, takeUntil } from 'rxjs';
import { Player } from '../models/player';
import { PlayersService } from '../services/players.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit, OnDestroy {
  playerId: string = '';
  player: Player = {} as Player;
  private subscriptionDestroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private route: ActivatedRoute,
    private playersService: PlayersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getInfoPlayer();
    console.log(this.player);
  }

  ngOnDestroy(): void {
    this.subscriptionDestroy$.next(true);
  }

  getInfoPlayer() {
    this.route.params.pipe(
      takeUntil(this.subscriptionDestroy$),
      switchMap(async (param) => {
        if (param && param['playerId']) {
          this.playerId = param['playerId'];
          if (this.playerId) {
            const p = await firstValueFrom(this.playersService.getPlayerById(this.playerId));
            this.player = p[0] as Player;
          }
        }
        return of(null);
      })
    ).subscribe();
  }

  goBack() {
    try {
      this.router.navigate([`/main/`]);
    } catch (error) {
      console.log(error);
    }
  }
}
