
export type ActivityType = 
  | 'poaching'
  | 'animal-movement'
  | 'illegal-logging'
  | 'vehicle-intrusion'
  | 'fire-detection'
  | 'conservation-patrol';

export type SeverityLevel = 'low' | 'medium' | 'high';

export interface ActivityData {
  id: string;
  type: ActivityType;
  latitude: number;
  longitude: number;
  location: string;
  severity: SeverityLevel;
  timestamp: string;
  description?: string;
  confidence?: number;
}

export interface ActivityStats {
  total: number;
  byType: Record<ActivityType, number>;
  bySeverity: Record<SeverityLevel, number>;
}
