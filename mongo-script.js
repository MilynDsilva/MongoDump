import { MongoClient } from 'mongodb';
import { exec } from 'node:child_process';
import fs from 'fs';
import archiver from 'archiver';
// import { AWS } from 'aws-sdk';

const url = 'localhost:27017';
//const outPath = 'back'

(async () => {
    // const client = new MongoClient(url, { useUnifiedTopology: true });
    //await client.connect();
    console.log("Connected to MongoDB server");
    const child = exec(`mongodump --host ${url} --db dumpt `, (error, stdout, stderr) => {
        if (error)
            throw error;
        console.log(stdout, 'Successfully executed MongoDump');
    });
    const archive = archiver('zip', { zlib: { level: 9 } });
    const output = fs.createWriteStream('dump.zip');
    try {
        await archive.directory('dump', false);
        archive.pipe(output);
        await archive.finalize();
        console.log('Successfully zipped folder');
    } catch (err) {
        console.log(err);
    }
})();

