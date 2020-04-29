import { Component } from '@angular/core';
import { Player } from './model/player';
import { PlayerService } from './services/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  playerFirst: Player;
  playerSecond: Player;

  constructor(private playerService: PlayerService) {
    this.playerService.getPlayerFirstObs().subscribe((playerObsFirst: Player) => {
      this.playerFirst = playerObsFirst;
    });
    this.playerService.getPlayerSecondObs().subscribe((playerObsSecond: Player) => {
      this.playerSecond = playerObsSecond;
    });
  }

  clicked(player: Player) {
    if (player === this.playerFirst) {
      this.playerService.playerKnocked(player, this.playerSecond);
    } else {
      this.playerService.playerKnocked(player, this.playerFirst);
    }
  }
}
