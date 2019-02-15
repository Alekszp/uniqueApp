import express from 'express';
import path from 'path';
const app = express();

app.use('/dist', express.static('./dist'));

app.get('/*', (req, res)=> {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(7001, '0.0.0.0', ()=> {
    console.log('Server is up to running on 7001 port');
});