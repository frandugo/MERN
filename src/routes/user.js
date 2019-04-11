const express = require('express');
const router = express.Router();
bodyParser = require('body-parser').json();

const User = require('../models/users');

router.get('/', async (req, res) => {
	const users = await User.find();
	res.json(users);
});

router.get('/:id', async (req, res) => {
	const user = await User.findById(req.params.id);
	res.json(user);
});

router.post('/', bodyParser, async (req, res) => {
	const { name, email, password } = req.body;
	console.log('Data ', req.body );
	const users = new User({ name, email, password });
	await users.save();
	res.json({ status: 'The user was saved!' });
});


router.put('/:id', bodyParser, async (req, res) => {
	const { name, email, password } = req.body;
	const newData = { name, email, password } 
	await User.findByIdAndUpdate(req.params.id, newData);
	res.json({ status: 'User was updated successfully!' });
});

router.delete('/:id', async (req, res) => {
	await User.findByIdAndRemove(req.params.id);
	res.json({ status: 'user was deleted successfully!' });
});

module.exports = router;