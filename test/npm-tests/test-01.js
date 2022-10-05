//@ts-check
/**
 * run from root folder as : node ./npm-tests/test-01.js
 * 
 * Using fs-extra write the following json (data) into a file (data.json)
 * Through the fastify server and with help from fs-extra read the json saved in "data.json" and print out the data.user in the html response as a list of names each being as <p>{name}</p>m ex : <p>John Doe</p><p>Lucita Esau</p>
 */

import fs from "fs-extra";
import { fastify } from "fastify";

const data = { error: false, users: ["John Doe", "Lucita Esau", "Thomas Friedman", "Norma Helms", "Amy Manning"] };

// write the json saving code here
function writeJson(dataObject, fileName) {
    return fs.writeFile('./npm-tests/' + fileName, JSON.stringify(dataObject));
}

const app = fastify({
    ignoreTrailingSlash: true,
    keepAliveTimeout: 65 * 1000
});

function getNameText(array) {
    var text = '';
    array.forEach(element => {
        text += '<p>' + element + '</p>';
    });
    return text;
}

app.get('/', (request, reply) => {
    try {
        writeJson(data, 'data.json').then(res => {
            reply.header('Content-Type', 'text/html; charset=utf-8');
            // read the json here and insert the list names into the html

            fs.readJson('./npm-tests/data.json', (err, result) => {
                const page =
                    `<html>
                        <head>
                            <title>Wallethub Test</title>
                        </head>
                        <body>
                        `+ getNameText(result.users) + `
                        </body>
                    </html>`;

                reply.send(page);
            })

        }).catch(err => {
            console.log('err', err);
        });
    } catch (error) {
        console.log('error', error);
    }

});

// server start
app.listen(8080, "0.0.0.0").then((address) => {
    console.log(`Server started at ${address}`);
});