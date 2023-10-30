const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors({ optionsSuccessStatus: 200 }));

app.get("/api/:date?", (req, res) => {
    const { date } = req.params;
    const result = new Date(date);
    const isValidDate = !isNaN(result);

    if (!date) {
        const currentDate = new Date();
        return res.json({
            unix: currentDate.getTime(),
            utc: currentDate.toUTCString(),
        });
    }
    
    if (isValidDate) {
        return res.json({
            unix: result.getTime(),
            utc: result.toUTCString(),
        });
    }
    
    if (/^\d{13}$/.test(date)) {
        const unixTimestampMillis = parseInt(date);
        
        const unixDate = new Date(unixTimestampMillis);
        
        return res.json({
            unix: unixDate.getTime(),
            utc: unixDate.toUTCString(),
        });
    }

    return res.json({
        error: "Invalid Date"
    });

});

app.listen(3000, () => {
    console.log("Server is running");
});
