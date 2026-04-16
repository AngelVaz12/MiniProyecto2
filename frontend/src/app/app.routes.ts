import { Routes } from '@angular/router';
import { Productos } from './pages/productos/productos';
import { AgregarProducto } from './pages/agregar-producto/agregar-producto';
import { DetalleProducto } from './pages/detalle-producto/detalle-producto';
import { EditarProducto } from './pages/editar-producto/editar-producto';
import { Contacto } from './pages/contacto/contacto';
import { Acerca } from './pages/acerca/acerca';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Productos },
  { path: 'agregar', component: AgregarProducto },
  { path: 'producto/:id', component: DetalleProducto },
  { path: 'editar/:id', component: EditarProducto },
  { path: 'contacto', component: Contacto },
  { path: 'acerca', component: Acerca },
  { path: '**', component: NotFound }
];