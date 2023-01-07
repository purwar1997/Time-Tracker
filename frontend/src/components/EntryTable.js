const EntryTable = function ({ entry }) {
  const date = date => `${date.split(' ')[1]} ${date.split(' ')[2]}`;

  return (
    <>
      {entry ? (
        <table className="mx-auto mt-12 w-full md:w-5/6 lg:w-3/4">
          <thead className="bg-[#f5f5f5]">
            <tr className="border">
              <th className="px-3 sm:px-5 py-2 text-gray-700 font-medium">Date</th>
              <th className="px-3 sm:px-5 py-2 text-gray-700 font-medium">Hours studied</th>
              <th className="px-3 sm:px-5 py-2 text-gray-700 font-medium">Hours wasted</th>
              <th className="px-3 sm:px-5 py-2 text-gray-700 font-medium">Hours studied (%)</th>
            </tr>
          </thead>

          <tbody>
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
          </tbody>
        </table>
      ) : (
        ''
      )}
    </>
  );
};

export default EntryTable;
