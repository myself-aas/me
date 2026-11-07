'use client';

import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export interface ChartDataSeries {
  key: string;
  name?: string;
  color?: string;
}

export interface ChartConfig {
  type?: 'line' | 'bar' | 'area' | 'pie';
  title?: string;
  subtitle?: string;
  xAxisKey?: string;
  data: Record<string, unknown>[];
  series?: ChartDataSeries[];
}

interface MarkdownChartProps {
  jsonString: string;
}

const DEFAULT_COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

function parseConfig(jsonString: string): ChartConfig | null {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed && Array.isArray(parsed.data)) {
      return parsed;
    }
    return null;
  } catch (err) {
    console.error('Invalid chart JSON configuration:', err);
    return null;
  }
}

export default function MarkdownChart({ jsonString }: MarkdownChartProps) {
  const config = useMemo(() => parseConfig(jsonString), [jsonString]);

  if (!config || !config.data || config.data.length === 0) {
    return (
      <div className="my-4 rounded-[2px] border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
        Unable to parse chart data configuration.
      </div>
    );
  }

  const { type = 'line', title, subtitle, xAxisKey = 'name', data, series } = config;

  const defaultSeriesKeys = series
    ? series
    : Object.keys(data[0])
        .filter((k) => k !== xAxisKey)
        .map((k, idx) => ({
          key: k,
          name: k.charAt(0).toUpperCase() + k.slice(1),
          color: DEFAULT_COLORS[idx % DEFAULT_COLORS.length],
        }));

  return (
    <div className="my-8 rounded-[2px] border border-rule bg-band/40 p-4 sm:p-6 shadow-xs">
      {(title || subtitle) && (
        <div className="mb-4 border-b border-rule/60 pb-3">
          {title && (
            <h4 className="font-serif text-base font-[560] text-ink flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-signal inline-block" />
              {title}
            </h4>
          )}
          {subtitle && (
            <p className="mt-1 text-xs text-ink-soft leading-relaxed">{subtitle}</p>
          )}
        </div>
      )}

      <div className="h-64 w-full text-xs">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'bar' ? (
            <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-rule, #334155)" opacity={0.4} />
              <XAxis dataKey={xAxisKey} tick={{ fontSize: 11 }} stroke="currentColor" />
              <YAxis tick={{ fontSize: 11 }} stroke="currentColor" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-paper)',
                  borderColor: 'var(--color-rule)',
                  color: 'var(--color-ink)',
                  borderRadius: '2px',
                  fontSize: '12px',
                }}
                itemStyle={{
                  color: 'var(--color-ink)',
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '11px' }} />
              {defaultSeriesKeys.map((s, idx) => (
                <Bar
                  key={s.key}
                  dataKey={s.key}
                  name={s.name || s.key}
                  fill={s.color || DEFAULT_COLORS[idx % DEFAULT_COLORS.length]}
                  radius={[2, 2, 0, 0]}
                />
              ))}
            </BarChart>
          ) : type === 'area' ? (
            <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-rule, #334155)" opacity={0.4} />
              <XAxis dataKey={xAxisKey} tick={{ fontSize: 11 }} stroke="currentColor" />
              <YAxis tick={{ fontSize: 11 }} stroke="currentColor" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-paper)',
                  borderColor: 'var(--color-rule)',
                  color: 'var(--color-ink)',
                  borderRadius: '2px',
                  fontSize: '12px',
                }}
                itemStyle={{
                  color: 'var(--color-ink)',
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '11px' }} />
              {defaultSeriesKeys.map((s, idx) => (
                <Area
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.name || s.key}
                  stroke={s.color || DEFAULT_COLORS[idx % DEFAULT_COLORS.length]}
                  fill={s.color || DEFAULT_COLORS[idx % DEFAULT_COLORS.length]}
                  fillOpacity={0.2}
                />
              ))}
            </AreaChart>
          ) : type === 'pie' ? (
            <PieChart>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-paper)',
                  borderColor: 'var(--color-rule)',
                  color: 'var(--color-ink)',
                  borderRadius: '2px',
                  fontSize: '12px',
                }}
                itemStyle={{
                  color: 'var(--color-ink)',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Pie
                data={data}
                dataKey={defaultSeriesKeys[0]?.key || 'value'}
                nameKey={xAxisKey}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={DEFAULT_COLORS[index % DEFAULT_COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          ) : (
            <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-rule, #334155)" opacity={0.4} />
              <XAxis dataKey={xAxisKey} tick={{ fontSize: 11 }} stroke="currentColor" />
              <YAxis tick={{ fontSize: 11 }} stroke="currentColor" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-paper)',
                  borderColor: 'var(--color-rule)',
                  color: 'var(--color-ink)',
                  borderRadius: '2px',
                  fontSize: '12px',
                }}
                itemStyle={{
                  color: 'var(--color-ink)',
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '11px' }} />
              {defaultSeriesKeys.map((s, idx) => (
                <Line
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.name || s.key}
                  stroke={s.color || DEFAULT_COLORS[idx % DEFAULT_COLORS.length]}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              ))}
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
