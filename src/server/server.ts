import * as express from 'express';
import * as path from 'path';
import apiRouter from './routes';

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(apiRouter);

app.use('*', (req, res) => {
    const indexHTMLFile = path.join(__dirname, '../public/index.html');
    res.sendFile(indexHTMLFile);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
