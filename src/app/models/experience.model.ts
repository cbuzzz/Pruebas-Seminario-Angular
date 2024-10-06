export interface Experience {
    /*_id?: string;   // MongoDB generarà automàticament aquest camp quan es faci servir la base de dades
    title: string;
    description: string;
    date: string;  
    userId: string; // Relació amb l'usuari que ha creat l'experiència*/ 
    owner: string,
    participants: string,
    description: string
  }