'use strict';

import express from 'express';
import reactViews from 'express-react-views';

import routes from './routes/index';
import states from './api/states';

const app = express();

app.use('/dist', express.static('dist'));
app.set('port', 3000);
app.set('views', `${__dirname}/views`);

//-- Set up view engine
app.set('view engine', 'js');
app.engine('js', reactViews.createEngine());

app.listen(app.get('port'));

app.use('/', routes);
app.use('/api/states', states);