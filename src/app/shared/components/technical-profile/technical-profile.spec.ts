import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalProfile } from './technical-profile';

describe('TechnicalProfile', () => {
  let component: TechnicalProfile;
  let fixture: ComponentFixture<TechnicalProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicalProfile],
    }).compileComponents();

    fixture = TestBed.createComponent(TechnicalProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
