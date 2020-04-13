import { TestBed } from '@angular/core/testing';
import { MovesPersistance } from 'apps/slide-puzzle/src/app/persistance/moves.persistance';

describe('[MovesPersistance]', () => {
  let persistance: MovesPersistance;
  const mockData = [1, 2, 3];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovesPersistance,
      ],
    });
    persistance = TestBed.get(MovesPersistance);
  });

  it('should call sessionStorage.setItem when storing data', () => {
    spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');
    persistance.store(mockData);

    expect(sessionStorage.setItem)
      .toHaveBeenCalled();
  });

  it('should unsubscribe when provided unsubscribeSubject emits', () => {
    spyOn(Object.getPrototypeOf(window.localStorage), 'getItem');
    persistance.retrieve();

    expect(sessionStorage.getItem)
      .toHaveBeenCalled();
    console.log(sessionStorage.getItem('_storage.moves'));
  });
});
