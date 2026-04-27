var express = require('express');
var router = express.Router();
var db = require("../models");
var UserService = require("../services/UserService");
var userService = new UserService(db);
var HotelService = require("../services/HotelService");
var hotelService = new HotelService(db);

router.get('/', async function(req, res, next)
{
    try
    {

        if(req.user)
        {
            const user = await userService.getOne(req.user.id);

            if(!user)
                return res.status(404).render('error', { message: "User not found" });

                return res.render('start', {user, hotel});
        }
        else
        {
            const rate = await hotelService.getBestRate();

            if(!rate)
                return res.status(404).render('error', { message: "No ratings found" });

            const hotel = await hotelService.getHotelDetails(rate.HotelId, null);

            if(!hotel)
                return res.status(404).render('error', { message: "Hotel not found" });

            return res.render('start', {user, hotel});
        }

    }
    catch(err)
    {
        next(err);
    }
});


module.exports = router;










/*
var express = require('express');
var router = express.Router();
var hotelService = require('../services/HotelService');
var userService = require('../services/UserService');



router.get('/:userId ||', async function (req, res, next)
{
    const user = await userService.getUserService(req.params.userId);
    const getUserService = user.userService;
    if(!user.isLoggedIn)
    {
        return;
    }
    const userId = req.user?.id ?? 0;
    const username = req.user?.username ?? null;
    const role = req.user?.role ?? null;
    res.render('rooms', { rooms, userId, username, role });
});
*/