const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
bodyParser = require('body-parser').json();

const Task = require('../models/tasks');

router.get('/', async (req, res) => {
	const tasks = await Task.find().populate('user');
	res.json(tasks);
});

router.get('/:id', async (req, res) => {
	const task = await Task.findById(req.params.id);
	res.json(task);
});

router.post('/', bodyParser, async (req, res) => {
	const { title, description, user } = req.body;
	console.log('Data ', req.body );
	const tasks = new Task({ title, description, user });
	await tasks.save();
	res.json({ status: 'The Task was saved!' });
});


router.put('/:id', bodyParser, async (req, res) => {
	const { title, description } = req.body;
	const newData = { title, description } 
	await Task.findByIdAndUpdate(req.params.id, newData);
	res.json({ status: 'Task was updated successfully!' });
});

router.delete('/:id', async (req, res) => {
	await Task.findByIdAndRemove(req.params.id);
	res.json({ status: 'Task was deleted successfully!' });
});


router.post('/upload', upload, (req, res) => {
	res.send(req.file);
});

module.exports = router;