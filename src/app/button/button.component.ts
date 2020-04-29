import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from '../model/player';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent{

  @Input()
  player: Player;

  @Output()
  eventPlayer = new EventEmitter<Player>();

  pressButton() {
    this.eventPlayer.emit(this.player);
  }

}
