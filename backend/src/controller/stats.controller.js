import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";

export const getStats = async (req, res, next) => {
    try {
        const [totalSongs, totalAlbums, totalUsers, uniqueArtists] = await Promise.all([
            Song.countDocuments(),
            Album.countDocuments(),
            User.countDocuments(),
            // calculate unique artist
            Song.aggregate([
                {//fetch all the albums
                    $unionWith: {
                        coll: "albums",
                        pipeline: [],
                    },
                },
                {// group them with unique artist parameter
                    $group: {
                        _id: "$artist",
                    },
                },
                {  // count number of artist
                    $count: "count",
                },
            ]),
        ]);

        res.status(200).json({
            totalSongs,
            totalAlbums,
            totalUsers,
            totalArtists: uniqueArtists[0]?.count || 0
        });
    } catch (error) {
        next(error);
    }
};