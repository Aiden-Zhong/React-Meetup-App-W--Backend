const express = require('express');
const router = express.Router();
const upload = require('../upload/uploadStorageEngine');
const { getMeetups, addMeetup, deleteMeetup, favoriteMeetup, toggleFavorite, postImage, getFiles, getImagebyFileName, deleteImagebyName, getImage, getFilesbyName} = require('../controllers/meetupControllers');


router
    .route('/')
    .get(getMeetups);

router
    .route('/new-meetup')
    .post(upload, addMeetup);

router
    .route('/favorites')
    .get(favoriteMeetup);

router
    .route('/:id')
    .delete(deleteMeetup)
    .put(toggleFavorite);


module.exports = router;