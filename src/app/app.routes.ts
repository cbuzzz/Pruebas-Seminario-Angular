import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { ExperienceComponent } from './experience/experience.component';

export const routes: Routes = [
    { path: 'user', component: ListaComponent }, //ruta per la llista d'usuaris
    { path: 'experiencias', component: ExperienceComponent} //ruta per les experiències
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}
