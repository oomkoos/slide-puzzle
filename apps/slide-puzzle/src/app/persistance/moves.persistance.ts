import { Injectable } from '@angular/core';
import { isEmpty } from 'lodash';

const MOVES = '_storage.moves';

@Injectable()
export class MovesPersistance {

  public store(moves: number[]): void {
    sessionStorage.setItem(
      MOVES,
      JSON.stringify(moves),
    );
  }

  public retrieve(): number[] {
    try {
      if (isEmpty(sessionStorage.getItem(MOVES))) {return new Array<number>();}

      return JSON.parse(sessionStorage.getItem(MOVES));
    } catch (error) {
      // TODO add logger
      console.log('Error retrieving Moves from session storage');
    }
  }
}
