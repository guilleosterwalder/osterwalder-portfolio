import { TestBed } from '@angular/core/testing';

import { IotDashboardServiceTs } from './iot-dashboard.service.ts';

describe('IotDashboardServiceTs', () => {
  let service: IotDashboardServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IotDashboardServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
