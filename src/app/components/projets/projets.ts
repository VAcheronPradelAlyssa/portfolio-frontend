import { Component, inject, signal, HostListener, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projets',
  imports: [CommonModule],
  templateUrl: './projets.html',
  styleUrl: './projets.scss'
})
export class ProjetsComponent {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  // Lightbox signal: holds the current image URL or null
  lightboxImage = signal<string | null>(null);

  navigateToProject(projectId: string): void {
    this.router.navigate(['/projet', projectId]);
  }

  openLightbox(imageUrl: string): void {
    this.lightboxImage.set(imageUrl);
  }

  closeLightbox(): void {
    this.lightboxImage.set(null);
  }

  toggleLightbox(imageUrl: string): void {
    this.lightboxImage.update(current => current === imageUrl ? null : imageUrl);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeLightbox();
  }
}