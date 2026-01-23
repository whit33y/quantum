import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDetailsCard } from './asset-details-card';

describe('AssetDetailsCard', () => {
  let component: AssetDetailsCard;
  let fixture: ComponentFixture<AssetDetailsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetDetailsCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetDetailsCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
