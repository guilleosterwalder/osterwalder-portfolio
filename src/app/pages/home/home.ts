import { Component, inject } from '@angular/core';
import { skills } from '../../core/data/skills';
import { SettingsService } from '../../core/services/settings.service';
import { TechnicalProfile } from '../../shared/components/technical-profile/technical-profile';
import { ExperienceTimeline } from '../../shared/components/experience-timeline/experience-timeline';

@Component({
  selector: 'app-home',
  imports: [TechnicalProfile, ExperienceTimeline],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  readonly settings = inject(SettingsService);
  readonly skills = skills;
}
