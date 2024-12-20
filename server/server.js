require("dotenv").config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const lyricsFinder = require('lyrics-finder');


const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/refresh' , (req , res) => {
    const refreshToken = req.body.refreshToken;
    // console.log(refreshToken);
    // console.log('hi');
    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
        refreshToken,
    })

    spotifyApi.refreshAccessToken().then(
        data =>{
            res.json({
                accessToken: data.body.accessToken,
                expiresIn: data.body.expiresIn,
            })
            
        }).catch((err) =>{
            // console.log("it doesnt work!!\n\n")
            console.log(err);
            res.sendStatus(400);
        })
})

//all we need to do for our API so we can have access to the spotify api
app.post('/login',(req , res) => {  
    // 
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
    })
    spotifyApi.authorizationCodeGrant(code)
    .then( data => {
        // console.log("hello from the server.js login post endpoint ");
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
        // console.log("it workgjdskls!!\n\n");
    }).catch( (err) => {
        // console.log("\n\n", err);
        // console.log("it doesnt workhkhk!!\n\n")
        
        res.sendStatus(400);
    })
})

app.get('/lyrics', async (req , res) => {
    const lyrics = await lyricsFinder(req.query.artist , req.query.track)|| "No Lyrics Found"
    res.json({lyrics})
    
})

app.listen(3001);