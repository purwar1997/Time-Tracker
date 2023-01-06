import Hour from '../models/hour.js';
import asyncHandler from '../services/asyncHandler.js';
import CustomError from '../utils/customError.js';

/**
 * @home
 * @request_type GET
 * @route http://localhost:4000/api/
 * @description Controller that returns an HTML element to the client
 * @parameters none
 * @returns HTML element
 */

export const home = asyncHandler(async (_req, res) => {
  res.status(201).send('<h1 style="text-align: center">Time Tracker</h1>');
});

/**
 * @createEntry
 * @request_type POST
 * @route http://localhost:4000/api/createEntry
 * @description Controller that allows user to create an entry in a database
 * @parameters hours
 * @returns entry object
 */

export const createEntry = asyncHandler(async (req, res) => {
  let { hours } = req.body;

  if (hours === '') {
    throw new CustomError('Please enter the no of hours', 401);
  }

  hours = Number(hours);

  if (isNaN(hours)) {
    throw new CustomError('Entered value should be a number', 401);
  }

  if (hours < 0 || hours > 11) {
    throw new CustomError('Entered value should be in between 0 and 11', 401);
  }

  const [, currMonth, currDate, currYear] = new Date().toString().split(' ');
  const dates = await Hour.find().select({ date: 1 });

  const result = dates.some(({ date: dateStr }) => {
    const [, month, date, year] = dateStr.split(' ');
    return currDate === date && currMonth === month && currYear === year;
  });

  if (result) {
    // throw new Error('You cannot pass more than one entry a day', 401);
  }

  let entry = new Hour({ hoursStudied: hours });
  entry = await entry.save();

  res.status(201).json({
    success: true,
    message: 'A new entry has been created',
    data: entry,
  });
});

/**
 * @getEntries
 * @request_type POST
 * @route http://localhost:4000/api/getEntries
 * @description Controller that allows user to fetch n number of entries
 * @parameters days
 * @returns an array of entry objects
 */

export const getEntries = asyncHandler(async (req, res) => {
  let { days } = req.body;

  if (days === '') {
    throw new CustomError('Please enter the no of days', 401);
  }

  days = Number(days);

  if (isNaN(days) || !Number.isInteger(days)) {
    throw new Error('Entered value should be an integer', 401);
  }

  const entries = await Hour.find();

  if (days < 1 || days > entries.length) {
    throw new Error(`Entered value should be in between 1 and ${entries.length}`);
  }

  res.status(201).json({
    success: true,
    message: `Entries of last ${days} days have been fetched`,
    data: entries.slice(entries.length - days).reverse(),
  });
});

/**
 * @getAllEntries
 * @request_type GET
 * @route http://localhost:4000/api/getAllEntries
 * @description Controller that allows user to fetch all the entries
 * @parameters none
 * @returns an array of all entry objects
 */

export const getAllEntries = asyncHandler(async (_req, res) => {
  const entries = await Hour.find();

  res.status(201).json({
    success: true,
    message: 'All the entries have been successfully fetched',
    data: entries.reverse(),
  });
});
