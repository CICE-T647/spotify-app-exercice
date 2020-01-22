const request = require("request")
const axios = require("axios")

let client_id = process.env.CLIENT_ID;
let client_secret = process.env.CLIENT_SECRET;

module.exports = {

    setToken: async (req, res, next) => {
        try {
            let spotifyUrl = 'https://accounts.spotify.com/api/token';

            var authOptions = {
                url: spotifyUrl,
                headers: {
                    Authorization: 'Basic ' + new Buffer(client_id + ':' + client_secret).toString('base64')
                },
                form: {
                    grant_type: 'client_credentials'
                },
                json: true
            };

            const token = await new Promise((resolve, reject) => {
                request.post(authOptions, (err, httpResponse, body) => {

                    if (err) {
                        reject({
                            ok: false,
                            mensaje: 'No se pudo obtener el token',
                            err
                        })
                    }

                    resolve(body.access_token)

                })
            })

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            next();

        } catch (error) {
            res.status(500).json("Could not obtain token from spotify")
        }
    }
}