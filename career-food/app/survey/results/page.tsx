"use client";

import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid
} from "recharts";
import clsx from "clsx";
import Papa from "papaparse";

/** ------------------------------- Types ------------------------------- */
type Loyalty = "Loyal" | "Depends" | "Not-Loyal";
type Gender = "Lelaki" | "Perempuan" | "Prefer-Not-To-Say";
type Row = {
  loyalty: Loyalty;
  gender: Gender;
  state: string;
  reasons: string[];
  discover: string[];
  stopReasons: string[];
};

/** ---------------------------- Mock dataset --------------------------- */
const STATES = [
  "Selangor",
  "Wilayah Persekutuan",
  "Johor",
  "Perak",
  "Sabah",
  "Sarawak",
  "Penang",
  "Pahang"
] as const;

const MOCK: Row[] = Array.from({ length: 850 }).map(() => {
  const r = Math.random();
  const loyalty: Loyalty =
    r < 0.63 ? "Depends" : r < 0.81 ? "Not-Loyal" : "Loyal";
  const g = Math.random();
  const gender: Gender =
    g < 0.52 ? "Perempuan" : g < 0.93 ? "Lelaki" : "Prefer-Not-To-Say";
  const state = STATES[Math.floor(Math.random() * STATES.length)];

  const reasons: string[] = [];
  if (Math.random() < 0.6) reasons.push("Understands me / fits my vibe");
  if (Math.random() < 0.54) reasons.push("Value for money");
  if (Math.random() < 0.53) reasons.push("Trendy / current");
  if (Math.random() < 0.3) reasons.push("Easy to buy online");
  if (Math.random() < 0.21) reasons.push("Social presence");
  if (Math.random() < 0.12) reasons.push("Influencer tie-ins");
  if (Math.random() < 0.12) reasons.push("Eco-friendly");

  const discover: string[] = [];
  if (Math.random() < 0.78) discover.push("TikTok");
  if (Math.random() < 0.45) discover.push("Instagram");
  if (gender === "Lelaki" && Math.random() < 0.35) discover.push("YouTube");
  if (gender !== "Lelaki" && Math.random() < 0.24) discover.push("Friends");
  if (gender === "Lelaki" && Math.random() < 0.14) discover.push("Livestreams");
  if (Math.random() < 0.1) discover.push("WhatsApp");
  if (Math.random() < 0.19) discover.push("Influencer Collabs");
  if (Math.random() < 0.12) discover.push("Shopee");
  if (Math.random() < 0.1) discover.push("Lazada");

  const stopReasons: string[] = [];
  if (Math.random() < 0.75) stopReasons.push("Brand controversies");
  if (Math.random() < 0.54) stopReasons.push("Bad service / experience");
  if (Math.random() < 0.2) stopReasons.push("Boring / out of touch");
  if (Math.random() < 0.04) stopReasons.push("Because friends stop");

  return { loyalty, gender, state, reasons, discover, stopReasons };
});

/** ------------------------------ Utils -------------------------------- */
const COLORS = [
  "#111827",
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4"
];
const uniq = <T,>(arr: T[]) => Array.from(new Set(arr));
const pct = (n: number, d: number) => (d === 0 ? 0 : (n / d) * 100);
const countWhere = <T,>(rows: T[], pred: (r: T) => boolean) =>
  rows.reduce((acc, r) => acc + (pred(r) ? 1 : 0), 0);

type Filters = {
  gender: "All" | Gender;
  loyalty: "All" | Loyalty;
  states: string[];
};
function applyFilters(rows: Row[], f: Filters) {
  return rows.filter((r) => {
    const g = f.gender === "All" || r.gender === f.gender;
    const l = f.loyalty === "All" || r.loyalty === f.loyalty;
    const s = f.states.length === 0 || f.states.includes(r.state);
    return g && l && s;
  });
}

