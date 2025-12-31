import { Component, OnInit, signal, inject } from '@angular/core';
import { ProjectService } from '../../services/project';

@Component({
  selector: 'app-projets',
  imports: [],
  templateUrl: './projets.html',
  styleUrl: './projets.scss'
})
export class ProjetsComponent implements OnInit {
  private projectService = inject(ProjectService);
  
  projects = signal<any[]>([]);
  error = signal<string | null>(null);
  loading = signal(true);

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe({
      next: (data) => {
        this.projects.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des projets:', err);
        this.error.set('Le backend n\'est pas encore configuré');
        this.loading.set(false);
      }
    });
  }
}