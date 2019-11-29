'use strict';

import express from 'express';
import states from './states.json';

const router = express.Router();

router.get('/', (req, res) => {
	if (typeof req.query.term === 'undefined') {
		res.status(500).send({
			error: 'You must provide a search term'
		});
	}

	let filtered = [],
		count = 0;

	if(req.query.term === ''){
		res.send({
			count,
			data: filtered
		});
	}else{
		filtered = states.filter((value) => {
			const name = value.name.toLowerCase();
			const query = req.query.term.toLowerCase();

			return name.indexOf(query) !== -1;
		});

		let message;

		if(filtered.length === 0){
			message = 'No results found.';
		}

		res.send({
			count: filtered.length,
			data: filtered,
			message
		});
	}
});

export default router;