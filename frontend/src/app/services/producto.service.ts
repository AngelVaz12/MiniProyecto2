import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private http = inject(HttpClient);
  private API_URL = 'http://localhost:3000/api/productos';

  getProductos() {
    return this.http.get<Producto[]>(this.API_URL);
  }

  postProducto(producto: Omit<Producto, 'id'>) {
    return this.http.post(this.API_URL, producto);
  }

  getProductoById(id: number) {
    return this.http.get<Producto>(`${this.API_URL}/${id}`);
  }

  updateProducto(id: number, producto: Omit<Producto, 'id'>) {
    return this.http.put(`${this.API_URL}/${id}`, producto);
  }

  deleteProducto(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}