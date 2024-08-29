export interface Tarea {
    cantidad: number;
    nivel: 'bajo' | 'medio' | 'alto';  // Definir los valores posibles
}

export interface Modulo {
    cantidad: number;
    nivel: 'bajo' | 'medio' | 'alto';
}

export interface Proyecto {
    cantidad: number;
    nivel: 'bajo' | 'medio' | 'alto';
}

  
  export interface Empleado {
    nombre: string;
    asistencia: number;
    antiguedad: number;
    nivelEstudio: number;
    itemsProactividad: string[];
    proactividad: number;
    tareas: Tarea[];
    modulos: Modulo[];
    proyectos: Proyecto[];
    responsabilidades: number;
    calificacion: number;
    sueldo: string;
  }
  