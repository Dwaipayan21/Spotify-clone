import {Song} from "../models/song.model.js";

export const getAllSongs = async (req, res, next ) => {
    try {
        //-1 => Descending (newest to oldest)
        //+1 => Asscending (oldest to newest)
        const songs = await Song.find().sort({createdAt : +1});
        res.status(200).json(songs);
    } catch (error) {
        next(error);
    }
};

export const getFeaturedSongs = async(req, res, next) =>{
    try {
        //fetch random 6 songs using aggregate pipeline of
        const songs = await Song.aggregate([
            {
                $sample:{size:6}
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1,
                }
            }
        ]);

        res.status(200).json(songs);
    } catch (error) {
        next(error);
    }
};

export const getMadeForYouSongs = async(req, res, next) =>{
    try {
        // when user clicks show all all the songs appears in random order 
        const limit = parseInt(req.query.limit) || 4;
        //fetch random 4 songs using aggregate pipeline of
        const songs = await Song.aggregate([
            {
                $sample:{size:limit}
            },
            {
                $lookup: {
                    from: "albums", //mongodb collection name 
                    localField: "albumId",
                    foreignField: "_id",
                    as: "album"
                }
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1,
                    albumTitle: { $arrayElemAt: ["$album.title", 0]}
                }
            }
        ]);

        res.status(200).json(songs);
    } catch (error) {
        next(error);
    }
};

export const getTrendingSongs = async(req, res, next) =>{
    try {

        const limit = parseInt(req.query.limit) || 4;
        //fetch random 4 songs using aggregate pipeline of
        const songs = await Song.aggregate([
            {
                $sample:{size:limit}
            },
            {
                $lookup: {
                    from: "albums", //mongodb collection name 
                    localField: "albumId",
                    foreignField: "_id",
                    as: "album"
                }
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1,
                    albumTitle: { $arrayElemAt: ["$album.title", 0]}
                }
            }
        ]);

        res.status(200).json(songs);
    } catch (error) {
        next(error);
    }
};