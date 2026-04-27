async function deleteUser(url, userId)
{
  await fetch(url,
    {
    method: 'DELETE',
    headers:
    {
      'Content-type': 'application/json'
    },
    body: JSON.stringify
    ({
      id: userId
    })
  })
  .then((response) =>
  {
    if (response.ok)
    {
      location.reload();
    }
  })
  .catch((response) =>
  {
    alert(response.statusText);
  });
}