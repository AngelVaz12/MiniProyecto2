import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {

  filtrarPorStock(productos: Producto[], filtro: string) {
    if (filtro === 'alto') {
      return productos.filter(producto => producto.stock > 5);
    }

    if (filtro === 'bajo') {
      return productos.filter(producto => producto.stock <= 5);
    }

    return productos;
  }
}