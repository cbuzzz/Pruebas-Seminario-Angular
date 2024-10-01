import { Component } from '@angular/core';
import { ListaComponent } from './lista/lista.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [ListaComponent] // Importamos el componente standalone
})
export class AppComponent {
  title = 'lista-elementos';
}


