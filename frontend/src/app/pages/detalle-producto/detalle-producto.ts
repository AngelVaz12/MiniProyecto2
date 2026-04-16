import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-detalle-producto',
  imports: [RouterLink],
  templateUrl: './detalle-producto.html',
  styleUrl: './detalle-producto.css'
})
export class DetalleProducto {
  private route = inject(ActivatedRoute);
  private servicio = inject(ProductoService);
  private cdr = inject(ChangeDetectorRef);

  producto: Producto | null = null;
  mensaje = '';

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));

      this.servicio.getProductoById(id).subscribe({
        next: (data) => {
          this.producto = data;
          this.mensaje = '';
          console.log('DETALLE RECIBIDO:', this.producto);
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('ERROR EN DETALLE:', error);
          this.producto = null;
          this.mensaje = 'No se encontró el producto.';
          this.cdr.detectChanges();
        }
      });
    });
  }
}