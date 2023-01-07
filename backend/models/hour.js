import mongoose from 'mongoose';

const hourSchema = new mongoose.Schema({
  hoursStudied: {
    type: Number,
    required: [true, 'Enter the no of hours you studied today?'],
    default: 0,
    min: 0,
    max: 11,
  },
  hoursWasted: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 11,
  },
  hoursStudiedInPercentage: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 100,
  },
  date: {
    type: String,
    default: new Date().toString(),
    required: true,
  },
});

hourSchema.pre('save', function (next) {
  this.hoursWasted = Math.round((11 - this.hoursStudied) * 10) / 10;
  this.hoursStudiedInPercentage = Math.round((this.hoursStudied * 100) / 11);
  next();
});

export default mongoose.model('Hour', hourSchema);
