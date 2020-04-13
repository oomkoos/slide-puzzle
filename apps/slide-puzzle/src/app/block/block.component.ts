import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Block } from 'apps/slide-puzzle/src/app/block/block';

@Component({
  selector: 'slide-puzzle-jest-cypress-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent {

  @Input()
  public state: Block;

  @Output()
  public moveMe: EventEmitter<Block>;

  constructor() {
    this.moveMe = new EventEmitter<Block>();
  }

  move(state: Block) {
    this.moveMe.emit(state);
  }
}
