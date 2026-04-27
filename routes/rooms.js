var { checkIfAuthorized, isAdmin } = require("./authMiddlewares")
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var RoomService = require("../services/RoomService")
var db = require("../models");
var roomService = new RoomService(db);
/* GET rooms listing. */
router.get('/', async function(req, res, next)
{
    const rooms = await roomService.get();
    const userId = req.user?.id ?? 0;
    const username = req.user?.username ?? null;
    const role = req.user?.role ?? null;
    res.render('rooms', { rooms, userId, username, role });
});

router.get('/:hotelId', async function(req, res, next)
{
  const rooms =  await roomService.getHotelRooms(req.params.hotelId);
  if(!rooms || rooms.length === 0)
  {
    return res.status(404).render('error', { message: "No rooms found"});
  }
  const userId = req.user?.id ?? 0;
  const username = req.user?.username ?? null;
  const role = req.user?.role ?? null;
  res.render('rooms', { rooms, userId, username, role });
});

router.post('/', /*checkIfAuthorized, isAdmin, jsonParser,*/ async function(req, res, next)
{
  let Capacity = req.body.Capacity;
  let PricePerDay = req.body.PricePerDay;
  let HotelId = req.body.HotelId;
  await roomService.create(Capacity, PricePerDay, HotelId);
  res.end()
});

router.post('/reservation', /*checkIfAuthorized,*/ jsonParser, async function(req, res, next)
{
    let userId = req.body.UserId;
    let roomId = req.body.RoomId;
    let startDate = req.body.StartDate;
    let endDate = req.body.EndDate;
    await roomService.rentARoom(userId, roomId, startDate, endDate);
    res.end()
  });

router.delete('/', jsonParser, async function(req, res, next)
{
  let id = req.body.id;
  await roomService.deleteRoom(id);
  res.end()
});

module.exports = router;
