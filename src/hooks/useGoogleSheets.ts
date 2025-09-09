import { useState, useEffect } from 'react';
import { Lead } from '../types';

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1D4ToRyWCogs1K4_YY7qdWi89uABzw3RJ4_LTaCDGz1A/export?format=csv';

export const useGoogleSheets = () => {
  const [data, setData] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const parseCSV = (csvText: string): Lead[] => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    
    return lines.slice(1)
      .filter(line => line.trim())
      .map(line => {
        const values = line.split(',');
        return {
          nombre: values[0]?.replace(/"/g, '') || '',
          email: values[1]?.replace(/"/g, '') || '',
          tel: values[2]?.replace(/"/g, '') || undefined,
          tablero: parseInt(values[3]?.replace(/"/g, '') || '1'),
          estado: values[4]?.replace(/"/g, '') || '',
          tiempo: values[5]?.replace(/"/g, '') || '',
          finalizaDia: values[6]?.replace(/"/g, '') || '',
          vendedor: values[7]?.replace(/"/g, '') || undefined,
        };
      })
      .filter(lead => lead.nombre && lead.email);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(SHEET_CSV_URL);
      
      if (!response.ok) {
        throw new Error('Error al cargar los datos');
      }
      
      const csvText = await response.text();
      const parsedData = parseCSV(csvText).filter(lead => {
        // Filtrar solo vendedores válidos
        const validVendors = ['Daniela', 'Alan'];
        return !lead.vendedor || validVendors.includes(lead.vendedor);
      });
      setData(parsedData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      // Datos de ejemplo para desarrollo
      setData([
        {
          nombre: 'Juan Pérez',
          email: 'juan@example.com',
          tel: '123456789',
          tablero: 1,
          estado: 'Activo',
          tiempo: '6 meses',
          finalizaDia: '2025-01-15'
        },
        {
          nombre: 'María García',
          email: 'maria@example.com',
          tablero: 2,
          estado: 'En proceso',
          tiempo: '3 meses',
          finalizaDia: '2025-01-18'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};