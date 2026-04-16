import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-agregar-producto',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './agregar-producto.html',
  styleUrl: './agregar-producto.css'
})
export class AgregarProducto {
  private fb = inject(FormBuilder);
  private servicio = inject(ProductoService);
  private router = inject(Router);

  mensaje = '';

  form = this.fb.group({
    nombre: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]],
    precio: [null, [
      Validators.required,
      Validators.min(1),
      Validators.pattern(/^\d+(\.\d{1,2})?$/)
    ]],
    stock: [null, [
      Validators.required,
      Validators.min(0),
      Validators.max(9999)
    ]]
  });

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.mensaje = 'Corrige los campos marcados antes de guardar.';
      return;
    }

    const producto = {
      nombre: this.form.value.nombre!,
      precio: Number(this.form.value.precio),
      stock: Number(this.form.value.stock)
    };

    this.servicio.postProducto(producto).subscribe({
      next: () => {
        this.mensaje = 'Producto agregado correctamente.';
        this.form.reset();
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 800);
      },
      error: (error) => {
        console.error('ERROR AL GUARDAR:', error);
        this.mensaje = 'Ocurrió un error al guardar el producto.';
      }
    });
  }   
}