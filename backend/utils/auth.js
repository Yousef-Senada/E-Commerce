require('dotenv').config()
const jwt = require('jsonwebtoken')
const userModel = require('../Models/user.model')
const Secret_Key = process.env.Secret_Key

exports.createToken = (data) => {
    return jwt.sign(data, Secret_Key, {
        expiresIn: '1h',
    })
}

exports.authMW = async (req, res, next) => {
    try {
        let token
        if (req.header('authorization')) {
            token = req.header('authorization').split(' ')[1]
        }
        if (!token) {
            return res.status(404).json({ error: 'Access denied: token missing' })
        }
        const decoded = jwt.verify(token, Secret_Key)

        const currentUser = await userModel.findById(decoded.userId)

        if (!currentUser) {
            return res.status(404).json({ error: 'Access denied: User is not exist' })
        }

        if (!currentUser.active) {
            return res.status(404).json({
                error: 'Access denied: User is not active or blocked',
            })
        }

        next()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.adminMW = async (req, res, next) => {
    try {
        let token
        if (req.header('authorization')) {
            token = req.header('authorization').split(' ')[1]
        }
        const decoded = jwt.verify(token, Secret_Key)

        const currentUser = await userModel.findById(decoded.userId)
        if (!currentUser.userType === 'admin') {
            return res.status(404).json({ error: 'Access denied: User is not admin' })
        }

        next()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
