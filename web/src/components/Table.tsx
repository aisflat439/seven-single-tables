interface TableProps {
  headers: string[];
  rows: string[][];
}

export const Table = ({ headers, rows }: TableProps) => {
  return (
    <table className="block overflow-auto whitespace-nowrap">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2">Access Pattern</th>
          {headers.map((header) => (
            <th className="p-2" key={header}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          return (
            <tr key={row[0]}>
              {row.map((cell) => (
                <td className="py-1 px-2 text-center" key={cell}>
                  {cell}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
