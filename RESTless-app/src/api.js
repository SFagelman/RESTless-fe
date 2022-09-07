import axios from 'axios';

const backEndClient = axios.create({
	baseURL: 'https://restless-be.fly.dev',
	timeout: 5000
});

const fetchAllExercises = (topic = null, sort_by = null, order = null) => {
	if (sort_by === '') {
		sort_by = null;
	}
	return backEndClient
		.get('/api/exercises', { params: { sort_by, order, topic } })
		.then((res) => {
			return res;
		})
		.catch((err) => {
			return err;
		});
};

export default fetchAllExercises;
