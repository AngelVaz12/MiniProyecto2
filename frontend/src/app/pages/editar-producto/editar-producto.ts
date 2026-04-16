import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-editar-producto',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './editar-producto.html',
  styleUrl: './editar-producto.css'
})
export class EditarProducto {
  private fb = inject(FormBuilder);
  private servicio = inject(ProductoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  mensaje = '';
  idProducto = 0;

  form = this.fb.group({
    nombre: this.fb.control<string>('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ],
      nonNullable: true
    }),
    precio: this.fb.control<number | null>(null, {
      validators: [
        Validators.required,
        Validators.min(1),
        Validators.pattern(/^\d+(\.\d{1,2})?$/)
      ]
    }),
    stock: this.fb.control<number | null>(null, {
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.max(9999)
      ]
    })
  });

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.idProducto = id;

      this.servicio.getProductoById(id).subscribe({
        next: (data) => {
          this.form.patchValue({
            nombre: data.nombre,
            precio: Number(data.precio),
            stock: data.stock
          });
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('ERROR AL CARGAR PRODUCTO:', error);
          this.mensaje = 'No se pudo cargar el producto.';
          this.cdr.detectChanges();
        }
      });
    });
  }

  guardarCambios() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.mensaje = 'Corrige los campos marcados antes de guardar.';
      this.cdr.detectChanges();
      return;
    }

    const productoActualizado = {
      nombre: this.form.value.nombre!,
      precio: Number(this.form.value.precio),
      stock: Number(this.form.value.stock)
    };

    this.servicio.updateProducto(this.idProducto, productoActualizado).subscribe({
      next: () => {
        this.mensaje = 'Producto actualizado correctamente.';
        this.cdr.detectChanges();

        setTimeout(() => {
          this.router.navigate(['/producto', this.idProducto]);
        }, 800);
      },
      error: (error) => {
        console.error('ERROR AL ACTUALIZAR:', error);
        this.mensaje = 'Ocurrió un error al actualizar el producto.';
        this.cdr.detectChanges();
      }
    });
  }
}