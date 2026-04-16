import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { ThemeService } from './services/theme';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private themeService = inject(ThemeService);

  constructor() {
    this.themeService.inicializarTema();
  }
}