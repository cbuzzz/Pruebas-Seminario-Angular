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
  usuarios: any[] = [];
  nuevoElemento: string = '';
  desplegado: boolean[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe(data => {
        this.usuarios = data; 
        this.desplegado = new Array(data.length).fill(false); 
      });
  }

  agregarElemento(): void {
    if (this.nuevoElemento) {
      
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

      this.usuarios.push(nuevoUsuario); 
      this.desplegado.push(false); 
      this.nuevoElemento = ''; 
    }
  }

  eliminarElemento(index: number): void {
    this.usuarios.splice(index, 1);
    this.desplegado.splice(index, 1); 
  }

  toggleDesplegable(index: number): void {
    this.desplegado[index] = !this.desplegado[index];
  }

  
  generarEmailAleatorio(nombre: string): string {
    const dominios = ['example.com', 'email.com', 'domain.net'];
    const dominio = dominios[Math.floor(Math.random() * dominios.length)];
    return `${nombre.toLowerCase()}@${dominio}`;
  }

  generarTelefonoAleatorio(): string {
    const numeros = Math.floor(Math.random() * 900000000) + 100000000;
    return `+34 ${numeros}`; 
  }

  generarWebsiteAleatorio(): string {
    const webs = ['sitio1.com', 'miweb.org', 'pagina.net'];
    return webs[Math.floor(Math.random() * webs.length)];
  }

  generarNumeroAleatorio(): string {
    return Math.floor(Math.random() * 1000).toString();
  }
}
