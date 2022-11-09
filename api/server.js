// BUILD YOUR SERVER HERE
const express = require('express');
const Users = require('./users/model');

const server = express();

server.use(express.json());

server.post('/api/users', async (req, res) => {
    try {
        const {name, bio} = req.body;
        if(!name || !bio) {
            res.status(400).json({
                message: "Please provide name and bio for the user"
            });
        } else {
            const newUser = await Users.insert({name, bio});
            console.log(newUser);
            res.status(201).json({
                id: newUser.id,
                name: newUser.name,
                bio: newUser.bio
            });
        }
    } catch(err) {
        res.status(500).json({
            message: `There was an error while saving the user to the database`
        });
    }
})

// server.get('/api/users', async (req, res) => {
//     try {

//     } catch(err) {

//     }
// });

module.exports = server;
