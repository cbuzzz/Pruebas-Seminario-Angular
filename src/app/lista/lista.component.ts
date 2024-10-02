import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  usuarios: any[] = []; // Aquí se almacenarán los datos completos de los usuarios
  desplegado: boolean[] = []; // Controla si el desplegable de cada usuario está abierto o cerrado

  // Objeto para almacenar los datos del nuevo usuario
  nuevoUsuario = {
    name: '',
    email: '',
    phone: '',
    website: '',
    company: {
      name: ''
    },
    address: {
      street: '',
      city: '',
      zipcode: ''
    }
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Cargar usuarios desde la API
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe(data => {
        this.usuarios = data;
        this.desplegado = new Array(data.length).fill(false);
      });
  }

  // Función para agregar un nuevo elemento basado en los datos del formulario
  agregarElemento(): void {
    // Crear el objeto JSON con los datos introducidos por el usuario
    const usuarioJSON = { ...this.nuevoUsuario };

    // Añadir el nuevo usuario a la lista
    this.usuarios.push(usuarioJSON);
    this.desplegado.push(false); // Añadir estado para el desplegable

    // Limpiar el formulario
    this.nuevoUsuario = {
      name: '',
      email: '',
      phone: '',
      website: '',
      company: { name: '' },
      address: { street: '', city: '', zipcode: '' }
    };

    // Enviar el JSON a la API externa (simulación)
    this.enviarDatosAPI(usuarioJSON);
  }

  // Simulación del envío de datos a una API externa
  enviarDatosAPI(usuario: any): void {
    // Simulación de envío de datos
    console.log('Enviando datos a la API:', usuario);
    // Aquí puedes implementar la lógica para hacer un POST con HttpClient
    /*
    this.http.post('https://api-externa.com/endpoint', usuario)
      .subscribe(response => {
        console.log('Respuesta de la API:', response);
      });
    */
  }

  // Función para eliminar un elemento de la lista
  eliminarElemento(index: number): void {
    this.usuarios.splice(index, 1);
    this.desplegado.splice(index, 1);
  }

  // Función para alternar la visualización del desplegable
  toggleDesplegable(index: number): void {
    this.desplegado[index] = !this.desplegado[index];
  }
}
