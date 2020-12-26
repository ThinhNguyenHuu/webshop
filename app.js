require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const hbs = require('hbs');
const session = require("express-session");
const flash = require('connect-flash');

const passport = require('./passport');
const indexRouter = require('./routes/index');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');
const cartRouter = require('./routes/cart');
const { ObjectId } = require('mongodb');

const app = express();

// view engine setup
app.engine('hbs', exphbs({
  defaultLayout: 'layout',
  extname: '.hbs',
  helpers: {
    // get rating from reviews
    
    rating: function (reviews) { 

      if (!reviews)
        return 0;

      let rating = 0;
      reviews.forEach(review => {
        rating += (review.value + review.quality + review.price);
      })
      
      return rating / (reviews.length * 3);
    },
    // get created date and convert to string
    getDateFromId: function (id) { 
      const date = new Date(id.getTimestamp());
      return [date.getDate(), date.getMonth(), date.getYear() + 1900].join('/'); 
    },
    dateToString: function (date) {
      return [date.getDate(), date.getMonth(), date.getYear() + 1900].join('/'); 
    },
    discountPrice: function (price, discount) { return price - price * discount / 100.0 },
    isNewProduct: function (id) { 
      const insertDate = Date.parse(id.getTimestamp());
      const diffTime = Date.now - insertDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays < 15;
    }
  }
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(fileupload({ useTempFiles: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());


app.use(session({ secret: 'keyboard cat',
                  resave: false,
                  saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());


app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
})

app.use('/', indexRouter);
app.use('/product', productRouter);
app.use('/user', userRouter);
app.use('/cart', cartRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
}); 

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
