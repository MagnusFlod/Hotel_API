async function addHotel(url)
{
    let name = prompt("Provide the new hotel's name")
    if(!name)
    {
        return;
    }
    let hotelLocation = prompt("Provide the new hotel's location")
    if(!hotelLocation)
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
        body: JSON.stringify
        ({
            Name: name,
            Location: hotelLocation
        })
    }).then((response) =>
    {
        if (response.ok)
        {
            location.reload();
        }
    })
    .catch((error) =>
    {
        alert("Error creating hotel");
    });
}