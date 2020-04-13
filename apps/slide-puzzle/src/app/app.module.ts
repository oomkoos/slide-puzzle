import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { BlockComponent } from './block/block.component';
import { MovesStore } from 'apps/slide-puzzle/src/app/stores/moves.store';
import { MovesPersistance } from 'apps/slide-puzzle/src/app/persistance/moves.persistance';

@NgModule({
  declarations: [AppComponent, BoardComponent, BlockComponent,],
  imports: [BrowserModule],
  providers: [MovesStore, MovesPersistance,],
  bootstrap: [AppComponent]
})
export class AppModule {}
