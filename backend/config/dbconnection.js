import mongoose from 'mongoose';
const { MONGODB_URL } = process.env;

async function connect() {
  try {
    const res = await mongoose.connect(MONGODB_URL);
    console.log(`Database connection success: ${res.connection.host}`);
  } catch (err) {
    console.log('Database connection failed');
    console.log(`${err.name}: ${err.message}`);
    process.exit(1);
  }
}

export default connect;
