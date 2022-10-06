const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');


// get all workout
const getAllWorkout = async (req, res) => {

    // assign user workout id to user id 
    const user_id = req.user._id;

    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 }); // sort the workouts by newest first
    res.status(200).json(workouts);
}


// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params;

    // check if id is a valid 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findById(id);

    if (!workout) {
        return res.status(404).json({ error: 'No such workout' })
    }

    res.status(200).json(workout);
}


// create new workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body

    // add doc to db
    try {
        // assign user workout id to user id 
        const user_id = req.user._id;

        // using db modal to create a new document
        const workout = await Workout.create({ title, reps, load, user_id })
        res.status(200).json(workout)
    } catch (err) {
        res.status(400).json({ err: 'Please fill in all the fields' })
    }

}


// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    // check if id is a valid 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findOneAndDelete({ _id: id });

    // check if there is not such workout document 
    if (!workout) {
        return res.status(400).json({ error: 'No such workout' })
    }

    res.status(200).json(workout)
}


// update workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;
    const { title, reps, load } = req.body

    // check if id is a valid 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findOneAndUpdate({ id: id }, {
        title,
        reps,
        load
    });

    // check if there is not such workout document 
    if (!workout) {
        return res.status(400).json({ error: 'No such workout' })
    }
    res.status(200).json(workout);
}



module.exports = {
    createWorkout,
    getAllWorkout,
    getWorkout,
    deleteWorkout,
    updateWorkout
}