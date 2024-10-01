import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ListaComponent implements OnInit {
  elementos: any[] = []; // Aquí se almacenarán los datos de la API
  nuevoElemento: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Hacer la solicitud HTTP para obtener los datos de la API
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe(data => {
        this.elementos = data.map(user => user.name); // Guardar los nombres de los usuarios en 'elementos'
      });
  }

  agregarElemento(): void {
    if (this.nuevoElemento) {
      this.elementos.push(this.nuevoElemento);
      this.nuevoElemento = '';
    }
  }

  eliminarElemento(index: number): void {
    this.elementos.splice(index, 1);
  }
}


