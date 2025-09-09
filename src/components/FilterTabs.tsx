import React from 'react';
import { ChevronDown, X } from 'lucide-react';

interface FilterTabsProps {
  activeFilter: number | null;
  onChange: (filter: number | null) => void;
  counts: { [key: number]: number };
  activeStatusFilter: string | null;
  onStatusFilterChange: (status: string | null) => void;
  statusCounts: { [key: string]: number };
  availableStatuses: string[];
  activeVendorFilter: string | null;
  onVendorFilterChange: (vendor: string | null) => void;
  vendorCounts: { [key: string]: number };
  availableVendors: string[];
}

export const FilterTabs: React.FC<FilterTabsProps> = ({ 
  activeFilter, 
  onChange, 
  counts, 
  activeStatusFilter, 
  onStatusFilterChange, 
  statusCounts,
  availableStatuses,
  activeVendorFilter,
  onVendorFilterChange,
  vendorCounts,
  availableVendors
}) => {
  const tableroOptions = [
    { label: 'Todos los tableros', value: null },
    { label: 'Tablero 1', value: 1 },
    { label: 'Tablero 2', value: 2 },
    { label: 'Tablero 3', value: 3 },
  ];

  const statusOptions = [
    { label: 'Todos los estados', value: null },
    ...availableStatuses.map(status => ({
      label: status,
      value: status
    }))
  ];

  const vendorOptions = [
    { label: 'Todos los vendedores', value: null },
    ...availableVendors.map(vendor => ({
      label: vendor,
      value: vendor
    }))
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Filtro por Tablero */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por Tablero</label>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <select
              value={activeFilter || ''}
              onChange={(e) => onChange(e.target.value ? parseInt(e.target.value) : null)}
              className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer hover:border-gray-400"
            >
              {tableroOptions.map((option) => (
                <option key={option.label} value={option.value || ''}>
                  {option.label}
                  {option.value !== null && counts[option.value] ? ` (${counts[option.value]})` : ''}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
          {activeFilter !== null && (
            <button
              onClick={() => onChange(null)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Limpiar filtro de tablero"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filtro por Estado */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por Estado</label>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <select
              value={activeStatusFilter || ''}
              onChange={(e) => onStatusFilterChange(e.target.value || null)}
              className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 cursor-pointer hover:border-gray-400"
            >
              {statusOptions.map((option) => (
                <option key={option.label} value={option.value || ''}>
                  {option.label}
                  {option.value !== null && statusCounts[option.value] ? ` (${statusCounts[option.value]})` : ''}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
          {activeStatusFilter !== null && (
            <button
              onClick={() => onStatusFilterChange(null)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Limpiar filtro de estado"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filtro por Vendedor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por Vendedor</label>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <select
              value={activeVendorFilter || ''}
              onChange={(e) => onVendorFilterChange(e.target.value || null)}
              className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 cursor-pointer hover:border-gray-400"
            >
              {vendorOptions.map((option) => (
                <option key={option.label} value={option.value || ''}>
                  {option.label}
                  {option.value !== null && vendorCounts[option.value] ? ` (${vendorCounts[option.value]})` : ''}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
          {activeVendorFilter !== null && (
            <button
              onClick={() => onVendorFilterChange(null)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Limpiar filtro de vendedor"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};