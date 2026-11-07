/**
 * Reading JSON from another origin, and turning untyped payloads into values
 * without scattering `any` through the code that renders them.
 *
 * Everything here is pure: no React, no retries, no logging. The sources in
 * `lib/sources/` use it; `useRemote` in `lib/remote.ts` turns a source into a
 * state a client module can render.
 */

export async function getJson(
  url: string,
  signal: AbortSignal,
  init?: RequestInit,
): Promise<unknown> {
  const response = await fetch(url, { ...init, signal });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.json();
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

export function text(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

export function count(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

/** Dig one level into a payload: `at(payload, 'result', 'results')`. */
export function at(value: unknown, ...path: string[]): unknown {
  let current = value;
  for (const key of path) {
    if (!isRecord(current)) return undefined;
    current = current[key];
  }
  return current;
}
