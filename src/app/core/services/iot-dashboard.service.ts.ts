import { Injectable } from '@angular/core';
import { iotDashboardData } from '../data/projects/iot-dashboard.data';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IotDashboardService {

  getDashboard() {
    return of(iotDashboardData).pipe(
      delay(500)
    );
  }

}