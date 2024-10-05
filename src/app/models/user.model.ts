export interface User {
  _id?: string;      // MongoDB genera automáticamente este campo al insertar
  name: string;
  email: string;     // Añadir el campo email
  password: string;
  comment: string;    // Este campo es la "Biografía"
}


  
  