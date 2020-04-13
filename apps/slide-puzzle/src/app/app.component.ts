import { Component, OnInit } from '@angular/core';
import { MovesStore } from 'apps/slide-puzzle/src/app/stores/moves.store';
import { MovesPersistance } from 'apps/slide-puzzle/src/app/persistance/moves.persistance';

@Component({
  selector: 'slide-puzzle-jest-cypress-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'slide-puzzle';

  constructor(
    private movesStore: MovesStore,
    private movesPersistance: MovesPersistance,
  ) {}

  ngOnInit(): void {
    this.movesStore.setMoves(this.movesPersistance.retrieve());
  }
}
