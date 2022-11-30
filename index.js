const cool = require('cool-ascii-faces');
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000;
const ALLOW_ORIGIN = process.env.DEV_MODE === 'true' ? 'http://localhost:4200' : 'https://lautarolorenz.github.io';
const cors = require('cors');
const app = express();

app.use(cors({ origin: ALLOW_ORIGIN }));

app
  .get('/menu-options', (req, res) => res.json([{ value: 'option 1' }, { value: 'option 2' }]));

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .get('/times', (req, res) => res.send(showTimes()))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));


showTimes = () => {
  let result = '';
  const times = process.env.TIMES || 5;
  for (i = 0; i < times; i++) {
    result += i + ' ';
  }
  return result;
}