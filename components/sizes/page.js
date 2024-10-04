import React from "react";

const SizeChart = ({ charts }) => {
  const data = charts?.data;
  
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const headers = Object.keys(data[1]); // Extract headers from the first data object

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="font-medium text-xs mb-4">
        Size chart - In inches (Expected Deviation &lt; 3%)
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full font-light text-xs bg-white border border-gray-300">
          <thead>
            <tr>
              {data[0].map((header, idx) => (
                <th key={idx} className="px-4 py-2 border-b border-gray-300 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(1,).map((row, index) => (
              <tr key={index}>
                {headers.map((header, idx) => (
                  <td key={idx} className="px-4 py-2 border-b border-gray-300">
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SizeChart;
