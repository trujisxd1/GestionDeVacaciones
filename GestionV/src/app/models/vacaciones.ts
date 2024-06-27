import { User } from "./user"

// vacaciones.ts
export class Vacaciones {
  id!: number;
  fechaInicio!: string;
  fechaFin!: string;
  estado!: string;
  periodo!: string;
  diasSolicitados!: number;
  diasRestantes!: number;
  user!: { id: number }; // Solo necesitas el ID del usuario para enviar al backend
}
