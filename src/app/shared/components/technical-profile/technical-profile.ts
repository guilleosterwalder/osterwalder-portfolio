import { Component } from '@angular/core';
import { skillCategories } from '../../../core/data/skill-categories';

@Component({
  selector: 'app-technical-profile',
  templateUrl: './technical-profile.html',
  styleUrl: './technical-profile.css',
})
export class TechnicalProfile {
  readonly categories = skillCategories;
}