const Meetup = require('../models/meetups')
const fs = require('fs');
const path = require('path');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');


const conn = mongoose.createConnection(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

let gfs;

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    // all set!
})

exports.getMeetups = async (req, res) => {
    try {
        const meetups = await Meetup.find();

        return res.status(200).json({
            success: true,
            count: meetups.length,
            data: meetups
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

exports.addMeetup = async (req, res) => {
    try {

        const meetup = await Meetup.create(req.body);
        

        return res.status(201).json({
            success: true,
            data: meetup
        })
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message)
            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            console.log(err)
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            })
        }
    }
}

exports.toggleFavorite = async (req, res) => {
    try {
        const meetup = await Meetup.findById(req.params.id);

        let newFavoritedStatus = meetup.favorited ? false : true;

        const Favmeetup = await Meetup.findByIdAndUpdate(req.params.id, { favorited:  newFavoritedStatus },
            {useFindAndModify: false} );

        return res.status(200).json({
            success: true,
            data: Favmeetup
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}


exports.favoriteMeetup = async (req, res) => {
    try {
        const favorites = await Meetup.find({ favorited: true }).exec();
        return res.status(200).json({
            success: true,
            data: favorites
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

exports.deleteMeetup = async (req, res) => {
    try {
        const meetup = await Meetup.findById(req.params.id);

        console.log(meetup);
        if (!meetup) {
            return res.status(404).json({
                success: false,
                error: 'No meetup found'
            })
        } else {
            await meetup.remove();
            return res.status(200).json({
                success: true,
                data: {}
            })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

exports.getImage = (req, res) => {
    gfs.files.find().toArray((err, files) => {
        //Check if files 
        if(!files || files.length === 0) {
            res.render('index', {files: false});
        } else {
            files.map(file => {
                if(file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
                    file.isImage = true;
                } else {
                    file.isImage = false;
                }
            })
            res.render('index', {files: files});
        }
    })
}

exports.postImage = (req, res) => {
    res.json({file: req.file});
    //res.redirect('/'); 
}

exports.getFiles = (req, res) => {
    gfs.files.find().toArray((err, files) => {
        //Check if files 
        if(!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        } 

        return res.json(files);
    })
}

exports.getFilesbyName = (req, res) => {
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
        //Check if file
        if(!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exist'
            });
        } 

        return res.json(file);
    })
}

exports.getImagebyFileName = (req, res) => {
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
        //Check if file
        if(!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exist'
            });
        } 

        //Check if image
        if(file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            //readstream.pipe(res);
            let data = ''
            readstream.on('data', (chunk) => {
                data += chunk.toString('base64')
            })
            readstream.on('end', () => {
                res.send(data)
            })
        } else {
            res.status(404).json({
                err: 'No an image'
            })
        }
    })
};

exports.deleteImagebyName = (req, res) => {
    gfs.remove({_id: req.params.id, root: 'uploads'}, (err, gridStore) => {
        if(err) {
            return res.status(404).json({ err: err});
        }
        res.redirect('/');
    })
};