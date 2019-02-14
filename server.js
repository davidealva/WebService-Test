const express = require('express');
const axios = require('axios');
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3001;

app.use(cors())

const url = "https://webhose.io/filterWebContent?token=c9eb93cd-82b2-4f9d-98fe-9ec82a69013d&size=25&sort=relevancy&latest=true&format=json&q="

// API call with Axios
const callApi = (url, data) => {
  return axios.get(`${url}${data}`)
        .then(res => {
          this.res = res.data
          console.log(this.res)
          return this.res
        })
        .catch(error => {
          console.log(error);
        });
}


app.get('/api', (req,res) => {
  const data = req.query.q
  console.log('in server: ',data)

  callApi(url, data)
  .then(data => {
    res.send({ data })
  })

});


app.listen(port, () => console.log(`Listening on port ${port}`));
