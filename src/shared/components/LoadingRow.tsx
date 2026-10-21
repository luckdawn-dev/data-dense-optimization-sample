/**
 * Full-width spinner row for the loading state of any table.
 */
export default function LoadingRow({ columns }: { columns: number }) {
    return (
        <tr className="loading-row">
            <td colSpan={columns}>
                <div className="loading-cell"><div className="spinner" /></div>
            </td>
        </tr>
    )
}
