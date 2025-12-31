import { Component, OnInit, OnDestroy, signal, inject, AfterViewInit } from '@angular/core';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-accueil',
  imports: [],
  templateUrl: './accueil.html',
  styleUrl: './accueil.scss'
})
export class AccueilComponent implements OnInit, OnDestroy, AfterViewInit {
  private userService = inject(UserService);

  user = signal<any>(null);
  error = signal<string | null>(null);
  loading = signal(true);
  titles: string[] = [
    'Développeuse Fullstack Java/Angular 💻',
    'Conceptrice Développeuse d\'applications web et mobile 📱',
    'Passionnée automobile 🚘',
    'Pêcheuse 🎣',
  ];
  currentTitleIndex = 0;
  currentTitle = signal<string>(this.titles[0]);
  private titleIntervalId: ReturnType<typeof setInterval> | null = null;
  private intersectionObserver: IntersectionObserver | null = null;

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (data) => {
        this.user.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erreur lors du chargement utilisateur:', err);
        this.error.set('Le backend n\'est pas encore configuré');
        this.loading.set(false);
      }
    });

    if (typeof window !== 'undefined') {
      this.titleIntervalId = setInterval(() => {
        this.currentTitleIndex = (this.currentTitleIndex + 1) % this.titles.length;
        this.currentTitle.set(this.titles[this.currentTitleIndex]);
      }, 2000);
    }
  }

  ngAfterViewInit(): void {
    // Rien à faire - les sections s'affichent directement
  }

  private setupIntersectionObserver(): void {
    // Fonction désactivée - pas d'animations au scroll
  }

  ngOnDestroy(): void {
    if (this.titleIntervalId) {
      clearInterval(this.titleIntervalId);
    }
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }
}