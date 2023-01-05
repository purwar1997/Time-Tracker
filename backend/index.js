import app from './app';
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`App is listening on http://localhost:${PORT}`));
