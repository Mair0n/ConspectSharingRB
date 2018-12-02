const express = require("express")
const users = express.Router()
const cors = require('cors')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const cnf = require("../config.json")
const nodemailer = require("nodemailer")
const client = require("../elsearch/index.js")
const { insertDocument, deleteDocument } = require('../utils/search.js')

const User = require("../models/User")
const Conspect = require("../models/Conspect")
users.use(cors())

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'misha.mironenko@gmail.com',
      pass: 'mair0n1998', 
    },
    tls : {
        rejectUnauthorized:false
    }
  });

users.post('/register', (req, res) => {
    const today = new Date()
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        created: today
    }

    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    User.create(userData)
                        .then(user => {
                            res.json({ status: user.email + ' registered' })
                        }).catch(err => {
                            res.send('error: ' + err)
                        });
                                jwt.sign(
                                    {
                                      user: userData.email,
                                    },
                                    cnf.emailConfirm.secret,
                                    {
                                      expiresIn: '1d',
                                    },(err, emailToken) => {
                                       
                                      const url = `http://localhost:3000/confirmation/${emailToken}`;
    
                                      transporter.sendMail({
                                        to: userData.email,
                                        subject: 'Confirm Email',
                                        html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
                                      }).then(console.log("Registered"));
                                    });
                                })

            } else {
                res.json({ error: "User already exists" })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

users.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (user) {
                if (user.confirmed) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {

                        let token = jwt.sign(user.dataValues, cnf.emailConfirm.secret, {
                            expiresIn: 1440
                        })
                        res.send(token)
                    }
                } else {
                    res.status(400).json({error : "Confirm your email please"})
                }
            } else {

                res.status(400).json({ error: 'User does not exist' })
            }
        })
        .catch(err => {
            res.status(400).json({ error: err })
        })
})

users.post('/profile', (req,res) => {
    const id = req.body.id;
    client.search({
        index: cnf.elsearch.conspectIndex,
        type: cnf.elsearch.conspectType,
        body: {
            query: {
                match: {
                    userId:id
                }
            }
        }
    }).then(res => {
        const hits = []
        res.hits.hits.forEach(hit => {
            hits.push(hit._source)
        })
        return hits
    }).then(hits =>{
        res.send(hits)
    }).catch(error => {
        res.send(error)
    })
})

users.get('/confirmation/:token', (req, res) => {
    try {
      const userEmail = jwt.verify(req.params.token, cnf.emailConfirm.secret,);
      User.update({ confirmed: true }, { where: { email:userEmail.user } }).then(() => {
        console.log(userEmail.user);
        res.json({ status: userEmail.user + ' registered' })
      });
    } catch (e) {
      res.send('error');
    }
})

users.post('/conspectAdd', (req,res) => {
    const conspectData = {
        title: req.body.title,
        description: req.body.description,
        depNumber: req.body.depNumber,
        body: req.body.body,
        userId: req.body.user,
    }

    Conspect.create(conspectData)
    .then(conspect => {
        insertDocument(conspect, cnf.elsearch.conspectIndex, cnf.elsearch.conspectType, client)
        .then(resolve => {
            res.send(resolve)
        })
        .catch(error => console.error(error))
    }).catch(err => console.log(err));
})

users.post('/home', (req,res) => {
    client.search({
        index: cnf.elsearch.conspectIndex,
        q: 'rate:0'
    }).then(res => {
        const hits = []
        res.hits.hits.forEach(hit => {
            hits.push(hit._source)
        })
        return hits
    }).then(hits =>{
        res.send(hits)
    }).catch(error => {
        res.send(error)
    })
})

users.post('/conspect/:id', (req,res) => {
    const conspectId = req.params.id
    client.search({
        index: cnf.elsearch.conspectIndex,
        type: cnf.elsearch.conspectType,
        body: {
            query: {
                match: {
                    id:conspectId
                }
            }
        }
    }).then(result => {
        res.json(result.hits.hits[0]._source)
    })
})

users.post('/deleteUserConspects', (req,res) => {
    const conspectsId = req.body.conspect
    conspectsId.forEach(conspectId => {
            deleteDocument(conspectId, cnf.elsearch.conspectIndex, cnf.elsearch.conspectType, client)
    })
    res.send("deleted")
})

module.exports = users