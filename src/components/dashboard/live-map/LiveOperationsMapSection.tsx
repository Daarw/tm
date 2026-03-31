import { useMemo, useState } from "react";
import { DatabaseZap, LoaderCircle, Map, RefreshCw } from "lucide-react";
import { useOpsLiveData } from "../../../hooks/useOpsLiveData";
import { Card, CardContent, CardHeader, Pill, SectionTitle } from "../ui";
import { LayerToggles } from "./LayerToggles";
import { OperationsMapCanvas } from "./OperationsMapCanvas";
import { SpatialSummaryPanel } from "./SpatialSummaryPanel";
import {
  buildMobilityPoints,
  buildSpatialSummary,
  buildWarningPoints,
  buildWeatherPoints,
  buildZoneFeatures,
  formatTimestamp,
  getStatusTone,
} from "./opsMapTransforms";
import type { LayerVisibility } from "./types";

const DEFAULT_VISIBILITY: LayerVisibility = {
  mobility: true,
  zones: true,
  weather: true,
  warnings: true,
  labels: true,
};

export function LiveOperationsMapSection() {
  const [visibility, setVisibility] = useState<LayerVisibility>(DEFAULT_VISIBILITY);
  const { overview, health, loading, error } = useOpsLiveData();

  const zones = useMemo(() => buildZoneFeatures(overview.records), [overview.records]);
  const mobilityPoints = useMemo(() => buildMobilityPoints(overview.records), [overview.records]);
  const weatherPoints = useMemo(() => buildWeatherPoints(overview.records), [overview.records]);
  const warningPoints = useMemo(() => buildWarningPoints(overview.records), [overview.records]);
  const spatialSummary = useMemo(() => buildSpatialSummary(overview), [overview]);

  function toggleLayer(key: keyof LayerVisibility) {
    setVisibility((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  const hasLiveData = overview.records.length > 0;
  const sourceChips = health ? Object.entries(health.sources) : [];

  return (
    <Card className="overflow-hidden border-emerald-100/90">
      <CardHeader className="pb-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <SectionTitle
            title="Live operations map"
            subtitle="Primary spatial layer for Marineterrein operations, driven by the unified live ops feed and ready for future alerts and anomaly overlays."
          />

          <div className="flex flex-wrap items-center gap-2">
            <Pill tone={getStatusTone(health?.status || "error")}>{health?.status || "loading"}</Pill>
            <Pill tone={hasLiveData ? "emerald" : "slate"}>
              {hasLiveData ? `${overview.records.length} live records` : "No live records yet"}
            </Pill>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500">
              <RefreshCw className="h-3.5 w-3.5" />
              refresh every 5 min
            </span>
          </div>
        </div>

        <div className="mt-4 grid gap-3 xl:grid-cols-[1fr_auto] xl:items-start">
          <div className="space-y-3">
            <LayerToggles visibility={visibility} onChange={toggleLayer} />
            <div className="flex flex-wrap gap-2">
              {sourceChips.map(([sourceName, source]) => (
                <span
                  key={sourceName}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-[rgba(255,255,255,0.72)] px-3 py-2 text-xs text-slate-600"
                >
                  <DatabaseZap className="h-3.5 w-3.5" />
                  <span className="capitalize">{sourceName}</span>
                  <Pill tone={getStatusTone(source.status)}>{source.status}</Pill>
                  <span>{source.recordCount} records</span>
                </span>
              ))}
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50/80 px-4 py-2 text-sm text-emerald-900">
            <Map className="h-4 w-4" />
            Spatial overview synced {formatTimestamp(overview.generatedAt || null)}
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid gap-6 xl:grid-cols-[1.45fr_0.75fr]">
        <div className="space-y-3">
          <div className="relative">
            <OperationsMapCanvas
              visibility={visibility}
              zones={zones}
              mobilityPoints={mobilityPoints}
              weatherPoints={weatherPoints}
              warningPoints={warningPoints}
            />

            {loading ? (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-[28px] bg-white/35 backdrop-blur-[2px]">
                <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-600 shadow-sm">
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                  Loading live map layers...
                </div>
              </div>
            ) : null}
          </div>

          {error ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              {error}
            </div>
          ) : !hasLiveData ? (
            <div className="rounded-2xl border border-slate-200 bg-[rgba(248,250,252,0.82)] px-4 py-3 text-sm text-slate-600">
              Live source records are currently empty, so the map is showing Marineterrein zone structure and source
              health context while upstream feeds recover.
            </div>
          ) : null}
        </div>

        <SpatialSummaryPanel summary={spatialSummary} health={health} />
      </CardContent>
    </Card>
  );
}
