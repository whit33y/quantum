import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchListCard } from './watch-list-card';

describe('WatchListCard', () => {
  let component: WatchListCard;
  let fixture: ComponentFixture<WatchListCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchListCard],
    }).compileComponents();

    fixture = TestBed.createComponent(WatchListCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
