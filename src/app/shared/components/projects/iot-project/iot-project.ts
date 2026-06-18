import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { iotProjectData } from '../../../../core/data/projects/iot-project.data';
import { iotDashboardData } from '../../../../core/data/projects/iot-dashboard.data';
import * as Highcharts from 'highcharts';
import { HighchartsChartComponent } from 'highcharts-angular';
import { IotDashboardService } from '../../../../core/services/iot-dashboard.service.ts';

@Component({
  selector: 'app-iot-project',
  standalone: true,
  imports: [ HighchartsChartComponent ],
  templateUrl: './iot-project.html',
  styleUrl: './iot-project.css',
})
  export class IotProject implements OnInit {
    readonly project = iotProjectData;
    readonly Highcharts = Highcharts;
    readonly dashboardService = inject(IotDashboardService);
    readonly dashboard = signal<typeof iotDashboardData | null>( null);
    readonly primaryColor =
      getComputedStyle(
        document.documentElement
      ).getPropertyValue(
        '--primary-color'
      ).trim();

    ngOnInit(): void {
    this.dashboardService
      .getDashboard()
      .subscribe(data => {
        this.dashboard.set(data);
      });

  }

  readonly chartOptions = computed<
    Highcharts.Options
  >(() => {

    const dashboard = this.dashboard();

    if (!dashboard) {
      return {};
    }

    return {

      chart: {
        type: 'line',
        backgroundColor: 'transparent',
      },

      title: {
        text: 'Connected Devices',
        style: {
          color: this.primaryColor,
          fontWeight: '600',
        },
      },

      credits: {
        enabled: false,
      },

      legend: {
        enabled: false,
      },

      xAxis: {
        categories:
          dashboard.connectedDevices.map(
            item => item.day
          ),
      },

      yAxis: {
        title: {
          text: 'Devices',
        },
      },

      series: [
        {
          type: 'line',
          name: 'Devices',

          data:
            dashboard.connectedDevices.map(
              item => item.value
            ),
        },
      ],
    };

  });

  readonly deviceDistributionChart =
    computed<Highcharts.Options>(
      () => {

        const dashboard =
          this.dashboard();

        if (!dashboard) {
          return {};
        }

        return {

          chart: {
            type: 'pie',
            backgroundColor: 'transparent',
          },

          title: {
            text: 'Device Distribution',
            style: {
              color: this.primaryColor,
              fontWeight: '600',
            },
          },

          credits: {
            enabled: false,
          },

          accessibility: {
            enabled: false,
          },

          series: [
            {
              type: 'pie',
              name: 'Devices',

              data:
                dashboard.deviceDistribution.map(
                  device => ({
                    name: device.name,
                    y: device.value,
                  })
                ),
            },
          ],
        };

      }
    );

}