import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioFindedItems } from './portfolio-finded-items';

describe('PortfolioFindedItems', () => {
  let component: PortfolioFindedItems;
  let fixture: ComponentFixture<PortfolioFindedItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioFindedItems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioFindedItems);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
