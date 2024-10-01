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
  elementos: string[] = ['Carla', 'Pere', 'Mayra', 'Andrea', 'Dani', 'Buzz']; 
  nuevoElemento: string = '';

  constructor() {
  }

  agregarElemento() {
    if (this.nuevoElemento.trim()) {
      this.elementos.push(this.nuevoElemento);
      this.nuevoElemento = '';
    }
  }

  eliminarElemento(index: number) {
    this.elementos.splice(index, 1);
  }
}


