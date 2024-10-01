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
  nuevoElemento: string = '';
  desplegado: boolean[] = []; // Controla si el desplegable de cada usuario está abierto o cerrado

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Hacer la solicitud HTTP para obtener los datos completos de los usuarios
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe(data => {
        this.usuarios = data; // Guardar todos los datos de los usuarios
        this.desplegado = new Array(data.length).fill(false); // Inicializar el estado desplegado a 'false' para todos los usuarios
      });
  }

  agregarElemento(): void {
    if (this.nuevoElemento) {
      // Generar información aleatoria para los detalles del nuevo usuario
      const nuevoUsuario = {
        name: this.nuevoElemento,
        email: this.generarEmailAleatorio(this.nuevoElemento),
        phone: this.generarTelefonoAleatorio(),
        website: this.generarWebsiteAleatorio(),
        company: { name: 'Compañía ' + this.generarNumeroAleatorio() },
        address: {
          street: 'Calle ' + this.generarNumeroAleatorio(),
          city: 'Ciudad ' + this.generarNumeroAleatorio(),
          zipcode: 'CP-' + this.generarNumeroAleatorio()
        }
      };

      this.usuarios.push(nuevoUsuario); // Añadir el nuevo usuario con los detalles generados
      this.desplegado.push(false); // Añadir un nuevo desplegable para el nuevo usuario
      this.nuevoElemento = ''; // Limpiar el input
    }
  }

  eliminarElemento(index: number): void {
    this.usuarios.splice(index, 1);
    this.desplegado.splice(index, 1); // Eliminar también el estado desplegado del usuario eliminado
  }

  toggleDesplegable(index: number): void {
    this.desplegado[index] = !this.desplegado[index]; // Cambia el estado del desplegable
  }

  // Funciones auxiliares para generar datos aleatorios
  generarEmailAleatorio(nombre: string): string {
    const dominios = ['example.com', 'email.com', 'domain.net'];
    const dominio = dominios[Math.floor(Math.random() * dominios.length)];
    return `${nombre.toLowerCase()}@${dominio}`;
  }

  generarTelefonoAleatorio(): string {
    const numeros = Math.floor(Math.random() * 900000000) + 100000000;
    return `+34 ${numeros}`; // Número de teléfono en formato español
  }

  generarWebsiteAleatorio(): string {
    const webs = ['sitio1.com', 'miweb.org', 'pagina.net'];
    return webs[Math.floor(Math.random() * webs.length)];
  }

  generarNumeroAleatorio(): string {
    return Math.floor(Math.random() * 1000).toString();
  }
}
