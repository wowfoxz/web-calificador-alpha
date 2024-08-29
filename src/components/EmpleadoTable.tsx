import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Empleado } from '../types/Empleado';
import { ColDef } from 'ag-grid-community';
import ModalFormXl from './modalRespon';
import ProactividadModal from './ProactividadModal';
import { calcularCalificacionYSalario } from '../utils/calculos';

interface EmpleadoTableProps {
  empleados: Empleado[];
  setEmpleados: React.Dispatch<React.SetStateAction<Empleado[]>>;
}

const EmpleadoTable: React.FC<EmpleadoTableProps> = ({ empleados, setEmpleados }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProactividadModalOpen, setIsProactividadModalOpen] = useState(false);
  const [currentEmpleado, setCurrentEmpleado] = useState<Empleado | null>(null);

  const openModal = (empleado: Empleado) => {
    setCurrentEmpleado(empleado);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const openProactividadModal = (empleado: Empleado) => {
    setCurrentEmpleado(empleado);
    setIsProactividadModalOpen(true);
  };

  const closeProactividadModal = () => setIsProactividadModalOpen(false);

  const handleSave = (updatedEmpleado: Empleado) => {
    const updatedEmpleadoWithCalculations = calcularCalificacionYSalario(updatedEmpleado);
    const updatedEmpleados = empleados.map(emp =>
      emp.nombre === updatedEmpleadoWithCalculations.nombre ? updatedEmpleadoWithCalculations : emp
    );

    setEmpleados(updatedEmpleados);
  };

  const [columnDefs] = useState<ColDef[]>([
    { headerName: 'Nombre', field: 'nombre' },
    { headerName: 'Asistencia', field: 'asistencia' },
    { headerName: 'Antigüedad (años)', field: 'antiguedad' },
    { headerName: 'Nivel de Estudio', field: 'nivelEstudio' },
    { 
      headerName: 'Proactividad', 
      field: 'proactividad',
      cellRenderer: (row: any) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {row.value.toFixed(2)}
          <button onClick={() => openProactividadModal(row.data)} style={{ border: 'none', marginLeft: '8px' }}>+</button>
        </div>
      )
    },
    {
      headerName: 'Responsabilidades',
      field: 'responsabilidades',
      cellRenderer: (row: any) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {row.value}
            <button onClick={() => openModal(row.data)} style={{ border: 'none', marginLeft: '8px' }}>+</button>
          </div>
        );
      },
    },
    {
      headerName: 'Calificación',
      field: 'calificacion',
      valueFormatter: (params) => params.value.toFixed(2),
    },
    { headerName: 'Sueldo', field: 'sueldo' },
  ]);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        rowData={empleados}
        columnDefs={columnDefs}
        domLayout="autoHeight"
        onCellValueChanged={(event) => {
          const rowIndex = event.node?.rowIndex;

          if (rowIndex !== null && rowIndex !== undefined) {
            const updatedEmpleados = [...empleados];

            if (event.colDef.field === 'itemsProactividad') {
              updatedEmpleados[rowIndex] = {
                ...updatedEmpleados[rowIndex],
                [event.colDef.field!]: event.newValue.split(',').map((item: string) => item.trim()),
              };
            } else {
              updatedEmpleados[rowIndex] = {
                ...updatedEmpleados[rowIndex],
                [event.colDef.field!]: event.newValue,
              };
            }

            setEmpleados(updatedEmpleados);
          }
        }}
      />
      {currentEmpleado && (
        <ModalFormXl
          isOpen={isModalOpen}
          onClose={closeModal}
          empleado={currentEmpleado}
          onSave={handleSave}
        />
      )}
      {currentEmpleado && (
        <ProactividadModal
          isOpen={isProactividadModalOpen}
          onClose={closeProactividadModal}
          empleado={currentEmpleado}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default EmpleadoTable;
