const router = require('express').Router();
const fetch = require('node-fetch');
require('dotenv').config()

router.get('/', (req, res) => {
  res.render('index', {
    city: null,
    des: null,
    icon: null,
    temp: null,
    temp_max: null,
    temp_min: null
  });
});

router.post('/', async (req, res) => {
  const city = req.body.city;
  const url_api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`;

  try {
    await fetch(url_api)
      .then(res => res.json())
      .then(data => {
        if (data.message === 'city not found') {
          res.render('index', {
            city: data.message,
            des: null,
            icon: null,
            temp: null,
            temp_max: null,
            temp_min: null,
          })
        } else {
          const city = data.name;
          const des = data.weather[0].description;
          const icon = data.weather[0].icon;
          const temp = data.main.temp;
          const temp_max = data.main.temp_max;
          const temp_min = data.main.temp_min;

          res.render('index', {
            city, des, icon, temp, temp_max, temp_min
          });
        }
      });

  } catch (err) {
    res.render('index', {
      city: 'something wrong',
      des: null,
      icon: null,
      temp: null,
      temp_max: null,
      temp_min: null
    })
  }

})


module.exports = router;