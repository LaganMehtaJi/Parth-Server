import express, { urlencoded } from'express';
 import router from './routes/resume/resume.routes.js';

const app = express();
app.use(express.urlencoded({ extended: true }));


app.use('/', router);


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
