import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  private themeService = inject(ThemeService);

  alternarTema() {
    this.themeService.alternarTema();
  }

  esOscuro() {
    return this.themeService.obtenerTemaActual() === 'dark';
  }
}