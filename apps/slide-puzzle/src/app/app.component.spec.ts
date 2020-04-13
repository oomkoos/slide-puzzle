import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BoardComponent } from 'apps/slide-puzzle/src/app/board/board.component';
import { BlockComponent } from 'apps/slide-puzzle/src/app/block/block.component';
import { MovesPersistance } from 'apps/slide-puzzle/src/app/persistance/moves.persistance';
import { MovesStore } from 'apps/slide-puzzle/src/app/stores/moves.store';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, BoardComponent, BlockComponent,],
      providers: [MovesStore, MovesPersistance,]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'slide-puzzle'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('slide-puzzle');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Come and play slide-puzzle!'
    );
  });
});
