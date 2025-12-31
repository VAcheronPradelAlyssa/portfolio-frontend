import { Component, OnInit, OnDestroy, signal, inject, AfterViewInit, computed } from '@angular/core';
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
  
  rotatingPhrases: string[] = [
    'Passionnée de voitures anciennes 🚘',
    'Pêche à la carpe 🎣',
    'Pêche aux leurres 🎣',
    'Jeux vidéos 🎮',
  ];
  
  currentPhraseIndex = signal<number>(0);
  currentPhrase = computed(() => this.rotatingPhrases[this.currentPhraseIndex()]);
  displayedText = signal<string>('');
  isDeleting = signal<boolean>(false);
  charIndex = signal<number>(0);
  private typingIntervalId: ReturnType<typeof setInterval> | null = null;

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
      this.startTypingEffect();
    }
  }

  private startTypingEffect(): void {
    const typeCharacter = () => {
      const currentText = this.currentPhrase();
      const isDeleting = this.isDeleting();
      const charIndex = this.charIndex();

      if (!isDeleting) {
        // Typing forward
        if (charIndex < currentText.length) {
          this.displayedText.set(currentText.substring(0, charIndex + 1));
          this.charIndex.set(charIndex + 1);
          this.typingIntervalId = setTimeout(typeCharacter, 100);
        } else {
          // Phrase complete, pause before deleting
          this.typingIntervalId = setTimeout(() => {
            this.isDeleting.set(true);
            this.typingIntervalId = setTimeout(typeCharacter, 100);
          }, 2000);
        }
      } else {
        // Deleting backward
        if (charIndex > 0) {
          this.displayedText.set(currentText.substring(0, charIndex - 1));
          this.charIndex.set(charIndex - 1);
          this.typingIntervalId = setTimeout(typeCharacter, 100);
        } else {
          // Move to next phrase
          this.currentPhraseIndex.set((this.currentPhraseIndex() + 1) % this.rotatingPhrases.length);
          this.isDeleting.set(false);
          this.charIndex.set(0);
          this.typingIntervalId = setTimeout(typeCharacter, 100);
        }
      }
    };

    typeCharacter();
  }

  ngAfterViewInit(): void {
    // Rien à faire - les sections s'affichent directement
  }

  private setupIntersectionObserver(): void {
    // Fonction désactivée - pas d'animations au scroll
  }

  ngOnDestroy(): void {
    if (this.typingIntervalId) {
      clearInterval(this.typingIntervalId);
    }
  }
}