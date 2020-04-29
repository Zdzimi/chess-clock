export class Validation {

  gameMinutesIsCorrect: boolean;
  gameSecondsIsCorrect: boolean;
  penaltySecondsIsCorrect: boolean;
  additionSecondsIsCorrect: boolean;
  afterMovesIsCorrect: boolean;
  allIsCorrect: boolean;

  constructor() {
    this.gameMinutesIsCorrect = true;
    this.gameSecondsIsCorrect = true;
    this.penaltySecondsIsCorrect = true;
    this.additionSecondsIsCorrect = true;
    this.afterMovesIsCorrect = true;
    this.allIsCorrect = true;
  }
}
