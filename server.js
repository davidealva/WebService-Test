const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())

const token = process.env.TOKEN;
const url = `https://webhose.io/filterWebContent?token=${token}&size=25&sort=relevancy&latest=true&format=json&q=`

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))

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

// API route
app.get('/api', (req,res) => {
  const data = req.query.q
  console.log('in server: ',data)

  callApi(url, data)
  .then(data => {
    res.send({ data })
  })

});


app.listen(port, () => console.log(`Listening on port ${port}`));
