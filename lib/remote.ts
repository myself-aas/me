'use client';

import { useEffect, useState } from 'react';

/**
 * One live read from elsewhere, as a value a client module can render.
 *
 * The module that renders asks `useRemote(loadProjects)` and switches on
 * `status`. It never sees a `loading` boolean, a `data` that is sometimes
 * absent, or an effect it has to write itself. A load that is still running is
 * `pending`; one that came back is `ready`; one that failed, was refused, or
 * was cut off by unmount is `unavailable` with a reason fit to show a person.
 *
 * `load` is expected to be a module-level function, as every source in
 * `lib/sources/` is: the read restarts only when that function changes.
 */

export type Remote<T> =
  | { status: 'pending' }
  | { status: 'ready'; data: T }
  | { status: 'unavailable'; reason: string };

const PENDING = { status: 'pending' } as const;

export function useRemote<T>(load: (signal: AbortSignal) => Promise<T>): Remote<T> {
  const [state, setState] = useState<Remote<T>>(PENDING);

  useEffect(() => {
    const controller = new AbortController();
    let live = true;

    load(controller.signal).then(
      (data) => {
        if (live) setState({ status: 'ready', data });
      },
      (error: unknown) => {
        if (!live || controller.signal.aborted) return;
        const reason = error instanceof Error ? error.message : 'Request failed';
        setState({ status: 'unavailable', reason });
      },
    );

    return () => {
      live = false;
      controller.abort();
    };
  }, [load]);

  return state;
}
