import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioInfo } from './portfolio-info';

describe('PortfolioInfo', () => {
  let component: PortfolioInfo;
  let fixture: ComponentFixture<PortfolioInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
