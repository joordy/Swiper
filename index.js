const express = require('express');
const bodyParser = require('body-parser');
const slug = require('slug');
const app = express();
const PORT = 4000;
const mongo = require('mongodb');
const assert = require('assert');

// const mongoose = require('mongoose')
require('dotenv').config();

// // Server aanroepen
var db = null
let url = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@" + process.env.DB_URL + process.env.DB_END;

mongo.MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
    if (err) {
        throw err
        console.log('Database is *niet* connected')
    } else if (client) {
        console.log('Connected to database');

    }
    db = client.db(process.env.DB_NAME)
})

// Middleware 
app.set('view engine', 'ejs');
app.set('views', 'view-ejs');
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));

// user data
let users = [{
    id: 10001,
    name: 'Kayleigh',
    age: 22,
    photo: 'user0001.jpg',
    work: 'Working at Google',
    desc: 'lorem',
    match: true
}, {
    seen: false,
    id: 10002,
    name: 'Vera',
    age: 21,
    photo: 'user0002.jpg',
    work: 'Student CMD',
    desc: 'lorem',
    match: true
}, {
    seen: false,
    id: 10003,
    name: 'Isabella',
    age: 18,
    photo: 'user0003.jpg',
    work: 'Student Teacher',
    desc: 'lorem',
    match: true
}, {
    seen: false,
    id: 10004,
    name: 'Sharon',
    age: 19,
    photo: 'user0004.jpg',
    work: 'Student CMD',
    desc: 'lorme',
    match: false
}, {
    seen: false,
    id: 10005,
    name: 'Georgina',
    age: 23,
    photo: 'user0005.jpg',
    work: 'Student Math',
    desc: 'melor',
    match: true
}, {
    seen: false,
    id: 10006,
    name: 'Roos',
    age: 20,
    photo: 'user0006.jpg',
    work: 'Student IT',
    desc: 'merol',
    match: true
}, {
    seen: false,
    id: 10006,
    name: 'Caroline',
    age: 21,
    photo: 'user0007.jpg',
    work: 'Student IT',
    desc: 'merol',
    match: true
}, {
    seen: false,
    id: 10006,
    name: 'Nancy',
    age: 21,
    photo: 'user0008.jpg',
    work: 'Student IT',
    desc: 'merol',
    match: true
}, {
    seen: false,
    id: 10006,
    name: 'Ashley',
    age: 21,
    photo: 'user0009.jpg',
    work: 'Student IT',
    desc: 'merol',
    match: true
}, {
    seen: false,
    id: 10006,
    name: 'Melanie',
    age: 21,
    photo: 'user0010.jpg',
    work: 'Student IT',
    desc: 'merol',
    match: true
}, {
    seen: false,
    id: 10006,
    name: 'Anna',
    age: 21,
    photo: 'user0011.jpg',
    work: 'Student IT',
    desc: 'merol',
    match: true
}, {
    seen: false,
    id: 10006,
    name: 'Meghan',
    age: 21,
    photo: 'user0012.jpg',
    work: 'Student IT',
    desc: 'merol',
    match: true
}, {
    seen: false,
    id: 10006,
    name: 'Annabel',
    age: 21,
    photo: 'user0013.jpg',
    work: 'Student IT',
    desc: 'merol',
    match: true
}, {
    seen: false,
    id: 10006,
    name: 'Robin',
    age: 21,
    photo: 'user0014.jpg',
    work: 'Student IT',
    desc: 'merol',
    match: true
}, {
    seen: false,
    id: 10006,
    name: 'Chelsea',
    age: 21,
    photo: 'user0015.jpg',
    work: 'Student IT',
    desc: 'merol',
    match: true
}, {
    seen: false,
    id: 10006,
    name: 'Romy',
    age: 21,
    photo: 'user0016.jpg',
    work: 'Student IT',
    desc: 'merol',
    match: true
}, {
    seen: false,
    id: 10006,
    name: 'Michella',
    age: 21,
    photo: 'user0017.jpg',
    work: 'Student IT',
    desc: 'merol',
    match: true
}];

// object with 2 arrays, one for liked, one for all users.
let totalData = { liked: [], users };

// var json = JSON.stringify(users);
// console.log(json)

// routing of EJS pages
app.get('/', (req, res) => {
    //     db.collection('allUsers').find().toArray(done)

    //     function done(err, data) {
    //         if (err) {
    //             next(err)
    //         } else {
    //             res.render('test.ejs', { data: data })
    //         }
    //     }
    // })

    // function done(err, data) {
    //     if (err) {
    //         console.log('fail')
    //     } else {
    //         res.render('test', { users: collection })
    //     }
    // }
    // // db.collection('allUsers').find().toArray(done)
    // const collection = db.collection('allUsers');

    // collection.find().toArray(complete);

    // function complete(err, data) {
    //     if (err) {
    //         next(err)
    //     } else {
    //         res.render('index', { users: collection })
    //     }
    // }

    // function complete(err, data) {
    //     if (err) {
    //         res.render('404');
    //     } else if {
    //         res.render('index', {
    //             users: totalData
    //         });
    //     } else {
    //         res.send('fail');
    //     }
    // }
    // function done(err, data) {
    //     if (err) {
    //         next(err)
    //     } else {
    //         res.render('index', { totalData })
    //     }
    // }

    res.render('index', totalData);
});

app.get('/test', (req, res) => {
    db.collection('users.allUsers').find().toArray(done)

    function done(err, data) {
        if (err) {
            next(err)
        } else {
            console.log(data)
            res.render('test.ejs', { data: data })
        }
    }

});

app.post('/match', (req, res) => {
    if (req.body.like) {
        let x = (totalData.users.length - 1);
        // console.log(x);
        totalData.liked.push(totalData.users[x]);
        totalData.users.pop();
        // console.log(totalData.users);
        let z = (totalData.liked.length - 1);
        res.render('match', { liked: totalData.liked[z] });
        console.log("Er is op de like gedrukt");
    } else if (req.body.dislike) {
        let x = (totalData.users.length - 1);
        totalData.users.pop();
        res.redirect('/');
        // schrijf logic voor de dislike.
        console.log("Er is niet op de like gedrukt");
    }
});


app.get('/profile', (req, res) => {
    res.render('profile', totalData);
});

app.get('/match', (req, res) => {
    res.render('match');
});

app.get('/matchlist', (req, res) => {
    res.render('matchlist', totalData);
    console.log(totalData.liked)
});

app.get('/*', (req, res) => {
    res.render('404');
});

// Server aanzetten
app.listen(4000, () => console.log(`App is listening on ${PORT}!`));