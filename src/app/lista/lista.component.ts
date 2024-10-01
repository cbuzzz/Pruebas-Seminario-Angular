import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista',
  standalone: true,
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  imports: [FormsModule, CommonModule]
})
export class ListaComponent {
  elementos: string[] = ['Carla', 'Pere', 'Mayra', 'Andrea', 'Dani', 'Buzz']; // Elementos iniciales
  nuevoElemento: string = '';

  constructor() {
    // Puedes inicializar elementos aquí si prefieres
  }

  agregarElemento() {
    if (this.nuevoElemento.trim()) {
      this.elementos.push(this.nuevoElemento);
      this.nuevoElemento = ''; // Limpiar el campo de entrada
    }
  }

  eliminarElemento(index: number) {
    this.elementos.splice(index, 1);
  }
}


