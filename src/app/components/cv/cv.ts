import { Component, OnInit, signal, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-cv',
  imports: [],
  templateUrl: './cv.html',
  styleUrl: './cv.scss',
  host: {
    'class': 'cv-theme'
  }
})
export class CvComponent implements OnInit {
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    // Animation des barres de stats au chargement
    if (typeof document !== 'undefined') {
      setTimeout(() => {
        const bars = document.querySelectorAll('.bar-fill');
        bars.forEach((bar:  any) => {
          const width = bar.style.width;
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = width;
          }, 100);
        });
      }, 500);
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