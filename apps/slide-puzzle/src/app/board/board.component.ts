import { Component, OnInit } from '@angular/core';
import { find, forEach, head, isEmpty, isEqual, size, sortBy } from 'lodash';
import { Subject } from 'rxjs';

import { Block } from 'apps/slide-puzzle/src/app/block/block';
import { MovesStore } from 'apps/slide-puzzle/src/app/stores/moves.store';

@Component({
  selector: 'slide-puzzle-jest-cypress-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  public rows: number;
  public columns: number;
  public imageSrc: string;
  public boardState: Block[][];
  public blankBlock: Block;
  public movesCounter: number;
  public successPositionCounter: number;
  public isGameActive: boolean;
  public movesTopScore: number;
  public movesTopScores: number[];

  private totalBlocks: number;
  private destroyed: Subject<void>;

  constructor(
    private movesStore: MovesStore,
  ) {
    this.movesCounter = 0;
    this.successPositionCounter = 0;
    this.rows = 0;
    this.columns = 0;
    this.isGameActive = false;

    this.destroyed = new Subject<void>();
  }

  ngOnInit(): void {
    // TODO
    //  @Input for rows, columns and the image src or
    //  use store and capture on separate page
    //  and make use of a router
    this.rows = 4;
    this.columns = 4;
    this.imageSrc = 'assets/images/digi.png';

    this.totalBlocks = ((this.rows * this.columns));

    this.generateBoard();

    this.movesStore.subscribe(
      this.destroyed,
      (moves: number[]) => {
        this.movesTopScores = moves;
        if (!isEmpty(this.movesTopScores)) {
          this.movesTopScores = sortBy(this.movesTopScores);
          this.movesTopScore = head(this.movesTopScores);
        }
      }
    )
  }

  public moveBlock(block: Block): void {
    const movementIncrement = (
      Math.abs(block.coordinates[1] - this.blankBlock.coordinates[1])
      + Math.abs(block.coordinates[0] - this.blankBlock.coordinates[0])
    );

    if (movementIncrement === 1) {
      this.swapBlock(block, this.blankBlock, true);

      if (this.successPositionCounter === 0) {
        this.isGameActive = false;
        // populate game history store
        this.movesStore.addMoves(this.movesCounter);
      }
    }
  }

  private swapBlock(block: Block, otherBlock: Block, shouldCountMoves: boolean = false): void {
    // mutate the state
    this.boardState[otherBlock.coordinates[0]][otherBlock.coordinates[1]] = block;
    this.boardState[block.coordinates[0]][block.coordinates[1]] = otherBlock;
    // swap the coordinates
    const swapper = block.coordinates;
    block.coordinates = otherBlock.coordinates;
    otherBlock.coordinates = swapper;

    // name used in spec file as selector
    block.name = `theName_${block.coordinates[0]}_${block.coordinates[1]}`;
    otherBlock.name = `theName_${otherBlock.coordinates[0]}_${otherBlock.coordinates[1]}`;

    if (shouldCountMoves) {this.movesCounter++;}

    if (isEqual(block.coordinates, block.successCoordinates)) {
      block.success = true;
      this.successPositionCounter++;
    } else {
      if (block.success === true) {
        block.success = false;
        this.successPositionCounter--;
      }
    }
  }

  public async shuffle(): Promise<void> {
    const randomNumbers = new Set<number>();
    while (size(randomNumbers) < this.totalBlocks) {
      randomNumbers.add(Math.floor(Math.random() * this.totalBlocks) + 1);
    }
    const randomValues = randomNumbers.values();

    const randomState: Block[][] = [...Array(this.rows).keys()].map(row => {
      return [...Array(this.columns).keys()].map(column => {
        return {
          id: randomValues.next().value,
          name: 'not-used',
          coordinates: [row, column],
          successCoordinates: [row, column],
          style: '',
          success: true,
        };
      });
    });

    const flatRandomState: Block[] = [];
    forEach(randomState, row => {
      forEach(row, block => {
        flatRandomState.push(block);
      })
    });

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        // use the block id to find some new coordinates to shuffle to
        const randomBlock: Block = find(flatRandomState, b => isEqual(b.id, this.boardState[i][j].id));
        this.swapBlock(this.boardState[i][j], this.boardState[randomBlock.coordinates[0]][randomBlock.coordinates[1]]);
        await this.delay(140);
      }
    }

    this.isGameActive = true;
  }

  // TECH-DEBT move to Util to keep DRY
  private delay(milliseconds: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  };

  private generateBoard() {
    const image = new Image(500, 500);
    const width = image.width / this.columns,
      height = image.height / this.rows;

    let blockCounter = 0;
    this.boardState = [...Array(this.rows).keys()].map(row => {
      return [...Array(this.columns).keys()].map(column => {
        const isBlankBlock = row === (this.rows - 1) && column === (this.columns - 1);
        const style = {
          width: `100%`,
          height: `${height}px`,
          background: (
            isBlankBlock ?
            'black' :
            `url(${this.imageSrc}) no-repeat -${column * width}px -${row * height}px`
          ),
        };
        blockCounter++;
        return {
          id: blockCounter,
          name: `theName_${row}_${column}`,
          coordinates: [row, column],
          successCoordinates: [row, column],
          success: true,
          style,
        };
      });
    });
    this.blankBlock = this.boardState[this.rows - 1][this.columns - 1];
  }
}
