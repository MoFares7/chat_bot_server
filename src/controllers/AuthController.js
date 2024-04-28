// controllers/AuthController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

class AuthController {

        static async register(req, res) {
                try {
                        const { name, email, password } = req.body;

                        if (!name || !email || !password) {
                                return res.status(400).json({ error: 'Name, email, and password are required' });
                        }

                        const hashPassword = await bcrypt.hash(password, 10);

                        try {
                                const user = await User.create({
                                        name,
                                        email,
                                        password: hashPassword,
                                });

                                //! Generate JWT token
                                const token = jwt.sign({ userId: user.id, userEmail: user.email }, secretKey, { expiresIn: '10d' });

                                res.status(201).json({ id: user.id, name: user.name, token });
                        } catch (uniqueConstraintError) {
                                //! Handle unique constraint violation (duplicate name or email)
                                if (uniqueConstraintError.name === 'SequelizeUniqueConstraintError') {
                                        return res.status(400).json({ error: 'User with this name or email already exists' });
                                }
                                console.error('Error registering user:', uniqueConstraintError);
                                res.status(500).json({ error: error });
                        }
                } catch (error) {
                        console.error('Error registering user:', error);
                        res.status(500).json({ error: error });
                }
        }

        static async login(req, res) {
                try {
                        const { name, password } = req.body;
                        const user = await User.findOne({ where: { name } });

                        if (!user || !(await bcrypt.compare(password, user.password))) {
                                return res.status(401).json({ error: 'Invalid username or password' });
                        }

                      
                        const token = jwt.sign({ userId: user.id }, "qwe1234", { expiresIn: '10d' });
                        res.json({  token,  user });
                } catch (error) {
                        console.error('Error logging in:', error);
                        res.status(500).json({ error: error.message });
                }
        }

        static logout(req, res) {
                try {
                        res.json({ message: 'Logout successful' });
                }
                catch (error) {
                        res.status(500).send(error);
                }
        }
}

module.exports = AuthController;
