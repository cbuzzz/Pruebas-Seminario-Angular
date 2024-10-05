
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario, newUsuario} from '../modelos/usuario.model';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/api/user'; // Cambia por tu URL de la API

  constructor(private http: HttpClient) {}

  // Método para obtener los usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  //Método para añadir usuarios
  postUsuario(usuario: newUsuario): Observable<newUsuario> {
    return this.http.post<newUsuario>(this.apiUrl, usuario);
  }
  
  // Método para eliminar un usuario por su ID
  deleteUsuario(_id: string): Observable<void> {
    const url = `${this.apiUrl}/${_id}`; // URL para eliminar el usuario
    return this.http.delete<void>(url);
  }

}