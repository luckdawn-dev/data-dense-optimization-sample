/**
 * Centered loading overlay for any table card.
 *
 * Unlike an in-table spinner row, this is positioned over the
 * .table-card (which always fits the viewport), so it stays
 * centered no matter how far the table scrolls horizontally —
 * visible on mobile too.
 */
export default function TableLoadingOverlay({ show, label = "Loading 20,000 orders…" }: { show: boolean; label?: string }) {
    if (!show) return null;

    return (
        <div className="table-loading-overlay" role="status" aria-live="polite">
            <div className="table-loading-overlay__box">
                <div className="spinner" />
                <p className="table-loading-overlay__label">{label}</p>
            </div>
        </div>
    )
}
