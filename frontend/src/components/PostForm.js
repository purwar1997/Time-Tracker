import { useState, useEffect } from 'react';
import axios from 'axios';
import GetForm from './GetForm';
import Div from './Div';
import EntryTable from './EntryTable';

const PostForm = function () {
  const [hours, setHours] = useState('');
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('/api/getAllEntries');
        setEntries(res.data.entries);
      } catch (err) {
        console.log(err.response.data);
      }
    }

    fetchData();
  }, [entries]);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const res = await axios.post('/api/createEntry', { hours });
      setEntry(res.data.entry);
      console.log(res.data);
    } catch (err) {
      alert(err.response.data.message);
      console.log(err.response.data);
    }

    setHours('');
  };

  return (
    <>
      <form className="mt-10 sm:mt-12" action="" method="post" onSubmit={handleSubmit}>
        <div className="text-center space-y-5">
          <div className="flex flex-col gap-4 items-center sm:flex-row sm:justify-center sm:gap-5">
            <label className="text-lg" htmlFor="hours">
              How many hours have you studied today ?
            </label>
            <input
              className="bg-[#f9f9f9] border rounded px-2.5 py-1.5 w-40 text-center sm:text-left  focus:outline-[#656EF5]"
              type="text"
              name="hours"
              id="hours"
              value={hours}
              onChange={event => setHours(event.target.value)}
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

      <EntryTable entry={entry} />

      {entries.length ? (
        <>
          <GetForm />
          <Div />
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default PostForm;
