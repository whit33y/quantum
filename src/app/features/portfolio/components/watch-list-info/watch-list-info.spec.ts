import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchListInfo } from './watch-list-info';

describe('WatchListInfo', () => {
  let component: WatchListInfo;
  let fixture: ComponentFixture<WatchListInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchListInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchListInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
