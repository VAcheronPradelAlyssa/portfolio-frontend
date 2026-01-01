import { Component, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-apropos',
  templateUrl: './apropos.html',
  styleUrl: './apropos.scss'
})
export class AProposComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  lightboxImage = signal<string | null>(null);

  ngOnInit(): void {
    // Animation d'apparition progressive des cartes
    this.animateCards();
  }

  openLightbox(imageUrl: string): void {
    this.lightboxImage.set(imageUrl);
  }

  closeLightbox(): void {
    this.lightboxImage.set(null);
  }

  private animateCards(): void {
    // Vérifier que nous sommes dans un navigateur avant d'utiliser IntersectionObserver
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observer toutes les cartes
    const cards = document.querySelectorAll('.car-card, .game-card, .photo-card');
    cards.forEach((card) => observer.observe(card));
  }
}
