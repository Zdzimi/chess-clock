import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { PlayerService } from '../services/player.service';
import { Options } from '../model/options';
import { OptionsService } from '../services/options.service';
import { Validation } from '../model/validation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  areOptionsVisible = false;
  paused = false;
  options: Options;
  optionsForm;
  validation: Validation;

  constructor(private optionsService: OptionsService, private playerService: PlayerService, private formBuilder: FormBuilder) {
    this.optionsService.getOptionsObs().subscribe((optionsObs: Options) => {
      this.options = optionsObs;
    });
    this.optionsForm = this.formBuilder.group(this.options);
    this.optionsService.getValidationObs().subscribe((validationObs: Validation) => {
      this.validation = validationObs;
    });
  }

  ngOnInit(): void { }

  pause() {
    this.paused = true;
    this.playerService.disablePlayersButtons();
    this.playerService.pause();
  }

  optionsButton() {
    this.areOptionsVisible = true;
    this.playerService.disablePlayersButtons();
    this.playerService.pause();
  }

  onSubmit(form: Options) {
    this.optionsService.setValidation(form);
    if (this.validation.allIsCorrect) {
      this.optionsService.setNewOptions(form);
      this.areOptionsVisible = false;
    }
  }

  cancel() {
    this.areOptionsVisible = false;
    this.playerService.enablePlayersButtons();
  }

  addPlayerFirst() {
    this.playerService.addSeconds(this.playerService.playerFirst, this.options.penaltySeconds);
  }

  addPlayerSecond() {
    this.playerService.addSeconds(this.playerService.playerSecond, this.options.penaltySeconds);
  }

  subtractPlayerFirst() {
    this.playerService.subtractSeconds(this.playerService.playerFirst, this.options.penaltySeconds);
  }

  subtractPlayerSecond() {
    this.playerService.subtractSeconds(this.playerService.playerSecond, this.options.penaltySeconds);
  }

  resume() {
    this.paused = false;
    this.playerService.enablePlayersButtons();
  }

  restart() {
    this.paused = false;
    this.optionsService.setNewOptions(this.options);
  }

}
