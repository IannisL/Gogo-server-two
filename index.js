const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const myMiddleware = require('./middleware/2middleware');
const userRouter = require('./routes/user');
const app = express();
const PORT = 3000;

// config
app.set('views' , './views');// sets the views for the app
app.set('view engine', 'perscholas');// sets the templete engine for the app
app.set('view engine', 'dmv');

//Middleware Morgan?
app.use(morgan('dev'));
app.use(express.static('./styles'));
app.use(express.static('./assets'));

// app engine
app.engine('perscholas', (filePath, options, callback) => {
    // templete file
    fs.readFile(filePath, (err, content) => {
        // if there is a error reading the file return!
        if (err) return callback(err);

        const rendered = content
        .toString()
        .replaceAll('#title#' , `${options.title}`)
        .replaceAll('#content#' , `${options.content}`)

        return callback(null , rendered);
    })
});
app.engine('dmv', (filePath, options, callback) => {
    // templete file
    fs.readFile(filePath, (err, content) => {
        // if there is a error reading the file return!
        if (err) return callback(err);

        const rendered = content
        .toString()
        .replaceAll('#title#' , `${options.title}`)
        .replaceAll('#content#' , `${options.content}`)

        return callback(null , rendered);
    })
});

// button
app.get('/download', (req , res) => {
    res.download('./assets/sylvie3.jpeg');
});


// user id
app.get('user/ :userID', (req , res) => {
    console.log('Params Object ===>', req.params);
    res.send('test');
});

// user creation
app.post ('/user', (req , res) => {
    console.log(req.url);
    console.log(req.method);
    res.send('Creating new user.....')
});

// user Info and Password
app.get('/user', (req , res) => {
    console.log(req.url);
     res.send('Sending the user info!');
 });
 app.get('/user/:username/:password',(req , res) => {
    console.log(req.params);
    res.send(`Sending Profile info for User: ${req.params.userID}`);
});

// Routes
app.get('/', (req , res) => {
    console.log(req.url);
    res.render('index.perscholas', {title: "im tired of this", content: 'dneifbvchirwbvsbrv'});
});
app.get('/', (req , res) => {
    console.log(req.url);
    res.render('index2.dmv', {title: "whhhhhhhhyyyy", content: 'when can i go take a nap or atleast a 10 hour break I am sooooo done with this!'});
});
app.get('/login', (req, res) => {
    res.send('<h1>Login Page</h1>')
});
app.get('/' , (req, res) => {
    res.send('<h2> contacts page</h2>');
});

// MY redirect attempt
app.all('*', (req , res) => {
    res.redirect("https://www.google.com")
});

app.listen(5000)
/**
 * Catch all route for redirect
 */
// app.all('*' ,(req, res) => {
//     res.redirect('https://perscholas.org/');
// });
// app.all('*' ,(req, res) => {
//     res.redirect('https://digital.dmv.ny.gov/login');
// });

// Serverport
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});