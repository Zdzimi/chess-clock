export class Options {

  gameMinutes: number;
  gameSeconds: number;
  penaltySeconds: number;
  additionSeconds: number;
  afterMoves: number;

  constructor(minutes: number, seconds: number, penalty: number, add: number, after: number) {
    this.gameMinutes = minutes;
    this.gameSeconds = seconds;
    this.penaltySeconds = penalty;
    this.additionSeconds = add;
    this.afterMoves = after;
  }
}
