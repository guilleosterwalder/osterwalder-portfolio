import { Component, inject } from '@angular/core';
import { SettingsService } from '../../../core/services/settings.service';
import { experiences } from '../../../core/data/experience';

@Component({
  selector: 'app-experience-timeline',
  imports: [],
  templateUrl: './experience-timeline.html',
  styleUrl: './experience-timeline.css',
})
export class ExperienceTimeline {
    readonly settings = inject(SettingsService);
    readonly experiences = experiences;
}
