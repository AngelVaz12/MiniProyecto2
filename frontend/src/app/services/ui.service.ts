import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private mensaje = '';

  setMensaje(texto: string) {
    this.mensaje = texto;
  }

  getMensaje() {
    return this.mensaje;
  }

  limpiarMensaje() {
    this.mensaje = '';
  }
}