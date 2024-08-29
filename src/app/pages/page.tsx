'use client';

import { useState, useEffect } from 'react';
import EmpleadoTable from '../../components/EmpleadoTable';
import { Empleado } from '../../types/Empleado';
import { calcularCalificacionYSalario } from '../../utils/calculos';
import ModalFormXl from '../../components/modalRespon';

import './globals.css';

const HomePage = () => {
    const [empleados, setEmpleados] = useState<Empleado[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        fetch('/data/empleados.json')
            .then((response) => response.json())
            .then((data) => {
                const empleadosConCalculos = data.empleados.map((empleado: Empleado) =>
                    calcularCalificacionYSalario(empleado)
                );
                setEmpleados(empleadosConCalculos);
            })
            .catch((error) => console.error('Error loading JSON:', error));
    }, []);

    return (
        <>
            <div>
                <h1>Sistema Experto de Calificación de Empleados</h1>
                <EmpleadoTable
                    empleados={empleados}
                    setEmpleados={setEmpleados}
                />
            </div>
            <div>
                <h1>My App</h1>
            </div>
        </>
    );
};

export default HomePage;
