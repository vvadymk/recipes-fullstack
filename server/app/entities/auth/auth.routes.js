const {Router} = require('express');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('./user.schema');
const router = Router();

router.use(express.json({extended:true}));
// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Invalid pass').isLength({min:6})
    ],
    async (req, res)=> {
    try{
        console.log(req.body);
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(
                {
                    errors: errors.array(),
                    message: 'Invalid registration data'
                }
            )
        }

        const{email, password} = req.body;
        const candidate = await User.findOne({email: email});
        console.log(candidate);
        if(candidate){
            return res.status(400).json({message: 'Such email already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User ({email, password:hashedPassword});

        await user.save();

        res.status(201).json({message: "User created"});
    }catch (e) {
        res.status(500).json({message: "Something went wrong, try once more"});
    }
});

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Enter valid email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res)=> {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json(
                    {
                        errors: errors.array(),
                        message: 'Invalid sign in data'
                    }
                )
            }

            const {email, password} = req.body;
            const user = await User.findOne({email});

            if(!user) {
                return res.status(400).json({message: 'User not found'});
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                return res.status(400).json({message: 'Invalid pass, try once more'});
            }

            const token = jwt.sign(
                { userId: user.id},
                "123456",
                { expiresIn: '1h'}
            );

            res.json({ token, userId: user.id });


        }catch (e) {
            res.status(500).json({message: "Something went wrong, try once more"});
        }
});

module.exports = router
