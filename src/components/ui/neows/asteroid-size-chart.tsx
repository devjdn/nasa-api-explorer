"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    XAxis,
    YAxis,
} from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import { useMediaQuery } from "@uidotdev/usehooks";

type SizeChartProps = {
    name: string;
    maxDiameter: number;
};

const chartConfig = {
    value: {
        label: "Diameter (m)",
        color: "",
    },
} satisfies ChartConfig;

export default function AsteroidSizeChart({ name, maxDiameter }: SizeChartProps) {
    const isMobile = useMediaQuery("only screen and (max-width: 768px)");
    const safeMaxDiameter = Number.isFinite(maxDiameter) ? maxDiameter : 0;

    const sizeComparisonData = [
        { label: name, value: Math.round(safeMaxDiameter) },
        { label: "Football Field", value: 110 },
    ];

    return (
        isMobile ? (
            <ChartContainer className="h-full w-56" config={chartConfig}>
                <BarChart
                    accessibilityLayer
                    data={sizeComparisonData}
                    margin={{
                        right: 16,
                        left: 0,
                        bottom: 48,
                        top: 48,
                    }}

                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="label"
                        type="category"
                        tickLine={false}
                        axisLine={false}
                        hide
                    />
                    <YAxis
                        type="number"
                        tickLine
                        axisLine
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                    />
                    <Bar
                        dataKey="value"
                        className="fill-orange-500"
                        radius={0}
                    >
                        <LabelList
                            dataKey="value"
                            position="top"
                            offset={4}
                            className="fill-foreground"
                            fontSize={10}
                        />
                    </Bar>
                </BarChart>
            </ChartContainer>
        ) : (
            <ChartContainer className="w-full h-48" config={chartConfig}>
                <BarChart
                    accessibilityLayer
                    data={sizeComparisonData}
                    layout="vertical"
                    margin={{
                        right: 48,
                        left: 8,
                        bottom: 24,
                        top: 24,
                    }}
                >
                    <CartesianGrid horizontal={false} />
                    <YAxis
                        dataKey="label"
                        type="category"
                        hide
                    />
                    <XAxis dataKey="value" type="number" tickLine axisLine className="font-mono" />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                    />
                    <Bar
                        dataKey="value"
                        className="fill-orange-500"
                    >
                        {/* <LabelList
                            dataKey="label"
                            position="insideLeft"
                            offset={8}
                            className="fill-white"
                            fontSize={12}
                        /> */}
                        <LabelList
                            dataKey="value"
                            position="right"
                            offset={8}
                            className="fill-foreground font-mono"
                            fontSize={12}
                        />
                    </Bar>
                </BarChart>
            </ChartContainer>
        )
    );
}