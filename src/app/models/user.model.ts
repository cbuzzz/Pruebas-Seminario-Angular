export interface User {
  _id?: string;      // MongoDB genera automáticamente este campo al insertar
  name: string;
  password: string;
  comment: string;    // Este campo es la "Biografía"
}

  
  