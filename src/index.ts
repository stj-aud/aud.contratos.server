import * as express from 'express';
// Use different Routers to organize yout path groups

const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const hbs = require('hbs');
const moment = require('moment');

// The line below is added to format JSON output
app.set('json spaces', 2);

const PORT = process.env.PORT || 3000;

app.use(cors());

import mainRouter from './routers/main.router';
app.use('/',mainRouter);
import contratosRouter from './routers/contratos.router';
app.use('/contratos',contratosRouter);
//import fooRouter from './routers/foo.router';
//app.use('/foo',fooRouter);

// Use this if Global view variables are needed
app.use(function(req,res,next) {
	//res.locals.foo = "bar";
	res.locals.title = "YOUR TITLE HERE";
	next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerHelper('json',
	(object) =>
	{
		return JSON.stringify(object, null, 2);
	}
);
hbs.registerHelper('formata',
	(object) =>
	{
		if (object instanceof Date)
		{
			return moment(object).format('DD/MM/YYYY');
		}
		else
		{
			return object;
		}
		//
	}
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Setup public folder for static content
app.use(express.static(path.join(__dirname, '..', 'public')));

// Fallback error if route not found
app.use((req, res, next) => {
	const err = new Error('Not Found');
	res.status(404).json({message:'Route not found!'});
	//next(err);
});

app.listen(PORT, ()=>
{
	console.log('Server started at http://localhost:'+PORT);
});