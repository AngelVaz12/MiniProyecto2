import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private temaActual: 'light' | 'dark' = 'light';

  inicializarTema() {
    const temaGuardado = localStorage.getItem('tema');

    if (temaGuardado === 'dark' || temaGuardado === 'light') {
      this.temaActual = temaGuardado;
    }

    this.aplicarTema();
  }

  alternarTema() {
    this.temaActual = this.temaActual === 'light' ? 'dark' : 'light';
    localStorage.setItem('tema', this.temaActual);
    this.aplicarTema();
  }

  obtenerTemaActual() {
    return this.temaActual;
  }

  private aplicarTema() {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${this.temaActual}-theme`);
  }
}