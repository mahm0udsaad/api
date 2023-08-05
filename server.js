const express = require("express");
const axios = require("axios");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;
require('dotenv').config()
const API_key =process.env.API_key
const weatherApi=process.env.API_URL

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
  res.send('weather api')
})
app.post('/weather', async (req, res) => {
  const {lat , lon} = req.body
  const weatherUrl = `${weatherApi}?key=${API_key}&q=${lat},${lon}`;
  try {
    const response = await axios.get(weatherUrl);
    const data = response.data;
    res.send(data);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});
app.post('/weather/:city',async(req,res)=>{
  const city = req.params.city;
  try {
    const response = await axios.get( `${weatherApi}?key=${API_key}&q=${city}`);
    const data = response.data;
    res.send(data);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
})
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
