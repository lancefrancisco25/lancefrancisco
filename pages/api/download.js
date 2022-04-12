import stream from 'stream';
import { promisify } from 'util';
import fetch from 'node-fetch';
const path = require('path');
const fs = require("fs");

const pipeline = promisify(stream.pipeline);

const handler = async (req, res) => {
    const {url} = req.query;

    // const response = await fetch(url);
    const content = fs.readFileSync(url);
    console.log(content)
    // return res.send({send: response})
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=dummy.pdf');
    await pipeline(response.body, res);
};

export default handler;
