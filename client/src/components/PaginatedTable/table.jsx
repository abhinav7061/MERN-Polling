import { Spinner } from "../Loader/SpinLoader";

const Table = ({ data, loading = false, columns }) => {
    if (loading) return <div className="flex items-center justify-center w-full py-3"><Spinner /></div>
    return (
        <table className='min-w-fit text-sm'>
            <thead>
                <tr className="bg-slate-200">
                    {columns.map((column, idx) => (
                        <th className={`p-2 ${idx == 0 ? 'ps-6' : idx == columns.length - 1 ? 'pe-6' : ''}`} key={column.accessor}>{column.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, idx) => (
                    <tr key={idx} className={idx % 2 != 0 ? "bg-slate-200" : ''}>
                        {columns.map((column) => (
                            <td
                                className={`p-2 text-center`}
                                key={column.accessor}
                            >
                                {column.render ? column.render(item) : item[column.accessor]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table >
    );
};

export default Table;