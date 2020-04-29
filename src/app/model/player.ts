export class Player {

  minutes: number;
  seconds: number;
  isMooving: boolean;
  disabledButton: boolean;
  moveCounter: number;
  isMyMoove: boolean;

  constructor(minutes: number, seconds: number) {
    this.minutes = minutes;
    this.seconds = seconds;
    this.isMooving = false;
    this.disabledButton = false;
    this.moveCounter = 0;
    this.isMyMoove = true;
  }
}
