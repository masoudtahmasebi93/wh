/** 
 * run from root folder as : node ./npm-tests/test-04.js
 * 
 * In the following, make JSON POST to the /save end point.
 * Purify the user input that is received through the /save POST request so that you strip all html tags from the content and clear the security risks in them and print out just the plain text "John Doe" when visiting http://127.0.0.1:8080/get-name
 */

 import fastify from "fastify";
 import S from "string";
 

 // Require the framework and instantiate it
const app = fastify();
const userInput = {};

app.post('/save',(request,reply)=>{
    const body = request.body;
    console.log(body);
    // purify the inputs here
    if(body.name)
        userInput.firstname = S(body.name).stripTags().s;
    if(body.family)
        userInput.lastname = S(body.family).stripTags().s;

    //Or alternative way is 
    // text.replace(/(<([^>]+)>)/ig,"");

    reply.status(200);
    reply.header('Content-Type', 'text/plain; charset=utf-8');
    reply.send(JSON.stringify(userInput));
});

app.get('/get-name',(request,reply)=>{

    reply.header('Content-Type', 'text/html; charset=utf-8');
    const page = 
    `<html>
        <head>
            <title>Wallethub Test</title>
        </head>
        <body>
            <p>First Name: ${userInput.firstname}</p>
            <p>Last Name: ${userInput.lastname}</p>
        </body>
    </html>`;
        
    reply.send(page);
})


// server start
const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log('Server is Ready ...');
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()

// *-----  cURL [get-name] *------*/
// curl --request GET \
//   --url http://localhost:3000/get-name \
//   --header 'Content-Type: multipart/form-data'


// *-----  cURL [save] *------*/
// curl --request POST \
//   --url http://localhost:3000/save \
//   --header 'Content-Type: application/json' \
//   --data '{
// 	"name":"<b>Masoud</b><script></script>",
// 	"family":"Tahmasebi</br>"
// }'
