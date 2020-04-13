import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { split } from 'lodash';

import { BoardComponent } from './board.component';
import { MovesStore } from 'apps/slide-puzzle/src/app/stores/moves.store';
import { BlockComponent } from 'apps/slide-puzzle/src/app/block/block.component';
import { MovesPersistance } from 'apps/slide-puzzle/src/app/persistance/moves.persistance';
import { byAutomationId } from 'apps/slide-puzzle/src/app/unit-test.utils';

describe('[BoardComponent]', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let privateAccessComponent: any;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoardComponent, BlockComponent],
      providers: [MovesStore, MovesPersistance,],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    privateAccessComponent = (component as any);
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initialisation properties and subscriptions', () => {
    const movesStore = TestBed.get(MovesStore);
    spyOn(movesStore, 'subscribe');
    spyOn(privateAccessComponent, 'generateBoard');

    component.ngOnInit();

    expect(movesStore.subscribe)
      .toBeCalled();
    expect(component.rows)
      .toBeGreaterThan(0);
    expect(component.columns)
      .toBeGreaterThan(0);
    expect(component.imageSrc)
      .toBeDefined();
    expect((component as any).generateBoard)
      .toBeCalled();
  });

  it('should call shuffle on new button click', () => {
    spyOn(component, 'shuffle');
    (compiled.querySelector(byAutomationId('newButton')) as HTMLButtonElement).click();
    expect(component.shuffle)
      .toBeCalled();
  });

  it('should create a board on new button click and be able to move blocks', (done) => {
    fixture.autoDetectChanges(true);

    expect(compiled.querySelector(byAutomationId('newButton')).textContent)
      .toContain('New');
    // overlay should cover the board
    expect(compiled.querySelector('.overlay').attributes)
      .toBeDefined();
    expect(compiled.querySelector(byAutomationId('movesCounter')))
      .toBeNull();
    expect(component.isGameActive)
      .toEqual(false);

    (compiled.querySelector(byAutomationId('newButton')) as HTMLButtonElement).click();

    fixture.whenStable().then(() => {
      expect(component.isGameActive)
        .toEqual(true);
      expect(compiled.querySelector('.overlay'))
        .toBeNull();
      expect(compiled.querySelector(byAutomationId('movesCounter')))
        .toBeDefined();
      expect(compiled.querySelector(byAutomationId('movesCounter')).textContent)
        .toContain('Moves: 0');

      const blankBlockId = compiled.querySelector('.blank__block').id;
      const blankBlockRow = parseInt(split(blankBlockId, '_')[1], 10);
      const blankBlockColumn = parseInt(split(blankBlockId, '_')[2], 10);
      const blockNextToBlank = (component.rows - (blankBlockRow + 1) > 0) ?
                          `#theName_${blankBlockRow + 1}_${blankBlockColumn}` :
                          `#theName_${blankBlockRow - 1}_${blankBlockColumn}`;

      (compiled.querySelector(blockNextToBlank) as HTMLButtonElement).click();

      fixture.whenStable().then(() => {
        expect(compiled.querySelector(byAutomationId('movesCounter')).textContent)
          .toContain('Moves: 1');
      });
    });

    setTimeout(() => {
      done();
    }, 3000); // Time for shuffle animation to complete
  });
});
