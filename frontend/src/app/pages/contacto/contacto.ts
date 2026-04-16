import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  imports: [FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {

  nombre = '';
  correo = '';
  mensajeTexto = '';

  mensaje = '';

  enviar() {
    if (!this.nombre || !this.correo || !this.mensajeTexto) {
      this.mensaje = 'Todos los campos son obligatorios.';
      return;
    }

    if (!this.correo.includes('@')) {
      this.mensaje = 'Ingresa un correo válido.';
      return;
    }

    this.mensaje = 'Mensaje enviado correctamente.';

    // limpiar formulario
    this.nombre = '';
    this.correo = '';
    this.mensajeTexto = '';
  }
}