function topNCountsFromListField(
  rows: Row[],
  pick: (r: Row) => string[],
  top = 6
) {
  const counts: Record<string, number> = {};
  rows.forEach((r) => {
    const set = new Set(pick(r));
    set.forEach((v) => (counts[v] = (counts[v] ?? 0) + 1));
  });
  const total = rows.length;
  const data = Object.entries(counts)
    .map(([item, count]) => ({ item, count, percentage: pct(count, total) }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, top);
  return { data, total };
}

function loyaltySplit(rows: Row[]) {
  const total = rows.length;
  const loyal = countWhere(rows, (r) => r.loyalty === "Loyal");
  const dep = countWhere(rows, (r) => r.loyalty === "Depends");
  const notL = countWhere(rows, (r) => r.loyalty === "Not-Loyal");
  const blanks = total - loyal - dep - notL;
  return {
    total,
    items: [
      { name: "Loyal", value: loyal, pct: pct(loyal, total) },
      { name: "Depends", value: dep, pct: pct(dep, total) },
      { name: "Not-Loyal", value: notL, pct: pct(notL, total) }
    ],
    blanks
  };
}

/** ------------------------- CSV -> Row[] mapping ---------------------- */
function splitList(s?: string | null) {
  if (!s) return [];
  return s
    .split(";")
    .map((x) => x.trim())
    .filter(Boolean);
}
function mapLoyalty(s: string): Loyalty | null {
  const t = (s || "").toLowerCase().trim();
  if (t.startsWith("loyal")) return "Loyal";
  if (t.startsWith("depend")) return "Depends";
  if (t.includes("not")) return "Not-Loyal";
  return null;
}
function mapGender(s: string): Gender | null {
  const t = (s || "").toLowerCase().trim();
  if (t.startsWith("lela")) return "Lelaki";
  if (t.startsWith("perem")) return "Perempuan";
  if (t.includes("prefer")) return "Prefer-Not-To-Say";
  return null;
}
function rowsFromCsv(records: any[]): Row[] {
  const out: Row[] = [];
  records.forEach((rec) => {
    const loyalty = mapLoyalty(rec.loyalty_clean || rec.loyalty || "");
    const gender = mapGender(rec.gender_clean || rec.gender || "");
    const state =
      (rec.state_clean || rec.state || "").toString().trim() || "Unknown";
    const reasons = splitList(rec.reasons_clean || rec.reasons);
    const discover = splitList(rec.discover_clean || rec.discover);
    const stopReasons = splitList(rec.stop_reasons_clean || rec.stop_reasons);
    if (loyalty && gender)
      out.push({ loyalty, gender, state, reasons, discover, stopReasons });
  });
  return out;
}

/** ------------------------------ Page --------------------------------- */
export default function ResultsPage() {
  const [data, setData] = useState<Row[]>(MOCK);
  const [filters, setFilters] = useState<Filters>({
    gender: "All",
    loyalty: "All",
    states: []
  });
  const filtered = useMemo(() => applyFilters(data, filters), [data, filters]);

  // recompute derived
  const loyalty = useMemo(() => loyaltySplit(filtered), [filtered]);
  const discover = useMemo(
    () => topNCountsFromListField(filtered, (r) => r.discover, 6),
    [filtered]
  );
  const reasons = useMemo(
    () => topNCountsFromListField(filtered, (r) => r.reasons, 6),
    [filtered]
  );
  const stops = useMemo(
    () => topNCountsFromListField(filtered, (r) => r.stopReasons, 6),
    [filtered]
  );
  const topDiscovery = discover.data[0]?.item ?? "—";
  const topDiscoveryPct = discover.data[0]?.percentage ?? 0;
  const topStop = stops.data[0]?.item ?? "—";
  const topStopPct = stops.data[0]?.percentage ?? 0;
  const allStates = useMemo(() => uniq(data.map((r) => r.state)), [data]);

  // segmented helpers
  const genderTabs: Array<{ key: Gender; label: string }> = [
    { key: "Perempuan", label: "Perempuan" },
    { key: "Lelaki", label: "Lelaki" },
    { key: "Prefer-Not-To-Say", label: "Prefer‑Not‑To‑Say" }
  ];
  function discoveryForGender(g: Gender) {
    const sub = filtered.filter((r) => r.gender === g);
    return topNCountsFromListField(sub, (r) => r.discover, 5).data;
  }
  const loyaltyTabs: Array<{ key: Loyalty; label: string }> = [
    { key: "Loyal", label: "Loyal" },
    { key: "Depends", label: "Depends" },
    { key: "Not-Loyal", label: "Not‑Loyal" }
  ];
  function reasonsForLoyalty(l: Loyalty) {
    const sub = filtered.filter((r) => r.loyalty === l);
    return topNCountsFromListField(sub, (r) => r.reasons, 5).data;
  }

  // CSV upload handler
  function onCsv(file: File) {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        try {
          const rows = rowsFromCsv(res.data as any[]);
          if (!rows.length) {
            alert(
              "Could not find expected columns. Make sure to use the cleaned CSV with *_clean fields."
            );
            return;
          }
          setData(rows);
          setFilters({ gender: "All", loyalty: "All", states: [] });
        } catch (e) {
          console.error(e);
          alert("Failed to parse CSV.");
        }
      }
    });
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Gen Z Brand Loyalty — One‑Page Dashboard
          </h1>
          <p className="text-gray-600">
            Upload your cleaned CSV (or explore using mock data). Filter by
            Gender, Loyalty, and State.
          </p>
        </div>

        {/* Upload */}
        <div className="bg-white rounded-2xl shadow p-5 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-gray-700 mb-1">
                Upload cleaned CSV
              </div>
              <div className="text-sm text-gray-500">
                Expected headers:{" "}
                <code>
                  loyalty_clean, gender_clean, state_clean, reasons_clean,
                  discover_clean, stop_reasons_clean
                </code>
              </div>
            </div>
            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-white cursor-pointer">
              <input
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onCsv(f);
                }}
              />
              Choose CSV
            </label>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {/* Gender */}
          <div className="bg-white rounded-2xl shadow p-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Gender
            </label>
            <select
              className="w-full rounded-xl border-gray-300"
              value={filters.gender}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  gender: e.target.value as Filters["gender"]
                }))
              }
            >
              <option value="All">All</option>
              <option value="Perempuan">Perempuan</option>
              <option value="Lelaki">Lelaki</option>
              <option value="Prefer-Not-To-Say">Prefer‑Not‑To‑Say</option>
            </select>
          </div>
          {/* Loyalty */}
          <div className="bg-white rounded-2xl shadow p-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Loyalty
            </label>
            <select
              className="w-full rounded-xl border-gray-300"
              value={filters.loyalty}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  loyalty: e.target.value as Filters["loyalty"]
                }))
              }
            >
              <option value="All">All</option>
              <option value="Loyal">Loyal</option>
              <option value="Depends">Depends</option>
              <option value="Not-Loyal">Not‑Loyal</option>
            </select>
          </div>
          {/* State multiselect */}
          <div className="bg-white rounded-2xl shadow p-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              State (multi‑select)
            </label>
            <div className="flex flex-wrap gap-2">
              {uniq(data.map((r) => r.state)).map((s) => {
                const active = filters.states.includes(s);
                return (
                  <button
                    key={s}
                    onClick={() =>
                      setFilters((f) => {
                        const exists = f.states.includes(s);
                        return {
                          ...f,
                          states: exists
                            ? f.states.filter((x) => x !== s)
                            : [...f.states, s]
                        };
                      })
                    }
                    className={clsx(
                      "px-3 py-1 rounded-full text-sm border",
                      active
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    )}
                  >
                    {s}
                  </button>
                );
              })}
              {filters.states.length > 0 && (
                <button
                  onClick={() => setFilters((f) => ({ ...f, states: [] }))}
                  className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 border border-gray-300"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <KPI
            label="Respondents (N)"
            value={loyalty.total.toLocaleString()}
            sub={filters.states.length ? "Filtered" : "All"}
          />
          <KPI
            label="Loyal (%)"
            value={loyalty.items[0].pct.toFixed(1) + "%"}
            sub={`${loyalty.items[0].value} ppl`}
          />
          <KPI
            label="Depends (%)"
            value={loyalty.items[1].pct.toFixed(1) + "%"}
            sub={`${loyalty.items[1].value} ppl`}
          />
          <KPI
            label="Not‑Loyal (%)"
            value={loyalty.items[2].pct.toFixed(1) + "%"}
            sub={`${loyalty.items[2].value} ppl`}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Loyalty split">
            <div className="h-72">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={loyalty.items}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                  >
                    {loyalty.items.map((entry, idx) => (
                      <Cell
                        key={entry.name}
                        fill={COLORS[idx % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip
                    formatter={(val: any, name: any) => [
                      `${val} (${loyalty.items.find((i) => i.name === name)?.pct.toFixed(1)}%)`,
                      name
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
              {loyalty.total > 0 &&
                loyalty.total -
                  (loyalty.items[0].value +
                    loyalty.items[1].value +
                    loyalty.items[2].value) >
                  0 && (
                  <p className="text-xs text-gray-500 mt-2">
                    Note: Some responses were blank and excluded from the pie.
                  </p>
                )}
            </div>
          </Card>

          <Card title="Where they discover brands (Top 6)">
            <div className="h-72">
              <ResponsiveContainer>
                <BarChart data={discover.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="item" />
                  <YAxis />
                  <Tooltip
                    formatter={(val: any) =>
                      typeof val === "number" ? val.toFixed(1) + "%" : val
                    }
                  />
                  <Bar dataKey="percentage" name="% of respondents">
                    {discover.data.map((_, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="What earns loyalty (Top 6)">
            <div className="h-72">
              <ResponsiveContainer>
                <BarChart data={reasons.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="item" />
                  <YAxis />
                  <Tooltip
                    formatter={(val: any) =>
                      typeof val === "number" ? val.toFixed(1) + "%" : val
                    }
                  />
                  <Bar dataKey="percentage" name="% of respondents">
                    {reasons.data.map((_, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="Why they stop supporting (Top 6)">
            <div className="h-72">
              <ResponsiveContainer>
                <BarChart data={stops.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="item" />
                  <YAxis />
                  <Tooltip
                    formatter={(val: any) =>
                      typeof val === "number" ? val.toFixed(1) + "%" : val
                    }
                  />
                  <Bar dataKey="percentage" name="% of respondents">
                    {stops.data.map((_, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Segments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Tabbed
            title="Discovery by Gender"
            tabs={genderTabs.map((t) => t.label)}
            panels={genderTabs.map((t) => (
              <div className="h-72" key={t.key}>
                <ResponsiveContainer>
                  <BarChart data={discoveryForGender(t.key)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="item" />
                    <YAxis />
                    <Tooltip
                      formatter={(val: any) =>
                        typeof val === "number" ? val.toFixed(1) + "%" : val
                      }
                    />
                    <Bar dataKey="percentage" name="% of group">
                      {discoveryForGender(t.key).map((_, idx) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ))}
          />
          <Tabbed
            title="Reasons by Loyalty segment"
            tabs={loyaltyTabs.map((t) => t.label)}
            panels={loyaltyTabs.map((t) => (
              <div className="h-72" key={t.key}>
                <ResponsiveContainer>
                  <BarChart data={reasonsForLoyalty(t.key)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="item" />
                    <YAxis />
                    <Tooltip
                      formatter={(val: any) =>
                        typeof val === "number" ? val.toFixed(1) + "%" : val
                      }
                    />
                    <Bar dataKey="percentage" name="% of segment">
                      {reasonsForLoyalty(t.key).map((_, idx) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ))}
          />
        </div>

        {/* Insights + Footer KPIs */}
        <Card title="Executive insights">
          <ul className="text-gray-800 space-y-2 text-sm md:text-base">
            <li>
              • Conditional loyalty dominates (watch the “Depends” slice).
              Refresh trend cues and keep value visible.
            </li>
            <li>
              • TikTok is the discovery king; YouTube over‑indexes for{" "}
              <span className="font-medium">Lelaki</span>.
            </li>
            <li>
              • Loyalty drivers ={" "}
              <span className="font-medium">fit + value + trend</span>;
              convenience is a second‑tier driver.
            </li>
            <li>
              • Fastest churn routes:{" "}
              <span className="font-medium">brand controversies</span> &{" "}
              <span className="font-medium">service issues</span>.
            </li>
          </ul>
        </Card>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPI
            label="Top discovery"
            value={topDiscovery}
            sub={`${topDiscoveryPct.toFixed(1)}%`}
          />
          <KPI
            label="Top churn driver"
            value={topStop}
            sub={`${topStopPct.toFixed(1)}%`}
          />
          <KPI
            label="States selected"
            value={filters.states.length.toString()}
            sub={filters.states.join(", ") || "All"}
          />
          <KPI
            label="Filters"
            value={`${filters.gender} / ${filters.loyalty}`}
            sub="Gender / Loyalty"
          />
        </div>
      </div>
    </div>
  );
}

/** ---------------------------- UI primitives -------------------------- */
function Card({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base md:text-lg font-semibold text-gray-900">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}
function KPI({
  label,
  value,
  sub
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <div className="text-xs uppercase tracking-wide text-gray-500">
        {label}
      </div>
      <div className="text-2xl font-bold text-gray-900 mt-1">{value}</div>
      {sub && <div className="text-sm text-gray-500">{sub}</div>}
    </div>
  );
}
function Tabbed({
  title,
  tabs,
  panels
}: {
  title: string;
  tabs: string[];
  panels: React.ReactNode[];
}) {
  const [active, setActive] = useState(0);
  return (
    <Card title={title}>
      <div className="flex items-center gap-2 mb-3">
        {tabs.map((t, i) => (
          <button
            key={t}
            className={clsx(
              "px-3 py-1 rounded-full text-sm border",
              i === active
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            )}
            onClick={() => setActive(i)}
          >
            {t}
          </button>
        ))}
      </div>
      {panels[active]}
    </Card>
  );
}
