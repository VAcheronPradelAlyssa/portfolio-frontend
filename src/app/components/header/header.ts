import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: {
    '[class.accueil-theme]': 'isAccueilPage()',
    '[class.cv-theme]': 'isCvPage()',
    '[class.apropos-theme]': 'isAproposPage()',
    '[class.projets-theme]': 'isProjetsPage()'
  }
})
export class Header {
  private router = inject(Router);
  private themeService = inject(ThemeService);
  
  isAccueilPage = signal(false);
  isCvPage = signal(false);
  isAproposPage = signal(false);
  isProjetsPage = signal(false);
  isMenuOpen = signal(false);

  constructor() {
    this.checkRoute(this.router.url);
    
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.checkRoute(event.urlAfterRedirects);
        // Fermer le menu quand on navigue
        this.isMenuOpen.set(false);
      });
  }

  toggleMenu(): void {
    this.isMenuOpen.update(value => !value);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  private checkRoute(url: string): void {
    this.isAccueilPage.set(url === '/' || url === '');
    this.isCvPage.set(url.includes('/cv'));
    this.isAproposPage.set(url.includes('/apropos'));
    this.isProjetsPage.set(url.includes('/projets'));
  }
}
