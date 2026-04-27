var cache = require('../middleware/caching.js');
var client = require('../redis.js');
var createError = require('http-errors');
var { checkIfAuthorized, isAdmin } = require("./authMiddlewares");
var { checkIfAuthorized } = require("./authMiddlewares");
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var HotelService = require("../services/HotelService");
var db = require("../models");
var hotelService = new HotelService(db);


router.get('/json', async function(req, res, next)
{
  const hotels = await hotelService.get();
  res.json(hotels);
});
/* GET hotels listing. */
router.get('/', /*cache,*/ async function(req, res, next)
{
   console.log("FETCH FROM DB:", req.originalUrl);
  // #swagger.tags = ['Hotels']
  // #swagger.description = "Gets all hotels or filters them by location."
  // #swagger.produces = ['text/html']

  // #swagger.parameters['location'] =
  // {
  //   in: 'query',
  //   description: 'Filter hotels by location',
  //   type: 'string'
  // }

  const location = req.query.location;

  let hotels;

  if(location)
  {
    hotels = await hotelService.getByLocation(location);
  }
  else
  {
    hotels = await hotelService.get();
  }

  const username = req.user?.username ?? null;

  // await client.set(req.originalUrl, JSON.stringify(hotels));

  res.status(200).render('hotels', { hotels, username });
});

router.get('/:hotelId', async function(req, res, next)
{
  const userId = req.user?.id ?? 0;
  const username = req.user?.username ?? null;
  const hotel = await hotelService.getHotelDetails(req.params.hotelId, userId);
  if (!hotel || !hotel.id)
  {
    return res.status(404).render('error', { message: "Hotel not found" });
  }

  // await client.set(req.originalUrl, JSON.stringify(hotel));

  res.render('hotel', { hotel, username });
});


router.post('/:hotelId/rate', /*checkIfAuthorized,*/ jsonParser, async function(req, res, next)
{
  let value = req.body.Value;
  let userId = req.body.UserId;
  await hotelService.makeARate(userId, req.params.hotelId, value);
  res.end()
});

router.post('/', /*checkIfAuthorized, isAdmin,*/ jsonParser, async function(req, res, next)
{
  // #swagger.tags = ['Hotels']
  // #swagger.description = "Creates a new hotel."

  /* #swagger.parameters['body'] =
  {
    "name": "body",
    "in": "body",
    "schema":
    {
      $ref: "#/definitions/Hotel"
    }
  } */

  if(req.body.name == null || req.body.location == null)
  {
    next(createError(400, 'Both Name and Location need to be provided in the request'));
    return;
  }

  let Name = req.body.name;
  let Location = req.body.location;

  await hotelService.create(Name, Location);

  res.redirect('/hotels');
});

router.delete('/', /*checkIfAuthorized,*/ jsonParser, async function(req, res, next)
{
  let id = req.body.id;
  await hotelService.deleteHotel(id);
  res.end()
});

router.delete('/:id', /*checkIfAuthorized,*/ jsonParser, async function(req, res, next)
{
  await hotelService.deleteHotel(req.params.id);
  res.redirect('/hotels');
});

// Exporting
module.exports = router;