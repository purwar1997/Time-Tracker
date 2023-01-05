import mongoose from 'mongoose';
import app from './app.js';
import config from './config/config.js';

(async () => {
  try {
    const res = await mongoose.connect(config.MONGODB_URL);
    console.log(`Database connection success: ${res.connection.host}`);

    app.listen(config.PORT, () =>
      console.log(`App is listening on http://localhost:${config.PORT}`)
    );
  } catch (err) {
    console.log('Database connection failure');
    console.log(`${err.name}: ${err.message}`);
    process.exit(1);
  }
})();
