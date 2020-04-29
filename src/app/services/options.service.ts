import { Injectable } from '@angular/core';
import { Options } from '../model/options';
import { BehaviorSubject, Observable } from 'rxjs';
import { Validation } from '../model/validation';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  options: Options;
  private optionsObs = new BehaviorSubject<Options>(this.options);

  validation: Validation;
  private validationObs = new BehaviorSubject<Validation>(this.validation);

  constructor() {
    this.options = new Options(10, 0, 30, 0, 0);
    this.optionsObs.next(this.options);
    this.validation = new Validation();
    this.validationObs.next(this.validation);
  }

  getOptionsObs(): Observable<Options> {
    return this.optionsObs.asObservable();
  }

  getValidationObs(): Observable<Validation> {
    return this.validationObs.asObservable();
  }

  setNewOptions(form: Options) {
    this.options = form;
    this.optionsObs.next(this.options);
  }

  setValidation(form: Options) {
    this.validation.gameMinutesIsCorrect = this.isPropCorrect(form.gameMinutes, 0, 60);
    this.validation.gameSecondsIsCorrect = this.isPropCorrect(form.gameSeconds, 0, 60);
    this.validation.penaltySecondsIsCorrect = this.isPropCorrect(form.penaltySeconds, 0, 301);
    this.validation.additionSecondsIsCorrect = this.isPropCorrect(form.additionSeconds, -301, 301);
    this.validation.afterMovesIsCorrect = this.isPropCorrect(form.afterMoves, 0, 21);
    this.validation.allIsCorrect = this.isAllCorrect();
    this.validationObs.next(this.validation);
  }

  isPropCorrect(prop, min: number, max: number): boolean {
    return typeof prop === 'number' && Math.trunc(prop) === prop && prop >= min && prop < max;
  }

  isAllCorrect(): boolean {
    return this.validation.gameMinutesIsCorrect &&
    this.validation.gameSecondsIsCorrect &&
    this.validation.penaltySecondsIsCorrect &&
    this.validation.additionSecondsIsCorrect &&
    this.validation.afterMovesIsCorrect;
  }
}
