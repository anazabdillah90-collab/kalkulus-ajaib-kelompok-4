export enum CalculatorMode {
  LIMIT = 'Limit Fungsi',
  DERIVATIVE = 'Turunan',
  AREA = 'Luas Daerah',
  VOLUME = 'Volume Benda Putar'
}

export enum MaterialTopic {
  REAL_NUMBERS = 'Sistem Bilangan Real',
  TRIGONOMETRY = 'Trigonometri',
  LIMIT_CONCEPT = 'Konsep Limit',
  DIFFERENTIAL = 'Turunan Diferensial',
  INTEGRAL = 'Integral Tentu',
  VOLUME_CONCEPT = 'Konsep Volume'
}

export interface CalculationResult {
  finalAnswer: string;
  steps: string[];
  graphData?: { x: number; y: number; y2?: number }[];
  explanation: string;
}

export type ViewState = 'HOME' | 'CALCULATOR' | 'MATERIAL';

export interface TeamMember {
  name: string;
  id: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  { name: 'Anas Abdillah', id: '2500087' },
  { name: 'Intan Fadilla', id: '2501099' },
  { name: 'Luthfi Yusran Fadhilah', id: '2501862' },
  { name: 'Saskia Kirana', id: '2501174' }
];