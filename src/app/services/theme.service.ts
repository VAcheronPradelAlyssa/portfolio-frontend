import { Injectable, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  currentTheme = signal<'default' | 'cv' | 'accueil'>('default');

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.url;
        if (url.includes('/cv')) {
          this.currentTheme.set('cv');
        } else if (url === '/' || url === '') {
          this.currentTheme.set('accueil');
        } else {
          this.currentTheme.set('default');
        }
      });
  }
}
