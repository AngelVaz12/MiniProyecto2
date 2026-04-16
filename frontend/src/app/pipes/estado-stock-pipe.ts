import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoStock'
})
export class EstadoStockPipe implements PipeTransform {
  transform(stock: number): string {
    if (stock === 0) {
      return 'Crítico';
    }

    if (stock <= 5) {
      return 'Bajo';
    }

    return 'Alto';
  }
}