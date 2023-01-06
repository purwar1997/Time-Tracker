import { useState } from 'react';
import axios from 'axios';
import EntriesTable from './EntriesTable';

const Div = function () {
  const [entries, setEntries] = useState('');

  const handleClick = async () => {
    try {
      const res = await axios.get('/api/getAllEntries');
      setEntries(res.data.data);
      console.log(res.data);
    } catch (err) {
      alert(err.response.data.message);
      console.log(err.response.data);
    }
  };

  return (
    <>
      <div className="mt-12 text-center space-y-5">
        <p className="text-lg">Want to access complete timesheet from the beginning ?</p>
        <button
          className="bg-[#656EF5] px-4 py-1.5 text-white rounded transition hover:opacity-80"
          onClick={handleClick}
        >
          Click Here
        </button>
      </div>

      <EntriesTable entries={entries} setEntries={setEntries} />
    </>
  );
};

export default Div;
