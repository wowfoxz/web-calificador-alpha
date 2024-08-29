import React, { useState, useEffect } from 'react';
import { Empleado } from '../types/Empleado';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox, FormControlLabel, Grid } from '@mui/material';
import { calcularProactividad } from '../utils/calculos'; // Importamos la función para calcular proactividad

interface Props {
  isOpen: boolean;
  onClose: () => void;
  empleado: Empleado | null;
  onSave: (updatedEmpleado: Empleado) => void;
}

const itemsProactividadList = [
  'Horas Extras Voluntarias',
  'Manejo de Crisis',
  'Desarrollo de Módulo Urgente',
  'Participación en Proyectos Clave',
  'Asistencia a Reuniones Estratégicas',
  'Mentoría y Apoyo a Compañeros',
  'Capacitación de Emergencia',
  'Documentación y Mejora de Procesos',
  'Innovación y Propuestas',
  'Liderazgo en Implementación de Cambios'
];

export const ProactividadModal: React.FC<Props> = ({ isOpen, onClose, empleado, onSave }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    if (empleado) {
      setSelectedItems(empleado.itemsProactividad);
    }
  }, [empleado]);

  const handleCheckboxChange = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleSave = () => {
    if (empleado) {
      const updatedEmpleado = {
        ...empleado,
        itemsProactividad: selectedItems,
        proactividad: calcularProactividad(selectedItems) // Recalcular la proactividad
      };

      onSave(updatedEmpleado); // Guardar los cambios
      onClose(); // Cerrar el modal
    }
  };

  if (!isOpen || !empleado) {
    return null; // No renderizar nada si el modal no está abierto o no hay empleado seleccionado
  }

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Items de Proactividad para {empleado.nombre}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {itemsProactividadList.map(item => (
            <Grid item xs={12} key={item}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedItems.includes(item)}
                    onChange={() => handleCheckboxChange(item)}
                  />
                }
                label={item}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary">Guardar</Button>
        <Button onClick={onClose} color="primary">Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProactividadModal;
