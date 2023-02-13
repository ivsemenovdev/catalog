import fetch from 'node-fetch';
import cors from 'cors';
import express from "express";
import * as fs from "fs";
import request  from "request-promise-native";

const app = express();

app.use(cors());

// Раскоментировать для загрузки json файла с сервера
const res = await fetch('http://pneumoindutech.ru/api/v1/partnercatalog');
const data = await res.json();

let separateReqPool = {maxSockets: 100};

app.get("/api/v1/partnercatalog", (request, response, next) => {
    response.send(data);

    let parent = ''
    let path = ''

    function buildTree(data) {

        for (let i = 0, n = data.length; i < n; i++) {

            let branch = data[i];

            if (branch.urlPdf === '' && branch.key === `lvl1_${branch.label}`) {
                parent = branch.label;
                path = `/Work/SMC/Catalog/scripts/pdfjs-dist/web/data/${branch.label}`;
                fs.mkdir(path, {recursive: true}, (err) => {
                    if (err) throw err;
                });
            } else if ((branch.urlPdf === '' && branch.key === `lvl2_${branch.label}`)) {
                let name = branch.label.replace(/[/]/g, '-');
                path = `/Work/SMC/Catalog/scripts/pdfjs-dist/web/data/${parent}/${name}`;
                fs.mkdir(path, {recursive: true}, (err) => {
                    if (err) throw err;
                });
            } else {
                let fileName = branch.urlPdf.toString().replace('/images/pdf/', '')
                const URI = `${'http://pneumoindutech.ru/images/pdf/' + branch.urlPdf.toString().replace('/images/pdf/', '')}`;
                const encodedURI = encodeURI(URI);

                // Раскоментировать для загрузки pdf файлов
                // downloadPDF(`${encodedURI}`, `${path + '/' + fileName}`);
            }

            if (branch.children.length > 0) {
                buildTree(branch.children);
            }
        }
    }

    buildTree(data);

});

async function downloadPDF(pdfURL, outputFilename) {
    let pdfBuffer = await request.get({uri: pdfURL, encoding: null, pool: separateReqPool});
    console.log("Writing downloaded PDF file to " + outputFilename + "...");
    fs.writeFileSync(outputFilename, pdfBuffer);
}

app.listen(3000, () => {
    console.log("Listen on the port 3000...");
});