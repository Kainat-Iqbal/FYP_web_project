const DB = require("../DB/dbConfig");


const viewimages = async (req, res) => {
    const queryToViewimages = `
        SELECT * from course_images
    `;
    DB.query(queryToViewimages, (err, results) => {
        if (err) {
            console.error("Error fetching image:", err);
            return res.status(500).json("Failed to fetch image");
        } else {
            //Convert BLOB to Base64
            const base64Images = results.map(row => {
                return {
                    imageId: row.imageId,
                    image: row.image.toString('base64')
                };
            });
            return res.json(base64Images);
        }
    });
};

module.exports = { viewimages };