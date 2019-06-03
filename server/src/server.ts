import { Application } from 'express';
import { Path } from 'history';
const path = require('path');
const express = require('express');

const port: string = process.env.PORT || '3000';
const publicPath: Path = path.join(__dirname, '../..', 'client/dist/public');
const app: Application = express();

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
