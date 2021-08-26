const Register = require('../../../model/user.model');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();
describe('user.generateAuthToken', () =>{
    it('should return a valid JWT', () =>{
        const payload = {_id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true};
        const user = new Register(payload);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, process.env.tokenKey);
        expect(decoded).toMatchObject(payload);
    })
})