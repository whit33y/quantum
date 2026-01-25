import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioSearchCoin } from './portfolio-search-coin';

describe('PortfolioSearchCoin', () => {
  let component: PortfolioSearchCoin;
  let fixture: ComponentFixture<PortfolioSearchCoin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioSearchCoin],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioSearchCoin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
