import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavTickerScroll } from './nav-ticker-scroll';

describe('NavTickerScroll', () => {
  let component: NavTickerScroll;
  let fixture: ComponentFixture<NavTickerScroll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavTickerScroll]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavTickerScroll);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
