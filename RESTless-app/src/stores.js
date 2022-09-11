import { writable } from 'svelte/store';

export const currentUser = writable({ _id: '', user_name: '', user_password: '' });

export const currentWorkout = writable({
	workout_name: 'full body',
	user_name: 'Justin',
	rest_timer: '120',
	exercises: [
		{
			_id: '0834',
			name: 'weighted front raise',
			gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/0834.gif',
			target: 'delts',
			bodyPart: 'shoulders',
			equipment: 'weighted',
			NumberOfSets: 4,
			feedback: '',
			sets: [
				{
					weight: 10,
					reps: 10,
					time: 'null'
				},
				{
					weight: 10,
					reps: 10,
					time: 'null'
				},
				{
					weight: 10,
					reps: 10,
					time: 'null'
				},
				{
					weight: 10,
					reps: 10,
					time: 'null'
				}
			]
		},
		{
			_id: '1394',
			name: 'smith reverse calf raises',
			gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/1394.gif',
			target: 'calves',
			bodyPart: 'lower legs',
			equipment: 'smith machine',
			NumberOfSets: 3,
			feedback: '',
			sets: [
				{
					weight: 10,
					reps: 10,
					time: 'null'
				},
				{
					weight: 10,
					reps: 10,
					time: 'null'
				},
				{
					weight: 10,
					reps: 10,
					time: 'null'
				}
			]
		}
	]
});
