import { CloudRain, MapPinned, TriangleAlert, Waypoints } from "lucide-react";

const legendItems = [
  {
    label: "Zones",
    detail: "Approximate Marineterrein operational areas",
    icon: MapPinned,
    dotClass: "bg-teal-700",
  },
  {
    label: "Mobility",
    detail: "Telraam movement intensity by mapped area",
    icon: Waypoints,
    dotClass: "bg-emerald-600",
  },
  {
    label: "Weather",
    detail: "Live weather context markers from the unified feed",
    icon: CloudRain,
    dotClass: "bg-sky-500",
  },
  {
    label: "Warnings",
    detail: "KNMI-derived warning signals and severity",
    icon: TriangleAlert,
    dotClass: "bg-orange-500",
  },
];

export function MapLegend() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-[rgba(248,250,252,0.82)] p-4">
      <p className="text-sm font-medium text-slate-800">Map legend</p>
      <p className="mt-1 text-xs text-slate-500">Live layers are modular so later steps can add anomalies and predictions cleanly.</p>

      <div className="mt-4 space-y-3">
        {legendItems.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="flex items-start gap-3">
              <div className={`mt-1 h-2.5 w-2.5 rounded-full ${item.dotClass}`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-slate-500" />
                  <p className="text-sm font-medium text-slate-800">{item.label}</p>
                </div>
                <p className="mt-1 text-xs leading-5 text-slate-500">{item.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
