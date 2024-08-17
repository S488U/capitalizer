import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 3500;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Ensure the public directory is correctly referenced

// Set the views directory
app.set('views', path.join(__dirname, 'views'));
// Set EJS as the view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {
    errorText: '',
    dataString: '',
    getText: '',
  });
});

app.post('/submit', (req, res) => {
  if (!req.body.stringData) {
    res.render('index', {
      errorText: 'Enter something to capitalize',
    });
  } else {
    const input = req.body.stringData;

    function capitalize(e) {
      return e.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }).join(' ');
    }

    const result = capitalize(input);

    res.render('index', {
      getText: input,
      dataString: result,
      errorText: '',
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
