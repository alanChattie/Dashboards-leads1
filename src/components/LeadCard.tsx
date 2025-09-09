import React from 'react';
import { Lead } from '../types';
import { User, Mail, Phone, Calendar, Clock, UserCheck } from 'lucide-react';

interface LeadCardProps {
  lead: Lead;
  isNearExpiry?: boolean;
}

export const LeadCard: React.FC<LeadCardProps> = ({ lead, isNearExpiry }) => {
  const getStatusColor = (estado: string) => {
    const statusColors: { [key: string]: string } = {
      'Activo': 'bg-green-100 text-green-800 border-green-200',
      'En proceso': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Pendiente': 'bg-orange-100 text-orange-800 border-orange-200',
      'Finalizado': 'bg-gray-100 text-gray-800 border-gray-200',
      'Cancelado': 'bg-red-100 text-red-800 border-red-200'
    };
    return statusColors[estado] || 'bg-blue-100 text-blue-800 border-blue-200';
  };

  const getTableroColor = (tablero: number) => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500'];
    return colors[(tablero - 1) % colors.length] || 'bg-gray-500';
  };

  const formatDate = (dateStr: string) => {
    try {
      // Parsear la fecha en formato DD/MM/YYYY o YYYY-MM-DD
      let date: Date;
      if (dateStr.includes('/')) {
        const [day, month, year] = dateStr.split('/');
        date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      } else {
        date = new Date(dateStr);
      }
      
      if (isNaN(date.getTime())) {
        return dateStr; // Si no se puede parsear, devolver el string original
      }
      
      return date.toLocaleDateString('es-ES');
    } catch {
      return dateStr;
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 border-l-4 transition-all duration-200 hover:shadow-lg ${
      isNearExpiry ? 'border-l-red-500 bg-red-50' : 'border-l-blue-500'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4 text-gray-400" />
          <h3 className="font-semibold text-gray-800">{lead.nombre}</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(lead.estado)}`}>
            {lead.estado}
          </span>
          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold ${getTableroColor(lead.tablero)}`}>
            {lead.tablero}
          </span>
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Mail className="h-4 w-4 text-gray-400" />
          <span>{lead.email}</span>
        </div>
        
        {lead.tel && (
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-gray-400" />
            <span>{lead.tel}</span>
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <span>Tiempo: {lead.tiempo}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className={isNearExpiry ? 'text-red-600 font-medium' : ''}>
            Finaliza: {formatDate(lead.finalizaDia)}
          </span>
        </div>
        
        {lead.vendedor && (
          <div className="flex items-center space-x-2">
            <UserCheck className="h-4 w-4 text-gray-400" />
            <span>Vendedor: {lead.vendedor}</span>
          </div>
        )}
      </div>
    </div>
  );
};