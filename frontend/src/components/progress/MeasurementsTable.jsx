const MeasurementsTable = ({ progress = [] }) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <div className="p-5 border-b">
        <h2 className="text-lg font-semibold">
          Measurement History
        </h2>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Weight</th>
              <th className="px-4 py-3 text-left">Body Fat</th>
              <th className="px-4 py-3 text-left">Chest</th>
              <th className="px-4 py-3 text-left">Waist</th>
              <th className="px-4 py-3 text-left">Arms</th>
              <th className="px-4 py-3 text-left">Thighs</th>
            </tr>
          </thead>

          <tbody>

            {progress.map((item) => (
              <tr
                key={item._id}
                className="border-t"
              >
                <td className="px-4 py-3">
                  {new Date(item.date).toLocaleDateString()}
                </td>

                <td className="px-4 py-3">
                  {item.weight} kg
                </td>

                <td className="px-4 py-3">
                  {item.bodyFat || "-"}%
                </td>

                <td className="px-4 py-3">
                  {item.chest || "-"} cm
                </td>

                <td className="px-4 py-3">
                  {item.waist || "-"} cm
                </td>

                <td className="px-4 py-3">
                  {item.arms || "-"} cm
                </td>

                <td className="px-4 py-3">
                  {item.thighs || "-"} cm
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default MeasurementsTable;