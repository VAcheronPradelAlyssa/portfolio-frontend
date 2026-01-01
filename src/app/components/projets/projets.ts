import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projets',
  imports: [],
  templateUrl: './projets.html',
  styleUrl: './projets.scss'
})
export class ProjetsComponent {
  constructor(private router: Router) {}

  navigateToProject(projectId: string): void {
    this.router. navigate(['/projet', projectId]);
  }
}