import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePortfolioPage } from './create-portfolio-page';

describe('CreatePortfolioPage', () => {
  let component: CreatePortfolioPage;
  let fixture: ComponentFixture<CreatePortfolioPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePortfolioPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePortfolioPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
