var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/user');

mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 8080;

var router = express.Router();

router.use((req, res, next) => {
  console.log('Something is happening.');
  next();
});

router.get('/', (req, res) => {
  res.json({ message: 'Hello from the other side' });
});

router.route('/users')
    .post((req, res) => {
      var user = new User();
      user.name = req.body.name;
      user.technician = req.body.technician;
      user.order_date = req.body.order_date;
      user.appt_type = req.body.appt_type;
      user.phone = req.body.phone;
      user.email = req.body.email;
      user.order_state = req.body.order_state;

      user.save((err) => {
          if (err)
          res.send(err);

          res.json({ message: 'User created!' });
        });
    })

    .get((req, res) => {
        User.find({}, (err, user) => {
          if (err)
            res.send(err);
          res.json(user);
        });
      });

app.use('/api', router);

app.listen(port);
console.log('App listens on port ' + port);
