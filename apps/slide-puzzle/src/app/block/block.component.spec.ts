import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockComponent } from './block.component';
import { Block } from 'apps/slide-puzzle/src/app/block/block';

describe('[BlockComponent]', () => {
  let component: BlockComponent;
  let fixture: ComponentFixture<BlockComponent>;

  const mockBlock: Block = {
    id: 1,
    coordinates: [4, 4],
    successCoordinates: [4, 4],
    style: '',
    success: true,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlockComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockComponent);
    component = fixture.componentInstance;
    component.state = mockBlock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
