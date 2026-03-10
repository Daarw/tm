import {
  Activity,
  Camera,
  Droplets,
  Lamp,
  Router,
  ShieldAlert,
  Users,
  Volume2,
  Waves,
} from "lucide-react";
import type {
  AccessPoint,
  AlertItem,
  AnomalyItem,
  CrowdZone,
  DailyTrendPoint,
  InfrastructureItem,
  Kpi,
  ModalityPoint,
  SensorHealthItem,
  TrendPoint,
} from "../components/dashboard/types";

export const zones = [
  { id: "harbor-edge", name: "Harbor Edge" },
  { id: "central-plaza", name: "Central Plaza" },
  { id: "swim-dock", name: "Swim Dock" },
  { id: "makers-court", name: "Makers Court" },
];

export const sensorCategories = [
  "All categories",
  "Crowd & Footfall",
  "Mobility & Access",
  "Environmental Conditions",
  "Water & Recreation",
  "Public Infrastructure",
  "Safety & Monitoring",
];

export const severityOptions = ["All severities", "info", "warning", "critical"];
export const timeRangeOptions = ["Last 30 min", "Last 2 hrs", "Today"];
export const modeOptions = ["Live", "Historical", "Incident mode"];

export const alertsData: AlertItem[] = [
  {
    id: 1,
    severity: "warning",
    title: "Swim dock nearing soft capacity",
    zone: "Swim Dock",
    source: "Swim Counter",
    time: "10:22",
    detail: "74 active swimmers vs soft threshold of 80. Staff visibility recommended.",
  },
  {
    id: 2,
    severity: "warning",
    title: "Environmental sound spike detected",
    zone: "Central Plaza",
    source: "Environmental Sound Meter",
    time: "10:18",
    detail: "Sound level reached 76 dB for 6 minutes. Event or crowd build-up likely.",
  },
  {
    id: 3,
    severity: "info",
    title: "Pedestrian inflow trending upward",
    zone: "Harbor Edge",
    source: "Pedestrian Traffic Monitor",
    time: "10:15",
    detail: "Footfall up 18% vs previous 30-minute window.",
  },
  {
    id: 4,
    severity: "critical",
    title: "CCTV shutter feed offline",
    zone: "Makers Court",
    source: "CCTV Shutter",
    time: "10:08",
    detail: "No image heartbeat for 9 minutes. Investigate device power or network.",
  },
];

export const kpis: Kpi[] = [
  {
    label: "Live visitors",
    value: "612",
    delta: "+8.4%",
    trend: "up",
    helper: "vs previous hour",
    icon: Users,
  },
  {
    label: "Active alerts",
    value: "4",
    delta: "+1",
    trend: "up",
    helper: "1 critical, 2 warning",
    icon: ShieldAlert,
  },
  {
    label: "Avg. sound level",
    value: "68 dB",
    delta: "+4 dB",
    trend: "up",
    helper: "site-wide rolling 15 min",
    icon: Volume2,
  },
  {
    label: "Healthy sensors",
    value: "12 / 14",
    delta: "-1",
    trend: "down",
    helper: "1 degraded, 1 offline",
    icon: Activity,
  },
  {
    label: "Water temperature",
    value: "19.1°C",
    delta: "+0.6°C",
    trend: "up",
    helper: "comfortable recreational range",
    icon: Waves,
  },
];

export const crowdByZone: CrowdZone[] = [
  { zone: "Harbor Edge", visitors: 138, density: 61, status: "stable" },
  { zone: "Central Plaza", visitors: 214, density: 82, status: "busy" },
  { zone: "Swim Dock", visitors: 167, density: 74, status: "watch" },
  { zone: "Makers Court", visitors: 93, density: 38, status: "calm" },
];

export const pedestrianTrend: TrendPoint[] = [
  { time: "09:20", flow: 64, crowd: 420, sound: 58 },
  { time: "09:30", flow: 71, crowd: 448, sound: 60 },
  { time: "09:40", flow: 76, crowd: 485, sound: 61 },
  { time: "09:50", flow: 82, crowd: 516, sound: 64 },
  { time: "10:00", flow: 88, crowd: 544, sound: 66 },
  { time: "10:10", flow: 93, crowd: 583, sound: 70 },
  { time: "10:20", flow: 97, crowd: 612, sound: 68 },
];

