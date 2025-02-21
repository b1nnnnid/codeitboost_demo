//메인 서버 파일

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const memoryRoutes = require('./routes/memories');

const app = express();

app.use(bodyParser.json());
app.use('/memories', memoryRoutes);

// HTML 파일 서빙
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
