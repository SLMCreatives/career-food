import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from "recharts";

type Lead = { q_five: string; q_six: string; q_seven: string; q_eight: string };

interface LeadsChartProps {
  data: Lead[];
}

const chartConfig: ChartConfig = {
  industry: {
    label: "Industry",
    color: "#3b82f6"
  },
  workEnvironment: {
    label: "Work Environment",
    color: "#f97316"
  },
  job: {
    label: "Job",
    color: "#10b981"
  },
  strength: {
    label: "Strength",
    color: "#8b5cf6"
  }
};

export function LeadsChart({ data }: LeadsChartProps) {
  // Count q_five categories
  const countsq5 = data.reduce<Record<string, number>>((acc, cur) => {
    acc[cur.q_five] = (acc[cur.q_five] || 0) + 1;
    return acc;
  }, {});
  const q5chartData = Object.entries(countsq5).map(([key, value]) => ({
    name: key,
    value
  }));

  const countsq6 = data.reduce<Record<string, number>>((acc, cur) => {
    acc[cur.q_six] = (acc[cur.q_six] || 0) + 1;
    return acc;
  }, {});
  const q6chartData = Object.entries(countsq6).map(([key, value]) => ({
    name: key,
    value
  }));
  const countsq7 = data.reduce<Record<string, number>>((acc, cur) => {
    acc[cur.q_seven] = (acc[cur.q_seven] || 0) + 1;
    return acc;
  }, {});
  const q7chartData = Object.entries(countsq7).map(([key, value]) => ({
    name: key,
    value
  }));
  const countsq8 = data.reduce<Record<string, number>>((acc, cur) => {
    acc[cur.q_eight] = (acc[cur.q_eight] || 0) + 1;
    return acc;
  }, {});
  const q8chartData = Object.entries(countsq8).map(([key, value]) => ({
    name: key,
    value
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <Card className="lg:col-span-3 col-span-1 p-0">
        <CardHeader>
          <CardTitle>Interested Industry</CardTitle>
          <CardDescription>
            Question 8 - Which industry excites you the most?
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <ResponsiveContainer width="100%" height={450}>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={q8chartData}
                layout="vertical"
                margin={{
                  left: 50,
                  right: 50
                }}
              >
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  className="text-xs uppercase"
                />
                <ChartTooltip />
                <Bar dataKey="value" fill="#3b82f6">
                  <LabelList
                    position="right"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </ResponsiveContainer>
          {/* <BarChart data={q8chartData}>
              <XAxis dataKey="name" className="text-xs text-nowrap" />
              <YAxis className="text-xs" />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer> */}
        </CardContent>
      </Card>
      <Card className="p-0">
        <CardHeader>
          <CardTitle>Interested Work Environment</CardTitle>
          <CardDescription>
            Question 5 - In your dream job, what kind of work environment would
            you prefer?
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <ResponsiveContainer width="100%" height={250}>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={q5chartData}
                layout="vertical"
                margin={{
                  left: 50,
                  right: 50
                }}
              >
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  className="text-xs uppercase"
                />
                <ChartTooltip />
                <Bar dataKey="value" fill="#f97316">
                  <LabelList
                    position="right"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Interested Job</CardTitle>
          <CardDescription>
            Question 6 - If money did not matter, which kind of job would you
            pick?
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <ResponsiveContainer width="100%" height={250}>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={q6chartData}
                layout="vertical"
                margin={{
                  left: 50,
                  right: 20
                }}
              >
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  className="text-xs uppercase"
                />
                <ChartTooltip />
                <Bar dataKey="value" fill="#10b981">
                  <LabelList
                    position="right"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Biggest Strength</CardTitle>
          <CardDescription>
            Question 7 - What do you consider your biggest strength?
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <ResponsiveContainer width="100%" height={250}>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={q7chartData}
                layout="vertical"
                margin={{
                  left: 60,
                  right: 20
                }}
              >
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  className="text-xs uppercase"
                />
                <ChartTooltip />
                <Bar dataKey="value" fill="#8b5cf6">
                  <LabelList
                    position="right"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
