import { Component, inject } from '@angular/core';
import { IotProject } from '../../shared/components/projects/iot-project/iot-project';
import { SettingsService } from '../../core/services/settings.service';
import { MedicalResearchProject } from "../../shared/components/projects/medical-research-project/medical-research-project";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [IotProject, MedicalResearchProject],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  readonly settings = inject(SettingsService);
}
