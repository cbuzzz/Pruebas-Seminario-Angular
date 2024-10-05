import { Component } from '@angular/core';
import { ListaComponent } from './lista/lista.component'; // Importar el componente

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true, // Esto convierte el componente en standalone
  imports: [ListaComponent] // Asegúrate de que esté aquí
})
export class AppComponent {
  title = 'lista-elementos';
}

