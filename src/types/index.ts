export interface Lead {
  nombre: string;
  email: string;
  tel?: string;
  tablero: number;
  estado: string;
  tiempo: string;
  finalizaDia: string;
  vendedor?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface TableroStats {
  tablero: number;
  count: number;
  color: string;
}