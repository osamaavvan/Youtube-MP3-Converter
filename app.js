const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();

app.use(cors());
app.listen(4000, () => {
    console.log('Server Works !!! At port 4000');
});

app.get('/download', (req,res) => {
    var URL = req.query.URL;
    var VIDEO_ID = ytdl.getURLVideoID(URL)

    if (ytdl.validateURL(URL) && ytdl.validateID(VIDEO_ID)) {

	    ytdl.getInfo(URL, (err, info) => {
	    	if (err) {
	    		return res.send(err.message)
	    		
	    	} else if (Object.keys(info).length === 0) {
	    		return res.send("Invalid Video ID")

	    	} else {
	    		res.header('Content-Disposition', `attachment; filename="${info.title}.mp4"`);

				ytdl(URL, {
					filter: 'audioonly'
				    }).pipe(res);
			    }

	    })

    } else {
    	res.send("Invalid URL")
    }


})