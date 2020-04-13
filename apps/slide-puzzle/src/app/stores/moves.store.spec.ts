import { MovesStore } from 'apps/slide-puzzle/src/app/stores/moves.store';
import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { MovesPersistance } from 'apps/slide-puzzle/src/app/persistance/moves.persistance';

describe('[MovesStore]', () => {
  let store: MovesStore;
  let emittedDetails: number[];

  const unsubscribeSubject: Subject<void> = new Subject<void>();
  const onChangeCallback = (details: number[]) => {
    emittedDetails = details;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovesStore,
        MovesPersistance,
      ],
    });
    const data: number[] = [1, 3];
    store = TestBed.get(MovesStore);
    store.subscribe(unsubscribeSubject, onChangeCallback);
    store.setMoves(data);
  });

  it('should initialise with a behaviour subject', () => {
    expect((store as any).subject)
      .toBeDefined();
  });

  it('should unsubscribe when provided unsubscribeSubject emits', () => {
    expect((store as any).subject.observers.length)
      .toEqual(1);

    unsubscribeSubject.next();

    expect((store as any).subject.observers.length)
      .toEqual(0);
  });

  it('should emit when adding data', () => {
    store.addMoves(666);
    expect(emittedDetails)
      .toEqual([666]);
  });

  it('should remove duplicates and emit when adding data', () => {
    store.addMoves(666);
    store.addMoves(666);
    store.addMoves(667);
    store.addMoves(668);
    expect(emittedDetails)
      .toEqual([666, 667, 668]);
  });
});
