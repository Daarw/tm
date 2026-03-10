import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Camera,
  Clock3,
  Droplets,
  Router,
  ScanLine,
  Trees,
  Waves,
  WifiOff,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  accessActivity,
  alertsData,
  anomalyPanel,
  crowdByZone,
  dailyTrend,
  infrastructureStatus,
  kpis,
  modalitySplit,
  modeOptions,
  pedestrianTrend,
  sensorCategories,
  sensorHealth,
  severityOptions,
  timeRangeOptions,
  zones,
} from "../../data/mockDashboardData";
import { Card, CardContent, CardHeader, Pill, SectionTitle, SelectLike } from "./ui";

const badgeStyles: Record<string, string> = {
  info: "bg-emerald-100 text-emerald-800 border-emerald-200",
  warning: "bg-amber-100 text-amber-800 border-amber-200",
  critical: "bg-rose-100 text-rose-700 border-rose-200",
  healthy: "bg-emerald-100 text-emerald-800 border-emerald-200",
  degraded: "bg-lime-100 text-lime-800 border-lime-200",
  offline: "bg-rose-100 text-rose-700 border-rose-200",
};

export function OperationsDashboard() {
  const [zone, setZone] = useState("All zones");
  const [category, setCategory] = useState("All categories");
  const [severity, setSeverity] = useState("All severities");
  const [range, setRange] = useState("Last 2 hrs");
  const [mode, setMode] = useState("Live");

  const filteredAlerts = useMemo(() => {
    return alertsData.filter((item) => {
      const zoneMatch = zone === "All zones" || item.zone === zone;
      const severityMatch = severity === "All severities" || item.severity === severity;
      return zoneMatch && severityMatch;
    });
  }, [zone, severity]);

  const filteredSensorHealth = useMemo(() => {
    return sensorHealth.filter((item) => {
      const zoneMatch = zone === "All zones" || item.zone === zone;
      const categoryMatch = category === "All categories" || item.category === category;
      return zoneMatch && categoryMatch;
    });
  }, [zone, category]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16),_transparent_30%),linear-gradient(180deg,#f3fbf6_0%,#e4f3e8_52%,#edf6ee_100%)] p-6 text-slate-900 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-[30px] border border-white/80 bg-white/90 px-6 py-7 shadow-sm backdrop-blur md:px-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-[2rem]">
              Tapp Marineterrein Urban Operations Intelligence Dashboard
            </h1>
            <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">
              Unified live view of crowd dynamics, access activity, environmental conditions, and infrastructure
              health across the public space.
            </p>
          </div>
        </div>

        <div className="rounded-[30px] border border-emerald-200/90 bg-gradient-to-r from-emerald-50 via-white to-lime-50 px-6 py-6 text-slate-900 shadow-[0_18px_45px_rgba(21,128,61,0.10)] md:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-emerald-700">Operator controls</p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
                Look up a specific area, signal, or incident pattern
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use filters to narrow the dashboard to a specific zone, sensor category, alert severity, or time
                window before reviewing the live operational picture below.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 px-4 py-3 text-sm text-slate-700">
              <span className="font-medium text-emerald-900">Current view:</span> {zone} · {category} · {severity} ·{" "}
              {range}
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            <SelectLike dark label="Time range" value={range} onChange={setRange} options={timeRangeOptions} />
            <SelectLike
              dark
              label="Zone"
              value={zone}
              onChange={setZone}
              options={["All zones", ...zones.map((z) => z.name)]}
            />
            <SelectLike dark label="Sensor category" value={category} onChange={setCategory} options={sensorCategories} />
            <SelectLike dark label="Alert severity" value={severity} onChange={setSeverity} options={severityOptions} />
            <SelectLike dark label="View mode" value={mode} onChange={setMode} options={modeOptions} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            const TrendIcon = kpi.trend === "up" ? ArrowUpRight : ArrowDownRight;

            return (
              <Card key={kpi.label} className="overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-slate-500">{kpi.label}</p>
                      <div className="mt-2 flex items-end gap-2">
                        <p className="text-2xl font-semibold tracking-tight text-slate-950">{kpi.value}</p>
                        <span
                          className={`mb-1 inline-flex items-center gap-1 text-xs font-medium ${
                            kpi.trend === "up" ? "text-emerald-700" : "text-rose-600"
                          }`}
                        >
                          <TrendIcon className="h-3.5 w-3.5" />
                          {kpi.delta}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">{kpi.helper}</p>
                    </div>

                    <div className="rounded-2xl bg-emerald-50 p-2.5 text-emerald-700">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
          <Card>
            <CardHeader>
              <SectionTitle
                title="Live activity overview"
                subtitle="Footfall, crowd load, and sound conditions in the current observation window"
              />
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={pedestrianTrend}>
                    <defs>
                      <linearGradient id="flowFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#047857" stopOpacity={0.22} />
                        <stop offset="95%" stopColor="#047857" stopOpacity={0.03} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#dbe7df" />
                    <XAxis dataKey="time" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="flow"
                      stroke="#047857"
                      fill="url(#flowFill)"
                      strokeWidth={2.2}
                      name="Pedestrian flow"
                    />
                    <Line
                      type="monotone"
                      dataKey="sound"
                      stroke="#65a30d"
                      strokeWidth={2}
                      dot={false}
                      name="Avg. sound dB"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid gap-3 md:grid-cols-4">
                {crowdByZone.map((item) => (
                  <div key={item.zone} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-slate-800">{item.zone}</p>
                      <Pill
                        tone={
                          item.status === "busy"
                            ? "rose"
                            : item.status === "watch"
                              ? "amber"
                              : item.status === "stable"
                                ? "sky"
                                : "emerald"
                        }
                      >
                        {item.status}
                      </Pill>
                    </div>

                    <p className="mt-3 text-2xl font-semibold text-slate-950">{item.visitors}</p>
                    <p className="text-xs text-slate-500">estimated live visitors</p>

                    <div className="mt-3">
                      <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
                        <span>Density index</span>
                        <span>{item.density}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-200">
                        <div
                          className={`h-2 rounded-full ${
                            item.density >= 80 ? "bg-rose-500" : item.density >= 70 ? "bg-lime-500" : "bg-emerald-500"
                          }`}
                          style={{ width: `${item.density}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <SectionTitle title="Active alerts" subtitle="Prioritized for current shift response" />
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredAlerts.map((alert) => (
                <div key={alert.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${badgeStyles[alert.severity]}`}
                        >
                          {alert.severity}
                        </span>
                        <span className="text-xs text-slate-500">{alert.time}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-slate-900">{alert.title}</h4>
                      <p className="text-sm text-slate-600">{alert.detail}</p>
                    </div>

                    <AlertTriangle
                      className={`mt-1 h-4 w-4 ${
                        alert.severity === "critical"
                          ? "text-rose-600"
                          : alert.severity === "warning"
                            ? "text-amber-600"
                            : "text-emerald-600"
                      }`}
                    />
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Pill>{alert.zone}</Pill>
                    <Pill>{alert.source}</Pill>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <SectionTitle
                title="Mobility, access, and modality"
                subtitle="Entry activity and transport composition for the selected view"
              />
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={accessActivity}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#dbe7df" />
                      <XAxis dataKey="time" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Bar dataKey="access" radius={[8, 8, 0, 0]} fill="#047857" name="RFID events" />
                      <Bar dataKey="vehicles" radius={[8, 8, 0, 0]} fill="#84cc16" name="Vehicle plates" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-800">Modality split</p>
                        <p className="text-xs text-slate-500">Latest rolling interval</p>
                      </div>
                      <Router className="h-4 w-4 text-slate-500" />
                    </div>

                    <div className="h-[180px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={modalitySplit} innerRadius={42} outerRadius={70} dataKey="value" paddingAngle={3}>
                            {modalitySplit.map((entry, index) => (
                              <Cell key={entry.name} fill={["#047857", "#10b981", "#84cc16", "#d9f99d"][index % 4]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-2">
                      {modalitySplit.map((item) => (
                        <div key={item.name} className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">{item.name}</span>
                          <span className="font-medium text-slate-900">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-2">
                      <ScanLine className="h-4 w-4 text-slate-600" />
                      <p className="text-sm font-medium text-slate-800">Scanner activity</p>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-2xl bg-white p-3">
                        <p className="text-slate-500">RFID scans</p>
                        <p className="mt-1 text-xl font-semibold text-slate-950">102</p>
                      </div>
                      <div className="rounded-2xl bg-white p-3">
                        <p className="text-slate-500">Plate reads</p>
                        <p className="mt-1 text-xl font-semibold text-slate-950">26</p>
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-slate-500">
                      No suspicious access cluster confirmed. Continue passive monitoring.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <SectionTitle title="Water & recreation status" subtitle="Swim area conditions and shoreline activity" />
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-800">Swim area status</p>
                      <p className="text-xs text-slate-500">Current operational state</p>
                    </div>
                    <Droplets className="h-4 w-4 text-slate-500" />
                  </div>
                  <div className="mt-3 flex items-end gap-2">
                    <p className="text-2xl font-semibold text-slate-950">Open</p>
                    <Pill tone="amber">near threshold</Pill>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    74 swimmers active, soft capacity 80, hard capacity 95.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-800">Water temperature</p>
                      <p className="text-xs text-slate-500">Rolling sensor average</p>
                    </div>
                    <Waves className="h-4 w-4 text-slate-500" />
                  </div>
                  <p className="mt-3 text-2xl font-semibold text-slate-950">19.1°C</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Within expected recreational band. Rising slowly through the morning.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-800">Picnic activity</p>
                      <p className="text-xs text-slate-500">Harbor Edge occupancy cue</p>
                    </div>
                    <Trees className="h-4 w-4 text-slate-500" />
                  </div>
                  <p className="mt-3 text-2xl font-semibold text-slate-950">31 setups</p>
                  <p className="mt-2 text-sm text-slate-600">Moderate shore-side dwell time; no intervention needed.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <SectionTitle title="Public infrastructure" subtitle="Status of visible operational assets" />
              </CardHeader>
              <CardContent className="space-y-3">
                {infrastructureStatus.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-slate-800">{item.label}</p>
                          <p className="mt-1 text-xs text-slate-500">{item.note}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-semibold text-slate-950">{item.value}</span>
                          <div className="rounded-2xl bg-white p-2 text-slate-700">
                            <Icon className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <Card>
            <CardHeader>
              <SectionTitle
                title="Environmental + crowd correlation"
                subtitle="Useful for anticipating comfort and escalation risk"
              />
            </CardHeader>
            <CardContent>
              <div className="h-[270px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={pedestrianTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#dbe7df" />
                    <XAxis dataKey="time" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis yAxisId="left" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      tick={{ fill: "#64748b", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="crowd"
                      stroke="#047857"
                      strokeWidth={2.2}
                      name="Visitors"
                      dot={false}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="sound"
                      stroke="#65a30d"
                      strokeWidth={2.2}
                      name="Sound dB"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {anomalyPanel.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-slate-800">{item.title}</p>
                      <Pill
                        tone={
                          item.confidence === "high"
                            ? "emerald"
                            : item.confidence === "moderate"
                              ? "amber"
                              : "slate"
                        }
                      >
                        {item.confidence}
                      </Pill>
                    </div>
                    <p className="text-sm leading-6 text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <SectionTitle title="Historical trend snapshot" subtitle="Seven-day context for operations planning" />
            </CardHeader>
            <CardContent>
              <div className="h-[270px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#dbe7df" />
                    <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="visitors" fill="#047857" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500">7-day visitors</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950">33.0k</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Avg. daily alerts</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950">4.0</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Avg. noise</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950">63.9 dB</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <SectionTitle
                title="Sensor health and system status"
                subtitle="Operational readiness across the sensor network"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredSensorHealth.map((item) => (
                  <div
                    key={`${item.sensor}-${item.zone}`}
                    className="grid grid-cols-[1.2fr_1fr_110px] items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm"
                  >
                    <div>
                      <p className="font-medium text-slate-800">{item.sensor}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.zone} · {item.category}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock3 className="h-4 w-4" />
                      <span>heartbeat &lt; 2 min</span>
                    </div>

                    <div className="justify-self-end">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${badgeStyles[item.status]}`}
                      >
                        {item.status === "offline" ? <WifiOff className="mr-1 h-3.5 w-3.5" /> : null}
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <SectionTitle title="Operator notes" subtitle="Action framing for the next 30–60 minutes" />
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-medium text-slate-800">Recommended attention areas</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                  <li>Central Plaza: verify whether sound spike is event-related or emerging congestion.</li>
                  <li>Swim Dock: prep soft crowd management if occupancy passes 80.</li>
                  <li>Makers Court: restore CCTV shutter feed to recover full monitoring coverage.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}