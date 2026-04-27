var client = require('../redis.js');

async function cache(req, res, next)
{
  const data = await client.get(req.originalUrl);

  if (data !== null)
  {
    console.log("CACHE HIT:", req.originalUrl);
    const username = req.user?.username ?? null;
    const parsed = JSON.parse(data);

    // Hvis det er en liste
    if (Array.isArray(parsed))
    {
      return res.render('hotels', { hotels: parsed, username });
    }

    // Hvis det er ett hotell
    return res.render('hotel', { hotel: parsed, username });
  }
  else
  {
    next();
  }
}

module.exports = cache;