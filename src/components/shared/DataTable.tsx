import React from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
  isMono?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  expandable?: boolean;
  renderExpansion?: (item: T) => React.ReactNode;
}

function DataTable<T>({ 
  columns, 
  data, 
  onRowClick, 
  isLoading = false,
  emptyMessage = 'Aucune donnée disponible.',
  expandable = false,
  renderExpansion
}: DataTableProps<T>) {
  const [expandedRows, setExpandedRows] = React.useState<Record<number, boolean>>({});

  const toggleRow = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedRows(prev => ({ ...prev, [idx]: !prev[idx] }));
  };
  return (
    <div className="w-full bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-sm)]">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[var(--bg-muted)]/30">
              {expandable && <th className="w-10 border-bottom border-[var(--border-light)]"></th>}
              {columns.map((col, idx) => (
                <th 
                  key={idx}
                  className={`
                    px-4 py-3 text-left
                    text-[11px] font-medium text-[var(--text-muted)]
                    uppercase tracking-[0.06em] border-bottom border-[var(--border-light)]
                    ${col.className || ''}
                  `}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--bg-muted)]">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {columns.map((_, idx) => (
                    <td key={idx} className="px-4 py-4 truncate">
                      <div className="h-4 bg-[var(--bg-muted)] rounded w-full"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-[var(--text-muted)] italic font-body">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, rowIdx) => (
                <React.Fragment key={rowIdx}>
                  <tr 
                    onClick={() => onRowClick?.(item)}
                    className={`
                      transition-colors duration-100
                      ${onRowClick ? 'cursor-pointer hover:bg-[var(--bg-muted)]/40' : ''}
                      ${expandedRows[rowIdx] ? 'bg-[var(--bg-muted)]/20' : ''}
                    `}
                  >
                    {expandable && (
                      <td className="px-4 py-3 w-10">
                        <button 
                          onClick={(e) => toggleRow(rowIdx, e)}
                          className="p-1 rounded-md hover:bg-[var(--bg-muted)] text-[var(--text-secondary)] transition-colors"
                        >
                          <span className={`material-symbols-outlined text-[20px] transition-transform duration-200 ${expandedRows[rowIdx] ? 'rotate-180' : ''}`}>
                            keyboard_arrow_down
                          </span>
                        </button>
                      </td>
                    )}
                    {columns.map((col, colIdx) => {
                      const value = typeof col.accessor === 'function' 
                        ? col.accessor(item) 
                        : (item[col.accessor] as React.ReactNode);
                      
                      return (
                        <td 
                          key={colIdx} 
                          className={`
                            px-4 py-3 text-[14px] text-[var(--text-secondary)]
                            ${col.isMono ? 'font-mono' : 'font-body'}
                            ${col.className || ''}
                          `}
                        >
                          {value}
                        </td>
                      );
                    })}
                  </tr>
                  {expandable && expandedRows[rowIdx] && renderExpansion && (
                    <tr className="bg-[var(--bg-muted)]/10 animate-in fade-in slide-in-from-top-1 duration-200">
                      <td colSpan={columns.length + 1} className="p-0">
                        {renderExpansion(item)}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