export const modalitySplit: ModalityPoint[] = [
  { name: "Pedestrian", value: 61 },
  { name: "Bike", value: 23 },
  { name: "Service Vehicle", value: 9 },
  { name: "Other", value: 7 },
];

export const accessActivity: AccessPoint[] = [
  { time: "09:20", access: 18, vehicles: 4 },
  { time: "09:40", access: 22, vehicles: 7 },
  { time: "10:00", access: 27, vehicles: 6 },
  { time: "10:20", access: 35, vehicles: 9 },
];

export const sensorHealth: SensorHealthItem[] = [
  {
    sensor: "Digital Kiosk",
    category: "Public Infrastructure",
    status: "healthy",
    zone: "Central Plaza",
  },
  {
    sensor: "Urban Sound Classification",
    category: "Environmental Conditions",
    status: "healthy",
    zone: "Central Plaza",
  },
  {
    sensor: "Pedestrian Traffic Monitor",
    category: "Crowd & Footfall",
    status: "healthy",
    zone: "Harbor Edge",
  },
  {
    sensor: "RFID & License Plate Scanner",
    category: "Mobility & Access",
    status: "healthy",
    zone: "Harbor Edge",
  },
  {
    sensor: "Public Sensor Signage",
    category: "Public Infrastructure",
    status: "healthy",
    zone: "Central Plaza",
  },
  {
    sensor: "Modality Counter",
    category: "Mobility & Access",
    status: "healthy",
    zone: "Harbor Edge",
  },
  {
    sensor: "Crowd Size Monitor",
    category: "Crowd & Footfall",
    status: "healthy",
    zone: "Central Plaza",
  },
  {
    sensor: "Environmental Sound Meter",
    category: "Environmental Conditions",
    status: "degraded",
    zone: "Central Plaza",
  },
  {
    sensor: "Smart Street Lights",
    category: "Public Infrastructure",
    status: "healthy",
    zone: "Central Plaza",
  },
  {
    sensor: "Water Temperature",
    category: "Water & Recreation",
    status: "healthy",
    zone: "Swim Dock",
  },
  {
    sensor: "RFID Sensor & Microphone",
    category: "Safety & Monitoring",
    status: "healthy",
    zone: "Makers Court",
  },
  {
    sensor: "CCTV Shutter",
    category: "Safety & Monitoring",
    status: "offline",
    zone: "Makers Court",
  },
  {
    sensor: "Swim Counter",
    category: "Water & Recreation",
    status: "healthy",
    zone: "Swim Dock",
  },
  {
    sensor: "Picnic Counter",
    category: "Crowd & Footfall",
    status: "healthy",
    zone: "Harbor Edge",
  },
];

export const dailyTrend: DailyTrendPoint[] = [
  { day: "Mon", visitors: 4200, alerts: 3, avgNoise: 61 },
  { day: "Tue", visitors: 4460, alerts: 4, avgNoise: 62 },
  { day: "Wed", visitors: 4330, alerts: 2, avgNoise: 60 },
  { day: "Thu", visitors: 4720, alerts: 5, avgNoise: 64 },
  { day: "Fri", visitors: 4890, alerts: 4, avgNoise: 65 },
  { day: "Sat", visitors: 5380, alerts: 6, avgNoise: 69 },
  { day: "Sun", visitors: 5010, alerts: 4, avgNoise: 66 },
];

export const infrastructureStatus: InfrastructureItem[] = [
  {
    label: "Street lights online",
    value: "98%",
    note: "1 lamp group in maintenance window",
    icon: Lamp,
  },
  {
    label: "Digital signage uptime",
    value: "100%",
    note: "No kiosk faults in current shift",
    icon: Router,
  },
  {
    label: "Camera network",
    value: "93%",
    note: "1 CCTV node offline in Makers Court",
    icon: Camera,
  },
];

export const anomalyPanel: AnomalyItem[] = [
  {
    title: "Noise / crowd divergence",
    description:
      "Central Plaza sound levels rose faster than crowd density, suggesting localized activity rather than site-wide load.",
    confidence: "moderate",
  },
  {
    title: "Access spike",
    description:
      "Harbor Edge access events increased 30% in the latest interval but stayed within expected morning delivery pattern.",
    confidence: "low",
  },
  {
    title: "Recreation build-up",
    description:
      "Swim Dock occupancy is increasing while water temperature remains favorable. Expect continued inflow over the next hour.",
    confidence: "high",
  },
];

export const widgetIcons = {
  droplet: Droplets,
};