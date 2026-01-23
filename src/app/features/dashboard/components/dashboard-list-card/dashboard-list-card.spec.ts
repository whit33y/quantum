import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardListCard } from './dashboard-list-card';

describe('DashboardListCard', () => {
  let component: DashboardListCard;
  let fixture: ComponentFixture<DashboardListCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardListCard],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardListCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
