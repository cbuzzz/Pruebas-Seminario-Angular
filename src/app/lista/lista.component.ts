import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import FormsModule para ngModel
import { User } from '../models/user.model'; // Importar el modelo User
import { UserService } from '../services/user.service'; // Importar el servicio UserService

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  standalone: true,  // Esto convierte el componente en independiente
  imports: [CommonModule, FormsModule]  // Importar CommonModule y FormsModule
})
export class ListaComponent implements OnInit {
  usuarios: User[] = []; // Lista de usuarios con tipado User
  desplegado: boolean[] = []; // Controla si el desplegable de cada usuario está abierto o cerrado

  nuevoUsuario: User = {
    name: '',
    email: '', // Añadir el campo email
    password: '',
    comment: ''
  };

  confirmarPassword: string = ''; // Campo para confirmar la contraseña
  usuarioEdicion: User | null = null; // Usuario en proceso de edición
  indiceEdicion: number | null = null; // Almacena el índice del usuario en edición

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Cargar usuarios desde el UserService
    this.userService.getUsers()
      .subscribe(data => {
        this.usuarios = data;
        this.desplegado = new Array(data.length).fill(false);
      });
  }

  // Función para agregar o modificar un usuario
  agregarElemento(): void {
    // Verificar si las contraseñas coinciden
    if (this.nuevoUsuario.password !== this.confirmarPassword) {
      alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      return; // Salir de la función si no coinciden
    }

    if (this.indiceEdicion !== null) {
      // Estamos en modo edición, modificar el usuario existente
      this.usuarios[this.indiceEdicion] = { ...this.nuevoUsuario, _id: this.usuarios[this.indiceEdicion]._id };

      // Actualizar el usuario en la API
      this.userService.updateUser(this.usuarios[this.indiceEdicion]).subscribe(response => {
        console.log('Usuario actualizado:', response);
      });

      // Limpiar el estado de edición
      this.indiceEdicion = null;
    } else {
      // Modo agregar nuevo usuario
      const usuarioJSON: User = {
        name: this.nuevoUsuario.name,
        email: this.nuevoUsuario.email, // Añadir el campo email
        password: this.nuevoUsuario.password,
        comment: this.nuevoUsuario.comment
      };

      // Agregar el usuario al array de usuarios en el frontend
      this.usuarios.push(usuarioJSON);
      this.desplegado.push(false);

      // Enviar el usuario a la API a través del UserService
      this.userService.addUser(usuarioJSON).subscribe(response => {
        console.log('Usuario agregado:', response);
      });
    }

    // Limpiar los campos del formulario
    this.nuevoUsuario = {
      name: '',
      email: '', // Limpiar el campo email
      password: '',
      comment: ''
    };
    this.confirmarPassword = ''; // Reiniciar el campo de confirmar contraseña
  }

  // Función para preparar la edición de un usuario
  prepararEdicion(usuario: User, index: number): void {
    this.usuarioEdicion = { ...usuario }; // Clonar el usuario para la edición
    this.nuevoUsuario = { ...usuario }; // Cargar los datos del usuario en el formulario
    this.indiceEdicion = index; // Almacenar el índice del usuario en edición
    this.desplegado[index] = true; // Abrir el desplegable del usuario que se está editando
  }

  // Función para eliminar un usuario usando el _id
  eliminarElemento(index: number): void {
    const usuarioAEliminar = this.usuarios[index];

    if (confirm(`¿Estás seguro de que deseas eliminar a ${usuarioAEliminar.name}?`)) {
      // Eliminar a través del UserService usando el _id como identificador
      this.userService.deleteUserById(usuarioAEliminar._id!).subscribe(
        response => {
          console.log('Usuario eliminado:', response);
          this.usuarios.splice(index, 1);
          this.desplegado.splice(index, 1);
        },
        error => {
          console.error('Error al eliminar el usuario:', error);
          alert('Error al eliminar el usuario. Por favor, inténtalo de nuevo.');
        }
      );
    }
  }

  // Función para alternar la visualización del desplegable
  toggleDesplegable(index: number): void {
    this.desplegado[index] = !this.desplegado[index];
  }
}
