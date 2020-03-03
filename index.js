const express = require('express');
const path =require('path');
const exphbs = require('express-handlebars');
const members = require('./Members')

const logger = require('./middleware/logger');

const app = express();


// Middleware
// Init middleware example
app.use(logger)

// Handlebars Middlware https://www.npmjs.com/package/express-handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));  // default: ./views/layouts/main.handlebars -> ./views/layouts/<otherbody.hanlebars>
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes
// exphbs' main
app.get('/', (req, res) => res.render('index', {
    title: "Member App",
    members: members
}));

// Members api routes
app.use('/api/members', require('./routes/api/members'));

// Static routes
// static's main (Actally won't shown, which main put upper, which main will shown)
app.use(express.static(path.join(__dirname, 'public'))); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));