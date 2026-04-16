import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { FiltroService } from '../../services/filtro.service';
import { UiService } from '../../services/ui.service';
import { Producto } from '../../interfaces/producto.interface';
import { ProductoCard } from '../../shared/producto-card/producto-card';

@Component({
  selector: 'app-productos',
  imports: [RouterLink, ProductoCard],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos {
  private servicio = inject(ProductoService);
  private filtroService = inject(FiltroService);
  private uiService = inject(UiService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  filtroActual = 'todos';
  mensaje = '';

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.servicio.getProductos().subscribe({
      next: (data) => {
        this.productos = data;

        this.route.queryParamMap.subscribe(params => {
          const stock = params.get('stock') ?? 'todos';

          this.filtroActual = stock;
          this.productosFiltrados = this.filtroService.filtrarPorStock(this.productos, stock);
          this.mensaje = this.uiService.getMensaje();

          this.cdr.detectChanges();
        });
      },
      error: (error) => {
        console.error('ERROR AL CARGAR PRODUCTOS:', error);
      }
    });
  }

  mostrarTodos() {
    this.router.navigate(['/'], {
      queryParams: {}
    });
  }

  filtrarStockAlto() {
    this.router.navigate(['/'], {
      queryParams: { stock: 'alto' }
    });
  }

  filtrarStockBajo() {
    this.router.navigate(['/'], {
      queryParams: { stock: 'bajo' }
    });
  }

  eliminarProducto(id: number) {
    this.servicio.deleteProducto(id).subscribe({
      next: () => {
        this.uiService.setMensaje('Producto eliminado correctamente.');
        this.cargarProductos();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('ERROR AL ELIMINAR:', error);
        this.uiService.setMensaje('Ocurrió un error al eliminar el producto.');
        this.mensaje = this.uiService.getMensaje();
        this.cdr.detectChanges();
      }
    });
  }
}