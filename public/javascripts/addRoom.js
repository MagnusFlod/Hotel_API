async function addRoom(url)
{
    let capacity = prompt("Enter room capacity");
    if(!capacity)
    {
        return;
    }
    let price = prompt("Enter price per day");
    if(!price)
    {
        return;
    }
    let hotelId = prompt("Enter hotel ID");
    if(!hotelId)
    {
        return;
    }

    await fetch(url,
    {
        method: 'POST',
        headers:
        {
            'Content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify
        ({
            Capacity: capacity,
            PricePerDay: price,
            HotelId: hotelId
        })
    })
    .then((response) =>
    {
        if (response.ok)
        {
            alert("Room created");
            location.reload();
            return Promise.resolve();
        }
        return Promise.reject(response);
    })
    .catch((response) =>
    {
        alert(response.statusText);
    });
}