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

  nuevoUsuario = {
    name: '',
    mail: '',
    password: '',
    comment: ''
  };

  confirmarPassword: string = ''; // Agregamos la propiedad para Confirmar Contraseña
  usuarioEdicion: any = null; // Usuario a editar

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Cargar usuarios desde la API
    this.http.get<any[]>('http://localhost:3000/api/user')
      .subscribe(data => {
        this.usuarios = data;
        this.desplegado = new Array(data.length).fill(false);
      });
  }

  // Función para agregar un nuevo elemento basado en los datos del formulario
  agregarElemento(): void {
    // Verificar si las contraseñas coinciden
    if (this.nuevoUsuario.password !== this.confirmarPassword) {
      alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      return; // Salir de la función si no coinciden
    }

    const usuarioJSON = { ...this.nuevoUsuario };

    this.usuarios.push(usuarioJSON);
    this.desplegado.push(false);

    this.nuevoUsuario = {
      name: '',
      mail: '',
      password: '',
      comment: ''
    };

    this.confirmarPassword = ''; // Reiniciar confirmar contraseña

    this.enviarDatosAPI(usuarioJSON);
  }

  // Simulación del envío de datos a una API externa
  enviarDatosAPI(usuario: any): void {
    console.log('Enviando datos a la API:', usuario);

    this.http.post('http://localhost:3000/api/user', usuario)
      .subscribe(response => {
        console.log('Respuesta de la API:', response);
      });
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

  // Función para preparar la edición de un usuario
  prepararEdicion(usuario: any, index: number): void {
    this.usuarioEdicion = { ...usuario }; // Clonamos el usuario para editar
    this.nuevoUsuario = { ...usuario }; // Cargamos el usuario en el formulario para edición
    this.eliminarElemento(index); // Opcional: eliminamos el usuario de la lista para agregarlo nuevamente después de la edición
  }

  // Función para actualizar un usuario en la API
  actualizarUsuario(usuario: any): void {
    this.http.put(`http://localhost:3000/api/user/${usuario.id}`, usuario)
      .subscribe(response => {
        console.log('Usuario actualizado:', response);
      });
  }
}
