import { Component, signal, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Meta } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('portfolio-frontend');
  private metaService = inject(Meta);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    // Ajouter le JSON-LD pour le schema.org (uniquement côté navigateur)
    if (isPlatformBrowser(this.platformId)) {
      const schemaJson = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': 'Alyssa Vacheron',
        'url': 'https://vacheronalyssa.vercel.app',
        'jobTitle': 'Développeuse Full-Stack Java/Angular',
        'description': 'Développeuse Full-Stack spécialisée en Java et Angular. Formation OpenClassrooms en Développement Full-Stack (RNCP Niveau 7).',
        'sameAs': [],
        'worksFor': {
          '@type': 'Organization',
          'name': 'OpenClassrooms'
        }
      };
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schemaJson);
      document.head.appendChild(script);
    }
  }
}
