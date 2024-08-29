import { Empleado, Tarea, Modulo, Proyecto } from '../types/Empleado';

const SUELDO_BASE = 250000;
const HORAS_TOTALES = 160;

// Función para calcular la proactividad con ajuste logarítmico
export const calcularProactividad = (items: string[]): number => {
  const itemsPuntajes: Record<string, number> = {
    'Horas Extras Voluntarias': 1.2,
    'Manejo de Crisis': 1.5,
    'Desarrollo de Módulo Urgente': 1.4,
    'Participación en Proyectos Clave': 1.5,
    'Asistencia a Reuniones Estratégicas': 1.2,
    'Mentoría y Apoyo a Compañeros': 1.1,
    'Capacitación de Emergencia': 1.3,
    'Documentación y Mejora de Procesos': 1.3,
    'Innovación y Propuestas': 1.2,
    'Liderazgo en Implementación de Cambios': 1.4,
  };

  let proactividad = items.reduce((total, item) => total + (itemsPuntajes[item] || 0), 0);

  // Aplicar ajuste logarítmico si la proactividad supera el umbral de 3
  const umbralProactividad = 4;
  if (proactividad > umbralProactividad) {
    proactividad = umbralProactividad + Math.log2(1 + (proactividad - umbralProactividad));
  }

  return Math.round(proactividad * 100) / 100; // Limitar a 2 decimales
};

// Función para calcular las responsabilidades con ajuste logarítmico
export const calcularResponsabilidades = (tareas: Tarea[], modulos: Modulo[], proyectos: Proyecto[]): number => {
  const matrizPesos = {
    bajo: { tareas: 0.1, modulos: 0.3, proyectos: 0.5 },
    medio: { tareas: 0.2, modulos: 0.6, proyectos: 1.0 },
    alto: { tareas: 0.3, modulos: 0.9, proyectos: 1.5 },
  };

  const sumaTareas = tareas.reduce((total, tarea) => total + matrizPesos[tarea.nivel].tareas * Math.min(tarea.cantidad, 5), 0);
  const sumaModulos = modulos.reduce((total, modulo) => total + matrizPesos[modulo.nivel].modulos * Math.min(modulo.cantidad, 3), 0);
  const sumaProyectos = proyectos.reduce((total, proyecto) => total + matrizPesos[proyecto.nivel].proyectos * Math.min(proyecto.cantidad, 2), 0);

  let responsabilidades = sumaTareas + sumaModulos + sumaProyectos;

  // Aplicar ajuste logarítmico si las responsabilidades superan el umbral de 5
  const umbralResponsabilidades = 6;
  if (responsabilidades > umbralResponsabilidades) {
    responsabilidades = umbralResponsabilidades + Math.log2(1 + (responsabilidades - umbralResponsabilidades));
  }

  return Math.round(responsabilidades * 100) / 100; // Limitar a 2 decimales
};

// Función para calcular la calificación y el salario con ajuste logarítmico
export const calcularCalificacionYSalario = (empleado: Empleado): Empleado => {
  const { asistencia, antiguedad, nivelEstudio, itemsProactividad, tareas, modulos, proyectos } = empleado;

  const proactividad = calcularProactividad(itemsProactividad);
  const responsabilidades = calcularResponsabilidades(tareas, modulos, proyectos);

  let calificacion =
    (asistencia / HORAS_TOTALES) * 0.30 + 
    proactividad * 0.20 +
    Math.min(antiguedad, 10) * 0.15 + // Limitar la antigüedad al umbral de 10
    nivelEstudio * 0.15 +
    responsabilidades * 0.20;

  // Aplicar ajuste logarítmico si la calificación supera el umbral de 4
  const umbralCalificacion = 4;
  if (calificacion > umbralCalificacion) {
    calificacion = umbralCalificacion + Math.log2(1 + (calificacion - umbralCalificacion));
  }
 
  const calificacionRedondeada = Math.round(calificacion * 100) / 100;
  const sueldo = `$${(calificacionRedondeada * SUELDO_BASE).toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;

  return {
   
    ...empleado,
    proactividad,
    responsabilidades,
    calificacion: calificacionRedondeada,
    sueldo,
  };
};
