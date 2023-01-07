const EntriesTable = function ({ entries, setEntries }) {
  const date = date => `${date.split(' ')[1]} ${date.split(' ')[2]}`;

  const totalHoursStudied = () =>
    entries.reduce((total, { hoursStudied }) => total + hoursStudied, 0);

  const totalHoursWasted = () => entries.reduce((total, { hoursWasted }) => total + hoursWasted, 0);

  const totalHoursStudiedInPercentage = () =>
    Math.round(
      entries.reduce((total, { hoursStudiedInPercentage }) => total + hoursStudiedInPercentage, 0) /
        entries.length
    );

  return (
    <>
      {entries.length ? (
        <table className="mx-auto mt-12 w-full md:w-5/6 lg:w-3/4">
          <thead className="bg-[#f5f5f5]">
            <tr className="border">
              <th className="px-2 sm:px-5 py-2 text-gray-700 font-medium">Date</th>
              <th className="px-2 sm:px-5 py-2 text-gray-700 font-medium">Hours studied</th>
              <th className="px-2 sm:px-5 py-2 text-gray-700 font-medium">Hours wasted</th>
              <th className="px-2 sm:px-5 py-2 text-gray-700 font-medium">Hours studied (%)</th>
            </tr>
          </thead>

          <tbody>
            {entries.map(entry => (
              <tr className="border">
                <td className="px-3 sm:px-5 py-2 text-center">{date(entry.date)}</td>
                <td className="px-3 sm:px-5 py-2 text-center">{entry.hoursStudied}</td>
                <td className="px-3 sm:px-5 py-2 text-center">{entry.hoursWasted}</td>
                <td
                  className={`px-3 sm:px-5 py-2 text-center ${
                    entry.hoursStudiedInPercentage < 75 ? 'text-red-500' : 'text-green-500'
                  }`}
                >
                  {entry.hoursStudiedInPercentage}
                </td>
              </tr>
            ))}

            <tr className="border">
              <td className="px-3 sm:px-5 py-2 text-center">Total</td>
              <td className="px-3 sm:px-5 py-2 text-center">{totalHoursStudied()}</td>
              <td className="px-3 sm:px-5 py-2 text-center">{totalHoursWasted()}</td>
              <td
                className={`px-3 sm:px-5 py-2 text-center ${
                  totalHoursStudiedInPercentage() < 75 ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {totalHoursStudiedInPercentage()}
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr className="border">
              <td className="px-3 sm:px-5 py-2 text-center" colSpan={4}>
                <button className="text-blue-500" onClick={() => setEntries('')}>
                  Hide
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      ) : (
        ''
      )}
    </>
  );
};

export default EntriesTable;
