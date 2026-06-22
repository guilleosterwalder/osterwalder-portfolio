import { TestBed } from '@angular/core/testing';

import { IotDashboardService } from './iot-dashboard.service.js';

describe('IotDashboardServiceTs', () => {
  let service: IotDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IotDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
