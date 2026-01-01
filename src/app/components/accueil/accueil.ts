import { Component, OnInit, OnDestroy, signal, inject, AfterViewInit, computed } from '@angular/core';

@Component({
  selector: 'app-accueil',
  imports: [],
  templateUrl: './accueil.html',
  styleUrl: './accueil.scss'
})
export class AccueilComponent implements OnInit, OnDestroy, AfterViewInit {
  user = signal<any>(null);
  error = signal<string | null>(null);
  loading = signal(false);
  
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
    if (typeof window !== 'undefined') {
      this.startTypingEffect();
    }
  }

  ngAfterViewInit(): void {
    // Redémarrer l'effet de typing quand le composant devient visible
    if (this.displayedText() === '') {
      this.startTypingEffect();
    }
  }

  private startTypingEffect(): void {
    // Arrêter l'intervalle précédent
    if (this.typingIntervalId) {
      clearTimeout(this.typingIntervalId);
    }

    // Réinitialiser les états
    this.currentPhraseIndex.set(0);
    this.charIndex.set(0);
    this.isDeleting.set(false);
    this.displayedText.set('');

    const typeCharacter = () => {
      const currentText = this.currentPhrase();
      const isDeleting = this.isDeleting();
      const charIndex = this.charIndex();

      if (!isDeleting) {
        if (charIndex < currentText.length) {
          this.displayedText.set(currentText.substring(0, charIndex + 1));
          this.charIndex.set(charIndex + 1);
          // Vitesse variable pour plus de réalisme
          const speed = Math.random() * 50 + 80; // Entre 80 et 130ms
          this.typingIntervalId = setTimeout(typeCharacter, speed);
        } else {
          // Pause plus longue pour lire la phrase complète
          this.typingIntervalId = setTimeout(() => {
            this.isDeleting.set(true);
            this.typingIntervalId = setTimeout(typeCharacter, 50);
          }, 2500); // 2.5 secondes de pause
        }
      } else {
        if (charIndex > 0) {
          this.displayedText.set(currentText.substring(0, charIndex - 1));
          this.charIndex.set(charIndex - 1);
          // Suppression plus rapide
          this.typingIntervalId = setTimeout(typeCharacter, 50);
        } else {
          this.currentPhraseIndex.set((this.currentPhraseIndex() + 1) % this.rotatingPhrases.length);
          this.isDeleting.set(false);
          this.charIndex.set(0);
          // Petite pause avant de recommencer
          this.typingIntervalId = setTimeout(typeCharacter, 500);
        }
      }
    };

    typeCharacter();
  }

  ngOnDestroy(): void {
    if (this.typingIntervalId) {
      clearTimeout(this.typingIntervalId);
    }
  }

  downloadCV(): void {
    const link = document.createElement('a');
    link.href = '/assets/CV_ALYSSA_VACHERON.pdf';
    link.download = 'CV_ALYSSA_VACHERON.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}