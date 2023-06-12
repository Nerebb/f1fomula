import { driver } from '@prisma/client';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import { Bar, getElementAtEvent } from 'react-chartjs-2';
import LostData from './LostData';
import { MouseEvent, useMemo, useRef } from 'react';
import type { ChartData, ChartOptions, ChartType } from 'chart.js';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import useBrowserWidth from '@/hooks/useBrowserWidth';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function ChartByPoints({ drivers }: { drivers: driver[] }) {
    const { theme, systemTheme } = useTheme()
    const browserWidth = useBrowserWidth()
    const router = useRouter()
    const chartRef = useRef<ChartJS<'bar'>>()
    const options: ChartOptions<'bar'> = useMemo(() => {
        const curTheme = theme === 'system' ? systemTheme : theme
        return {
            indexAxis: 'y' as const,
            elements: {
                bar: {
                    borderWidth: 1,
                },
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom' as const,
                    labels: {
                        font: {
                            size: browserWidth < 376 ? 12 : 16
                        }
                    }
                },
            },
            scales: {
                x: {
                    grid: {
                        color: curTheme === 'dark' ? '#374151' : '#D1D5DB'
                    },
                    ticks: {
                        color: curTheme === 'dark' ? 'white' : 'dark',
                        font: {
                            size: browserWidth < 376 ? 12 : 16
                        }
                    },
                },
                y: {
                    grid: {
                        color: curTheme === 'dark' ? '#374151' : '#D1D5DB'
                    },
                    ticks: {
                        color: curTheme === 'dark' ? 'white' : 'dark',
                        font: {
                            size: browserWidth < 376 ? 6 : 16
                        }
                    }
                }
            },
            color: curTheme === 'dark' ? 'white' : 'dark',
        }
    }, [theme, browserWidth, systemTheme]);

    const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
        const { current: bar } = chartRef;
        if (!bar) return

        const data = getElementAtEvent(bar, event)
        if (data && data.length) {
            const index = data[0].index
            const { name } = drivers[index]
            router.push(`/#${name}`)

        }
    }

    const data: ChartData<'bar'> = useMemo(() => {
        const labels = drivers.map(i => i.name.toUpperCase())
        return {
            labels,
            datasets: [{
                label: 'Points',
                data: labels.map((_, idx) => Number(drivers[idx].points) ?? 0),
                backgroundColor: ['#37BEDD', '#5E8FAA', '#3782dd', '#B6BABD', '#C92D4B', '#294a9c', '#f58020', '#b6babd', '#2293d1', '#358c75'],
            }]
        }
    }, [drivers])

    if (!drivers || !drivers.length) return <LostData />

    return <Bar
        ref={chartRef}
        options={options}
        data={data}
        onClick={onClick}
    />;
}
