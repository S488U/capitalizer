import express from 'express';
import bodyParser from 'body-parser';
import path from 'path'; // Import the path module

const port = 3500;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

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
  if (req.body.stringData === null || req.body.stringData === '') {
    res.render('index', {
      errorText: 'Enter something to capitalize',
    });
  } else {
    let input = req.body.stringData;

    function capitalize(e) {
      let itemArray = [];
      const newArray = e.split(' ');
      newArray.forEach((item) => {
        var a = item.charAt(0).toUpperCase();
        var itemLength = item.length;
        var itemSliced = item.slice(1, itemLength);
        var b = itemSliced != null ? itemSliced.toLowerCase() : '';
        var itemJoined = a.concat(b);
        itemArray.push(itemJoined);
      });

      return itemArray.join(' ');
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
