const axios = require("axios")

module.exports = {
    getLatest: async (req, res) => {
        try{
            const { data } = await axios.get("https://api.spotify.com/v1/browse/new-releases")
            res.status(200).json(data)
        }catch(error){
            res.status(500).json({error: "Server error fetching latests albums"})
        }
    },

    getSongs: async (req, res) => {
        try{
            const id = req.params.id
            const { data } = await axios.get(`https://api.spotify.com/v1/albums/${id}/tracks`)
            res.status(200).json(data)
        }catch(error){
            res.status(500).json({error: `Server error fetching tracks from album with id '${req.params.id}'`})
        }
    },

    searchAlbums: async (req, res) => {
        try{
            const search = req.params.search;
            const { data } = await axios.get(`https://api.spotify.com/v1/search?q=album%3A${search}&type=album`)
            res.status(200).json(data)
        }catch(error){
            res.status(500).json({error: `Server error fetching search results for albums with criteria '${req.params.search}'`})
        }
    }
}