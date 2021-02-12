import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessmenComponent } from './chessmen.component';

describe('ChessmenComponent', () => {
  let component: ChessmenComponent;
  let fixture: ComponentFixture<ChessmenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChessmenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChessmenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
