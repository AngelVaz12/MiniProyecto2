import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Producto } from '../../interfaces/producto.interface';
import { EstadoStockPipe } from '../../pipes/estado-stock-pipe';

@Component({
  selector: 'app-producto-card',
  imports: [RouterLink, EstadoStockPipe],
  templateUrl: './producto-card.html',
  styleUrl: './producto-card.css'
})
export class ProductoCard {
  @Input() producto!: Producto;
  @Output() eliminar = new EventEmitter<number>();
}