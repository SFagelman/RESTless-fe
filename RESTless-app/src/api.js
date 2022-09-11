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

const attemptUserLogin = (username = null, password = null) => {
	return backEndClient
		.get(`/api/users?user_name=${username}&user_password=${password}`)
		.then((res) => {
			if (res.data.user) {
				return res.data.user;
			}
		});
};

const fetchAllWorkouts = (username) => {
	return backEndClient
		.get(`/api/workouts/${username}`)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			return err;
		});
};

const fetchExerciseById = (id) => {
	return backEndClient
		.get(`/api/exercises`, { params: { id } })
		.then((res) => {
			return res.data[0];
		})
		.catch((err) => {
			return err;
		});
};

export { fetchAllExercises, attemptUserLogin, fetchAllWorkouts, fetchExerciseById };
