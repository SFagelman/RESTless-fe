import axios from 'axios';

const backEndClient = axios.create({
	baseURL: 'https://restless-be.fly.dev',
	timeout: 5000
});

const fetchFilteredExercises = (selectedBodyPart, selectedEquipment, selectedTarget) => {
	let queryString = '';
	selectedBodyPart = selectedBodyPart.replace(/ /g, '%20');
	selectedEquipment = selectedEquipment.replace(/ /g, '%20');
	selectedTarget = selectedTarget.replace(/ /g, '%20');

	if (selectedBodyPart === 'blank' && selectedEquipment === 'blank' && selectedTarget === 'blank') {
		queryString = '/api/exercises';
	} else {
		queryString = '/api/exercises?';
	}

	if (selectedBodyPart != 'blank') {
		queryString += `body_part=${selectedBodyPart}&`;
	}
	if (selectedEquipment != 'blank') {
		queryString += `equipment=${selectedEquipment}&`;
	}
	if (selectedTarget != 'blank') {
		queryString += `target=${selectedTarget}&`;
	}
	if (queryString[queryString.length - 1] === '&') {
		queryString = queryString.slice(0, -1);
	}
	return backEndClient
		.get(queryString)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err;
		});
};

const fetchAllExercises = () => {
	return backEndClient
		.get('/api/exercises')
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

const postNewWorkout = (workoutName, userName, restTimer) => {
	const workout = { workout_name: workoutName, rest_timer: restTimer, exercises: [] };
	return backEndClient.post(`/api/workouts/${userName}`, workout).then((res) => {
		return res;
	});
};

const deleteWorkout = (workoutName, userName) => {
	console.log(workoutName);
	return backEndClient
		.delete(`/api/workouts/${userName}`, { data: { workout_name: workoutName } })
		.then((res) => {
			return res;
		})
		.catch((err) => {
			return err;
		});
};

const patchCurrentWorkout = (currentWorkout, userName) => {
	return backEndClient.patch(`/api/workouts/${userName}`, currentWorkout).then((res) => {
		return res;
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

const fetchWorkoutPlans = () => {
	return backEndClient
		.get('/api/workoutplans')
		.then((res) => {
			return res;
		})
		.catch((err) => {
			console.log(err);
			return err;
		});
};

const fetchAllBodyParts = () => {
	return backEndClient
		.get(`/api/bodyparts`)
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

const fetchAllTargets = () => {
	return backEndClient
		.get(`/api/target`)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			return err;
		});
};

const fetchAllEquipment = () => {
	return backEndClient
		.get(`/api/equipment`)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			return err;
		});
};

export {
	fetchFilteredExercises,
	fetchAllExercises,
	attemptUserLogin,
	postNewWorkout,
	patchCurrentWorkout,
	fetchAllWorkouts,
	fetchWorkoutPlans,
	fetchAllBodyParts,
	fetchAllTargets,
	fetchAllEquipment,
	fetchExerciseById,
	deleteWorkout
};
