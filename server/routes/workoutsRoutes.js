const workoutsRouter = require('express').Router();
const { getAllWorkout,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout } = require('../controllers/workoutCtrl');

const { protect } = require('../middleware/authMiddle');

// this function will fire first,
// if user want to access all or single routes he need to be authenticated.
workoutsRouter.use(protect)


// get all workouts
workoutsRouter.get('/', getAllWorkout);

// get single workout
workoutsRouter.get('/:id', getWorkout)

// post new workout
workoutsRouter.post('/', createWorkout)

// delete workout
workoutsRouter.delete('/:id', deleteWorkout)


// update workout
workoutsRouter.patch('/:id', updateWorkout)


module.exports = workoutsRouter;
