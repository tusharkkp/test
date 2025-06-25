
import { ActivityType, ActivityData, SeverityLevel } from '@/types/forestActivity';

const FOREST_LOCATIONS = [
  { name: "Jim Corbett National Park", lat: 29.5331, lng: 78.9433 },
  { name: "Kaziranga National Park", lat: 26.2006, lng: 92.9376 },
  { name: "Bandhavgarh National Park", lat: 23.7197, lng: 81.0363 },
  { name: "Kanha National Park", lat: 22.2734, lng: 80.6109 },
  { name: "Sundarbans National Park", lat: 21.9497, lng: 88.4343 },
  { name: "Ranthambore National Park", lat: 26.0173, lng: 76.5026 },
  { name: "Periyar National Park", lat: 9.4611, lng: 77.2411 },
  { name: "Nagarhole National Park", lat: 12.1000, lng: 76.1167 },
  { name: "Tadoba National Park", lat: 20.2139, lng: 79.3667 },
  { name: "Pench National Park", lat: 21.6425, lng: 79.2956 }
];

const ACTIVITY_TYPES: ActivityType[] = [
  'poaching',
  'animal-movement',
  'illegal-logging',
  'vehicle-intrusion',
  'fire-detection',
  'conservation-patrol'
];

const SEVERITY_LEVELS: SeverityLevel[] = ['low', 'medium', 'high'];

const ACTIVITY_DESCRIPTIONS = {
  'poaching': [
    'Suspicious human activity detected near tiger habitat',
    'Snare traps found in elephant corridor',
    'Illegal hunting equipment discovered',
    'Poacher camp detected by thermal imaging'
  ],
  'animal-movement': [
    'Tiger spotted crossing territorial boundary',
    'Elephant herd moving towards village',
    'Leopard tracking through forest corridor',
    'Deer migration pattern detected'
  ],
  'illegal-logging': [
    'Chainsaw sounds detected in protected area',
    'Illegal timber cutting operation found',
    'Unauthorized vehicle in logging zone',
    'Fresh tree cutting marks discovered'
  ],
  'vehicle-intrusion': [
    'Unauthorized vehicle detected in core area',
    'Motorbike spotted on forest trail',
    'Truck movement in restricted zone',
    'All-terrain vehicle in sensitive habitat'
  ],
  'fire-detection': [
    'Smoke plume detected by satellite',
    'Temperature spike in forest area',
    'Fire outbreak near wildlife habitat',
    'Controlled burn operation monitoring'
  ],
  'conservation-patrol': [
    'Forest guard patrol completed',
    'Anti-poaching unit deployment',
    'Wildlife monitoring checkpoint',
    'Conservation team field survey'
  ]
};

function generateRandomId(): string {
  return `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomLocation() {
  const location = getRandomElement(FOREST_LOCATIONS);
  // Add some random offset to create variety within the area
  const latOffset = (Math.random() - 0.5) * 0.5; // ±0.25 degrees
  const lngOffset = (Math.random() - 0.5) * 0.5;
  
  return {
    name: location.name,
    lat: location.lat + latOffset,
    lng: location.lng + lngOffset
  };
}

function generateTimestamp(): string {
  // Generate timestamps within the last 24 hours
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const randomTime = new Date(oneDayAgo.getTime() + Math.random() * (now.getTime() - oneDayAgo.getTime()));
  return randomTime.toISOString();
}

function generateConfidence(): number {
  // Generate confidence between 0.7 and 0.98
  return 0.7 + Math.random() * 0.28;
}

export function generateMockForestActivity(count: number): ActivityData[] {
  const activities: ActivityData[] = [];

  for (let i = 0; i < count; i++) {
    const type = getRandomElement(ACTIVITY_TYPES);
    const severity = getRandomElement(SEVERITY_LEVELS);
    const location = getRandomLocation();
    const descriptions = ACTIVITY_DESCRIPTIONS[type];
    
    const activity: ActivityData = {
      id: generateRandomId(),
      type,
      latitude: location.lat,
      longitude: location.lng,
      location: location.name,
      severity,
      timestamp: generateTimestamp(),
      description: getRandomElement(descriptions),
      confidence: generateConfidence()
    };

    activities.push(activity);
  }

  return activities;
}

export function generateRealTimeActivity(): ActivityData {
  return generateMockForestActivity(1)[0];
}

export function getActivityStats(activities: ActivityData[]) {
  const stats = {
    total: activities.length,
    byType: {} as Record<ActivityType, number>,
    bySeverity: {} as Record<SeverityLevel, number>
  };

  // Initialize counters
  ACTIVITY_TYPES.forEach(type => {
    stats.byType[type] = 0;
  });
  
  SEVERITY_LEVELS.forEach(severity => {
    stats.bySeverity[severity] = 0;
  });

  // Count activities
  activities.forEach(activity => {
    stats.byType[activity.type]++;
    stats.bySeverity[activity.severity]++;
  });

  return stats;
}
