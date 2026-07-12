/**
 * Shared panel chrome — matches Subscription page look.
 */

export function PanelShell({ children, className = "" }) {
  return (
    <div
      className={`relative min-h-[80vh] w-full max-w-full overflow-hidden rounded-xl border border-gray-700/60 bg-gradient-to-b from-gray-900 via-gray-900 to-black p-4 sm:p-6 lg:p-8 ${className}`}
    >
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[70%] -translate-x-1/2 rounded-full bg-red-600/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="relative">{children}</div>
    </div>
  );
}

export function PanelHeader({
  eyebrow,
  title,
  description,
  actions,
  className = "",
}) {
  return (
    <div
      className={`mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between ${className}`}
    >
      <div className="min-w-0">
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-xl text-sm text-gray-400">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex flex-shrink-0 flex-wrap items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}

export function PanelCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-gray-700/60 bg-gray-800/40 backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}

export const panelInputClass =
  "w-full rounded-xl border border-gray-700 bg-gray-900/60 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 transition focus:border-red-500/50";

export const panelBtnPrimaryClass =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-900/30 transition hover:brightness-110 active:scale-[0.98]";

export const panelBtnSecondaryClass =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-gray-600 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10";

export const panelBtnDangerClass =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-500/20";
