fetch('http://127.0.0.1:3000/api/search')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
