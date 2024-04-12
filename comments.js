//Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

//Read file
const readFile = (fileName, callback, returnJson = false, encoding = 'utf8') => {
    fs.readFile(fileName, encoding, (err, data) => {
        if (err) {
            console.log(err);
        }
        callback(returnJson ? JSON.parse(data) : data);
    });
};

//Write file
const writeFile = (fileName, data, callback, encoding = 'utf8') => {
    fs.writeFile(fileName, data, encoding, (err) => {
        if (err) {
            console.log(err);
        }
        callback();
    });
};

//Read comments from file
const COMMENTS_FILE = 'comments.json';
app.get('/api/comments', (req, res) => {
    readFile(COMMENTS_FILE, (data) => {
        res.setHeader('Cache-Control', 'no-cache');
        res.json(data);
    });
});

//Add a comment
app.post('/api/comments', (req, res) => {
    readFile(COMMENTS_FILE, (data) => {
        const comments = data;
        const newComment = {
            id: Date.now(),