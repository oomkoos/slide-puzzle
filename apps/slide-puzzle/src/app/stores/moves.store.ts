import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isEmpty } from 'lodash';
import { MovesPersistance } from 'apps/slide-puzzle/src/app/persistance/moves.persistance';

@Injectable()
export class MovesStore {
  private subject: BehaviorSubject<number[]>;
  private moves: number[];

  constructor(
    private movesPersistance: MovesPersistance,
  ) {
    this.moves = [];
    this.subject = new BehaviorSubject(this.moves);
  }

  public addMoves(moves: number) {
    if (!moves) { return; }

    this.moves.push(moves);
    this.removeDuplicates();
    this.movesPersistance.store(this.moves);
    this.emit();
  }

  public setMoves(moves: number[]) {
    if (!isEmpty(moves)) { return; }
    this.moves = moves;
    this.removeDuplicates();
    this.emit();
  }

  private removeDuplicates() {
    if (isEmpty(this.moves)) { return; }

    const nonDuplicates = new Set<number>();
    this.moves.forEach(value => nonDuplicates.add(value));
    this.moves = [];
    nonDuplicates.forEach(value => this.moves.push(value));
  }

  private emit(): void {
    this.subject.next(this.moves);
  }

  public subscribe(
    // Define the unsubscribe subject you expect (void)
    unsubscribeSubject: Subject<void>,
    // Define the type of callback you expect, and enforce the type of value it should receive
    onChange: (moves: number[]) => void
  ): void {
    this.subject
      .pipe(takeUntil(unsubscribeSubject))
      .subscribe(onChange);
  }
}
