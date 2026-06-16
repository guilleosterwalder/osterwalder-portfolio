import { Injectable, computed, effect, signal } from '@angular/core';

import { es } from '../constants/i18n/es';
import { en } from '../constants/i18n/en';

export type Language = 'es' | 'en';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  readonly language = signal<Language>('es');

  readonly primaryColor = signal('#6750A4');
  readonly secondaryColor = signal('#c0b8cc');
  readonly backgroundColor = signal('#f5f5f5');

  constructor() {
    effect(() => {
      document.documentElement.style.setProperty(
        '--primary-color',
        this.primaryColor()
      );

      document.documentElement.style.setProperty(
        '--secondary-color',
        this.secondaryColor()
      );

      document.documentElement.style.setProperty(
        '--background-color',
        this.backgroundColor()
      );
    });
  }

  readonly translations = computed(() => {
    return this.language() === 'es' ? es : en;
  });
}