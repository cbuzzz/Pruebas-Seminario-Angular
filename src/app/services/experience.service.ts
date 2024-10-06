import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Experience } from '../models/experience.model';
import { environment } from '../environments/environment';  // Importar environment

export interface ExperienceService {
  _id?: string; // ObjectId opcional per a la modificació i eliminació
  owner: string; // ObjectId del propietari
  participants: string[]; // Array d'ObjectIds dels participants
  description: string; // Descripció de l'experiència
}

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private apiURL = 'http://localhost:3000/api/experiencias'; // URL de l'API
  // s'hauria de canviar a: private apiUrl = environment.apiUrl;  // Usar apiUrl desde environment

  constructor(private http: HttpClient) {}

  // Obtenir la llista d'experiències
  getExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.apiURL);
  }

  // Crear una nova experiència
  createExperience(experience: Experience): Observable<Experience> {
    return this.http.post<Experience>(this.apiURL, experience);
  }

  // Actualitzar una experiència existent
  updateExperience(experience: Experience): Observable<Experience> {
    return this.http.put<Experience>(`${this.apiURL}/${experience._id}`, experience);
  }

  // Eliminar una experiència
  deleteExperience(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }
}
