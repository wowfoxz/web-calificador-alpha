import React, { useState, useEffect, ChangeEvent } from 'react';
import { Empleado, Tarea, Modulo, Proyecto } from '../types/Empleado';
import { calcularResponsabilidades } from '../utils/calculos';  // Importar la función de cálculo
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, Typography, Divider } from '@mui/material';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  empleado: Empleado | null;
  onSave: (updatedEmpleado: Empleado) => void; // Añadimos la función onSave para guardar los cambios
}

export const ModalFormXl: React.FC<Props> = ({ isOpen, onClose, empleado, onSave }) => {
  const [tareas, setTareas] = useState<Tarea[]>([
    { cantidad: 0, nivel: 'alto' },
    { cantidad: 0, nivel: 'medio' },
    { cantidad: 0, nivel: 'bajo' },
  ]);
  const [modulos, setModulos] = useState<Modulo[]>([
    { cantidad: 0, nivel: 'alto' },
    { cantidad: 0, nivel: 'medio' },
    { cantidad: 0, nivel: 'bajo' },
  ]);
  const [proyectos, setProyectos] = useState<Proyecto[]>([
    { cantidad: 0, nivel: 'alto' },
    { cantidad: 0, nivel: 'medio' },
    { cantidad: 0, nivel: 'bajo' },
  ]);

  useEffect(() => {
    if (empleado) {
      setTareas([
        { cantidad: empleado.tareas.find(t => t.nivel === 'alto')?.cantidad || 0, nivel: 'alto' },
        { cantidad: empleado.tareas.find(t => t.nivel === 'medio')?.cantidad || 0, nivel: 'medio' },
        { cantidad: empleado.tareas.find(t => t.nivel === 'bajo')?.cantidad || 0, nivel: 'bajo' },
      ]);

      setModulos([
        { cantidad: empleado.modulos.find(m => m.nivel === 'alto')?.cantidad || 0, nivel: 'alto' },
        { cantidad: empleado.modulos.find(m => m.nivel === 'medio')?.cantidad || 0, nivel: 'medio' },
        { cantidad: empleado.modulos.find(m => m.nivel === 'bajo')?.cantidad || 0, nivel: 'bajo' },
      ]);

      setProyectos([
        { cantidad: empleado.proyectos.find(p => p.nivel === 'alto')?.cantidad || 0, nivel: 'alto' },
        { cantidad: empleado.proyectos.find(p => p.nivel === 'medio')?.cantidad || 0, nivel: 'medio' },
        { cantidad: empleado.proyectos.find(p => p.nivel === 'bajo')?.cantidad || 0, nivel: 'bajo' },
      ]);
    }
  }, [empleado]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<React.SetStateAction<any>>,
    nivel: string
  ) => {
    const value = parseInt(e.target.value, 10);
    setState((prevState: any) => 
      prevState.map((item: any) =>
        item.nivel === nivel ? { ...item, cantidad: value } : item
      )
    );
  };

  const handleSave = () => {
    if (empleado) {
      const updatedEmpleado = {
        ...empleado,
        tareas,
        modulos,
        proyectos,
        responsabilidades: calcularResponsabilidades(tareas, modulos, proyectos)
      };

      onSave(updatedEmpleado); // Llamar a la función onSave para guardar el empleado actualizado
      onClose(); // Cerrar el modal después de guardar
    }
  };

  if (!isOpen || !empleado) {
    return null; // No renderizar nada si el modal no está abierto o no hay empleado seleccionado
  }

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Editar Responsabilidades de {empleado.nombre}</DialogTitle>
      <DialogContent>
      <Divider sx={{marginTop:2, marginBottom:2}}/>
        {/* Sección de Tareas */}
        <Typography variant="h6" gutterBottom>Tareas</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Complejidad</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Cantidad</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Alto</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              variant="outlined"
              fullWidth
              value={tareas.find(t => t.nivel === 'alto')?.cantidad || 0}
              onChange={(e) => handleInputChange(e, setTareas, 'alto')}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>Medio</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              variant="outlined"
              fullWidth
              value={tareas.find(t => t.nivel === 'medio')?.cantidad || 0}
              onChange={(e) => handleInputChange(e, setTareas, 'medio')}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>Bajo</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              variant="outlined"
              fullWidth
              value={tareas.find(t => t.nivel === 'bajo')?.cantidad || 0}
              onChange={(e) => handleInputChange(e, setTareas, 'bajo')}
            />
          </Grid>
        </Grid>

      <Divider sx={{marginTop:2, marginBottom:2}}/>

        {/* Sección de Módulos */}
        <Typography variant="h6" gutterBottom>Módulos</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Complejidad</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Cantidad</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Alto</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              variant="outlined"
              fullWidth
              value={modulos.find(m => m.nivel === 'alto')?.cantidad || 0}
              onChange={(e) => handleInputChange(e, setModulos, 'alto')}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>Medio</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              variant="outlined"
              fullWidth
              value={modulos.find(m => m.nivel === 'medio')?.cantidad || 0}
              onChange={(e) => handleInputChange(e, setModulos, 'medio')}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>Bajo</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              variant="outlined"
              fullWidth
              value={modulos.find(m => m.nivel === 'bajo')?.cantidad || 0}
              onChange={(e) => handleInputChange(e, setModulos, 'bajo')}
            />
          </Grid>
        </Grid>
        <Divider sx={{marginTop:2, marginBottom:2}}/>
        {/* Sección de Proyectos */}
        <Typography variant="h6" gutterBottom>Proyectos</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Complejidad</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Cantidad</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Alto</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              variant="outlined"
              fullWidth
              value={proyectos.find(p => p.nivel === 'alto')?.cantidad || 0}
              onChange={(e) => handleInputChange(e, setProyectos, 'alto')}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>Medio</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              variant="outlined"
              fullWidth
              value={proyectos.find(p => p.nivel === 'medio')?.cantidad || 0}
              onChange={(e) => handleInputChange(e, setProyectos, 'medio')}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>Bajo</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              variant="outlined"
              fullWidth
              value={proyectos.find(p => p.nivel === 'bajo')?.cantidad || 0}
              onChange={(e) => handleInputChange(e, setProyectos, 'bajo')}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary">Guardar</Button> {/* Botón de guardar */}
        <Button onClick={onClose} color="primary">Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalFormXl;
