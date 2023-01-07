import { useState } from 'react';
import axios from 'axios';
import EntriesTable from './EntriesTable';

const GetForm = function () {
  const [days, setDays] = useState('');
  const [entries, setEntries] = useState('');

  const handleSubmit = async event => {
    event?.preventDefault();

    try {
      const res = await axios.post('/api/getEntries', { days });
      setEntries(res.data.entries);
      console.log(res.data);
    } catch (err) {
      alert(err.response.data.message);
      console.log(err.response.data);
    }

    setDays('');
  };

  return (
    <>
      <form className="mt-12" action="" method="post" onSubmit={handleSubmit}>
        <div className="text-center space-y-5">
          <div className="flex flex-col gap-4 items-center sm:flex-row sm:justify-center sm:gap-5">
            <label className="text-lg" htmlFor="days">
              How many days of timesheet do you want to access ?
            </label>
            <input
              className="bg-[#f9f9f9] border rounded px-2.5 py-1.5 w-40 text-center sm:text-left focus:outline-[#656EF5]"
              type="text"
              name="days"
              id="days"
              value={days}
              onChange={event => setDays(event.target.value)}
            />
          </div>

          <button
            className="bg-[#656EF5] px-4 py-1.5 text-white rounded transition hover:opacity-80"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>

      <EntriesTable entries={entries} setEntries={setEntries} />
    </>
  );
};

export default GetForm;
