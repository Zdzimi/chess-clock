import { Injectable } from '@angular/core';
import { Player } from '../model/player';
import { BehaviorSubject, Observable } from 'rxjs';
import { OptionsService } from './options.service';
import { Options } from '../model/options';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  playerFirst: Player;
  playerSecond: Player;

  private playerFirstObs = new BehaviorSubject<Player>(this.playerFirst);
  private playerSecondObs = new BehaviorSubject<Player>(this.playerSecond);

  constructor(private optionsService: OptionsService) {
    this.optionsService.getOptionsObs().subscribe((optionObs: Options) => {
      this.playerFirst = new Player(optionObs.gameMinutes, optionObs.gameSeconds);
      this.playerFirstObs.next(this.playerFirst);
      this.playerSecond = new Player(optionObs.gameMinutes, optionObs.gameSeconds);
      this.playerSecondObs.next(this.playerSecond);
    });
  }

  getPlayerFirstObs(): Observable<Player> {
    return this.playerFirstObs.asObservable();
  }

  getPlayerSecondObs(): Observable<Player> {
    return this.playerSecondObs.asObservable();
  }

  playerKnocked(playerStop: Player, playerStart: Player) {
    if (playerStop.isMooving) {
      playerStop.moveCounter++;
      this.additionTime(playerStop);
    } else if (playerStop.isMyMoove) {
      if (playerStop.moveCounter === 0) {
        playerStop.moveCounter++;
        this.additionTime(playerStop);
      } else {
        playerStart.moveCounter--;
      }
    }
    playerStop.isMyMoove = false;
    playerStart.isMyMoove = true;
    playerStop.disabledButton = true;
    playerStart.disabledButton = false;
    playerStop.isMooving = false;
    playerStart.isMooving = true;
    this.start(playerStart);
  }

  start(player: Player) {
    if (player.isMooving) {
      if (player.seconds !== 0) {
        player.seconds --;
      } else if (player.minutes !== 0) {
        player.minutes --;
        player.seconds = 59;
      }
      setTimeout(() => {
        this.start(player);
      }, 1000);
    }
  }

  pause() {
    this.playerFirst.isMooving = false;
    this.playerSecond.isMooving = false;
  }

  addSeconds(player: Player, secondsToAdd: number) {
    player.seconds = player.seconds + secondsToAdd;
    while (player.seconds > 59 || player.seconds < 0) {
      if (player.seconds < 0) {
        player.seconds = player.seconds + 60;
        player.minutes--;
      } else {
        player.minutes++;
        player.seconds = player.seconds - 60;
      }
    }
    if (player.minutes < 0) {
      player.minutes = 0;
      player.seconds = 0;
    }
  }

  additionTime(player: Player) {
    const options = this.optionsService.options;
    if (player.moveCounter >= options.afterMoves) {
      this.addSeconds(player, options.additionSeconds);
    }
  }

  subtractSeconds(player: Player, penaltySeconds: number) {
    if ((player.minutes * 60 + player.seconds) > penaltySeconds * 2){
      player.seconds = player.seconds - penaltySeconds;
      while (player.seconds < 0) {
        player.seconds = player.seconds + 60;
        player.minutes--;
      }
    }
  }

  disablePlayersButtons() {
    this.playerFirst.disabledButton = true;
    this.playerSecond.disabledButton = true;
  }

  enablePlayersButtons() {
    this.playerFirst.disabledButton = false;
    this.playerSecond.disabledButton = false;
  }

}
