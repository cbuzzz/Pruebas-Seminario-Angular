import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../services/usuarioService.service';
import { newUsuario, Usuario } from '../modelos/usuario.model';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ListaComponent{ //implements OnInit 
  usuarios: Usuario[] = []; // Aquí se almacenarán los datos completos de los usuarios
  desplegado: boolean[] = []; // Controla si el desplegable de cada usuario está abierto o cerrado

  newusuario: newUsuario[] = [];

  data: any = {};
  private apiUrl = 'http://localhost:3000/api/user';
  

  // Objeto para almacenar los datos del nuevo usuario
 
  getUsuario = {
    _id:'',
    //id: 0,
    name: '',
    mail: '',
    password: '',
    comment: ''
  }

  postUsuario = {
    id: 0,
    name: '',
    mail: '',
    password: '',
    comment: ''
  }

  //constructor(private UserService: UserService){} 
  
 /* ngOnInit(): void {
  }*/

  constructor(private userService: UsuarioService) {}
  

  //https://jsonplaceholder.typicode.com/users
  //localhost:3000/api/user

  ngOnInit(): void {
    // Cargar usuarios desde la API
    this.userService.getUsuarios().subscribe (data =>{
      console.log(data);
      this.usuarios = data;
    })
  }

  // Función para agregar un nuevo elemento basado en los datos del formulario
  agregarElemento(): void {
    
    // Crear el objeto JSON con los datos introducidos por el usuario
    const usuarioJSON = { ...this.postUsuario };
    console.log('Enviando datos a la API:', usuarioJSON); 

    /*this.http.post(this.apiUrl, usuario)
      .subscribe(response => {
        console.log('Respuesta de la API:', response);
      });*/

      this.userService.postUsuario(usuarioJSON).subscribe(response => {
        console.log('Usuario agregado:', response);
      }),

    // Añadir el nuevo usuario a la lista
      this.newusuario.push(usuarioJSON);
      this.desplegado.push(false); // Añadir estado para el desplegable
      
    this.getUsuario = {
      _id: '',
      //id: 0,
      name: '',
      mail: '',
      password: '',
      comment: ''
      }
    

   
  }
  eliminarElemento(index: number): void {
    const usuarioId = this.usuarios[index]._id;
    this.userService.getUsuarios().subscribe (data =>{
      console.log(data);
      this.usuarios = data;
    })

    // Llamar al servicio para eliminar el usuario
    this.userService.deleteUsuario(usuarioId).subscribe(() => {
      console.log(`Usuario con ID ${usuarioId} eliminado`);

      // Eliminar el usuario de la lista localmente
      this.usuarios.splice(index, 1);
      this.desplegado.splice(index, 1);
    });
  }

  // Función para eliminar un elemento de la lista
  /*eliminarElemento(index: number): void {
    this.usuarios.splice(index, 1);
    this.desplegado.splice(index, 1);
    
  }
  
  /*eliminarElemento(usuario: any): void {
    this.usuarios.splice(usuario, 1);
    this.desplegado.splice(usuario, 1);
    console.log(usuario);

    this.http.delete('http://localhost:3000/api/user/'+ usuario._id, usuario)
      .subscribe(response => {
        console.log('Respuesta de la API:', response);
      });
    
  }*/
  
  // Función para alternar la visualización del desplegable
  toggleDesplegable(index: number): void {
    this.desplegado[index] = !this.desplegado[index];
  }
}
  

