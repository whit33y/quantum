import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioAddForm } from './portfolio-add-form';

describe('PortfolioAddForm', () => {
  let component: PortfolioAddForm;
  let fixture: ComponentFixture<PortfolioAddForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioAddForm],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioAddForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
