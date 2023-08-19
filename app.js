const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;




app.get('/numbers', async (req, res) => {
    const urls = req.query.url;
    console.log(urls)
    if (!urls || !Array.isArray(urls)) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    const mergedNumbers = [];

    const requests = urls.map(async (url) => {
        try {
            const response = await axios.get(url, { timeout: 500 });
            if (response.status === 200) {
                mergedNumbers.push(...response.data.numbers);
            }
        } catch (error) {
            console.log(error)
        }
    });

    await Promise.all(requests);

    const uniqueNumbers = Array.from(new Set(mergedNumbers));
    uniqueNumbers.sort((a, b) => a - b);

    res.json({ numbers: uniqueNumbers });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
