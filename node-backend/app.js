import express from 'express';
import bodyParser from 'body-parser';
import mongoose from "mongoose";

import Post from './model/post.js'

//mongodb+srv://kvgonza1:6IOZEkyhgt1WA7KK@cluster0.yy39q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//6IOZEkyhgt1WA7KK kvgonza1

mongoose.connect(process.env.MongoDB)
    .then(() => {
        console.log('connected to db');
    }).catch(() => {
    console.log('connection failed');
});

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false})); //used for URL encoding, e.i. Hello%20World%26

//adding header data
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    console.log(post);

    post.save();

    res.status(201).json(
        {success: true}
    );
});

app.get('/api/posts', (req, res, next) => {
    const post = [
        {id: 'id1', title: 'First Server Side Title', content: 'First server side content'},
        {id: 'id2', title: 'Second Server Side Title', content: 'Second server side content'},
        {id: 'id2', title: 'Third Server Side Title', content: 'Third server side content'},
    ];
    res.status(200).json({success: true, data: post});
});

export default app;