import Hour from '../models/hour';
import asyncHandler from '../services/asyncHandler';
import CustomError from '../utils/customError';

export const createEntry = asyncHandler(async (req, res) => {
  const { hours } = req.body;

  if (!hours) {
    throw new CustomError('Please enter the no of hours', 401);
  }

  if (typeof hours !== Number) {
    throw new CustomError('Entered value should be a number', 401);
  }

  if (hours < 0 || hours > 11) {
    throw new CustomError('Entered value should be in between 0 and 11', 401);
  }

  const currDate = new Date();
  const dates = await Hour.find().select({ createdAt: 1 });

  const result = dates.some(
    ({ createdAt: date }) =>
      date.getDay() === currDate.getDay() &&
      date.getMonth() === currDate.getMonth() &&
      date.getFullYear() === currDate.getFullYear()
  );

  if (result) {
    throw new Error('You cannot pass more than one entry a day', 401);
  }

  let entry = new Hour({ hoursStudied: hours });
  entry = await entry.save();

  res.status(201).json({
    success: true,
    message: 'A new entry has been created',
    data: entry,
  });
});

export const getEntries = asyncHandler(async (req, res) => {
  const { days } = req.body;

  if (!days) {
    throw new CustomError('Please enter the no of days', 401);
  }

  if (!(typeof days === Number && Number.isInteger(days))) {
    throw new Error('Entered value should be an integer', 401);
  }

  const entries = await Hour.find();

  if (days < 1 && days > entries.length) {
    throw new Error(`Entered value should be in between 0 and ${entries.length}`);
  }

  res.status(201).json({
    success: true,
    message: `Entries of last ${entries.length} days have been fetched`,
    data: entries.slice(days),
  });
});

export const getAllEntries = asyncHandler(async (_req, res) => {
  const entries = await Hour.find();

  res.status(201).json({
    success: true,
    message: 'All the entries have been successfully fetched',
    data: entries,
  });
});
