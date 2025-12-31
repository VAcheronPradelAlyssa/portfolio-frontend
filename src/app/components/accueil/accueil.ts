import { Component, OnInit, signal, inject } from '@angular/core';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-accueil',
  imports: [],
  templateUrl: './accueil.html',
  styleUrl: './accueil.scss'
})
export class AccueilComponent implements OnInit {
  private userService = inject(UserService);
  
  user = signal<any>(null);
  error = signal<string | null>(null);
  loading = signal(true);

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
  }
}