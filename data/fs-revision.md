

##SELF NOTE

# Clean routing for SSR support (SELF NOTE)

***


Create a new file `server.js` at root project folder
```sh
$ touch server.js
```
Install `express`
```sh
$ yarn add express
```
Edit `package.json` - next will run on-top-of node
```json
    "scripts": {
        "dev": "node server.js"
    }
```
Define a `<Link />` that call route to e.g. `pages/blog`  
```jsx

const BlogLink = (blog) =>
    (
        <Link as={`/fake-anything-anyhow/${blog.id}`} href={`/blog?id=${blog.id}`}>
            <a>{blog.title}</a>
        </Link>
    )
    
const BlogList = (props) => 
    (
        <div className="BlogList">
            {
                props.blogs.map(each => <BlogLink key={each.id} {...each}/>)
            }
        </div>
    );

export default BlogList;
```

Copy this to `server.js` - use commonjs syntax (babel does NOT parse this file)

```javascript
// import
const express = require('express');
const next = require('next');

// set up variables
const dev = process.env.NODE_ENV !== 'production'; // only interested in dev
const app = next({dev});
const r = app.getRequestHandler();

// initialize and config app
app
    .prepare()
    .then(() => {
        // instantiate server
        const app = express();
        
        // specific request handlers goes here...
        app.get('/fake-anything-anyhow/:id', (req, res) => {
            const { id } = req.params;
            
            // 3rd param: the page will be loaded
            app.render(req, res, '/blog', {id})
        });
        // ... then anything else.
        app.get('*', (req, res) => {
            r(req, res);
        });
        
        // start listen
        app.listen(3000, err => {
            if (err) throw err;
            console.log('server listening at port: 3000');
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });

```
Inside `pages/blog`

```javascript
const Blog = (props) => (
    // .. props passed here (from .getInitialProps)
);

// retrieving the query param(s)
Blog.getInitialProps = async function(context) => {
    // use id for further processing e.g. retrieve database query
    const {id} = context.query;
    
    // ...more codes...
};

export default Blog;
```

# Clean Routing for Front-End (only)
***

use `withRouter` from `next/router`

#### Link def
```jsx
import Link from 'next/link';

export default (props) => 
    (
        <ul>
            <li>
                <Link as="/b/:id" href=`/blog?id=${props.id}`>
                    <a>Blog Entries</a>
                </Link>
            </li>
            <li>
            
            </li>
        </ul>
    )
```


#### Getting the query params...

in `pages/blog`, import `withRouter` from `next/router` package

```javascript
import { withRouter } from 'next/router';
```

### 3 interesting ways to get:
* Stateless 1
* Stateless 2
* class definition

##### stateless 1
Define Component and then call withRouter()

```jsx
const Blog = (props) => {
    const { id } = props.router.query;
    
    return <p>{id}</p>
};

export default withRouter(Blog);
```

##### stateless 2
Define withRouter(Component) then export altogether

```jsx
const Blog = withRouter(
    (props) => {
        const { id } = props.router.query;
        return <p>{id}</p>
    }
);

export default Blog;
```

##### class-based
a lil tiny bit different - hang on ;)

```jsx
class Blog extends React.Component {
    static getInitialProps({query}){
        return {query};
    }
    
    render() {
        return <p>{this.props.query.id}</p>
    }
}

export default withRouter(Blog);
```

### Page that loads component - same concepts applied:

1. ```.getInitialProps(context)``` from pages/...
2. get the required data
3. pass as props to components/...


## Time for styling
***
1. `<style jsx>` and `<style jsx global>` - _nested styling **not** supported_
```jsx
const Blog = () => {
    return (
        <div className="Blog">
            <p>This is a Blog</p>
        <style jsx>
                {`
                    div.Post {
                      padding: 8px 10x;
                      background-color: green;
                    }
    
                    p {
                      font-size: 50px;
                      color: blue;
                    }
                `}
          </style>
        </div>
    )
}
```
2. use `styled-components`- _nested styling **supported**_

```sh
$ yarn add styled-components
```

```jsx
import styled from 'styled-components';

const BlogContainer = styled.div`
    padding: 4px;
    border: 2px solid red;
        
    p {
        font-size: 40px;
        color: green;
    }
`;

const Blog = () => (
    <BlogContainer className="Blog">
        <p>This is Blog</p>
    </BlogContainer>
);
```

## Fetching data
***
We use `isomorphic-unfetch` cuz it works for both server and client render

```sh
$ yarn add isomorphic-unfetch
```
in your .js file
```jsx
import fetch from 'isomorphic-unfetch';

export default class MainApp extends React.Component {
    state = {
        blog: [],
    };
    async static getInitialProps({query}){
        return {query};
    }
    
    componentDidMount() {
        this.setState({
            blog: this.getBlogPosts();
        });
    }
    
    async getBlogPosts() {
        const resp = await fetch(api_url);
        const data = await resp.json();
        
        return {data}
    }
    
}
```

### Writing API server
***
| method   |      description      
|----------|:-------------
| .get |  GET request
| .post |   POST  
| .put | perform update
| .delete | delete an entry
    
1. mkdir `api` and touch `api/index.js`
```sh
$ mkdir api && touch api/index.js
```
2. copy this to `api/index.js`

```javascript
import express from 'express';
import bodyParser from 'body-parser'; // for post

// instantiate a server instance
const app = express.Router();
app.use(bodyParser.json());

/* for example... */

// main route '/api/' =  get all blogposts
app.get('/', (req, res) => {
    const data = retrieveFromDb();
    res.render(data);
});

// retrieve one post with id
app.get('/post/:id', (req, res) => {
    const { id } = req.params;
    const data = retrieveFromDb();
    
    res.render(data);
});

// post object - ensure data is in the right format 
app.post('/postNew', (req, res) => {
    const { body } = req;
    // insert to database...
});


// delete object
app.delete('/post/delete/:id', (req, res) => {
    const { id } = req.params.id;
    // perform db operation deleteOne...
});

export default app;
```

3. On the main `server.js`, import the api server we defined from 2.
```javascript
import apiRouter from './api';
```

4. ... and use it
```javascript
app.use('/api', apiRouter);
```

### Making axios fetch call
***

| method   |      description      
|----------|:-------------
| axios.get |  fetch data
| axios.post |   POST  
| axios.delete | 'fetch' api/delete

1. install `axios` package then create `src/api.js`
```sh
$ yarn add axios
$ mkdir src
$ touch src/api.js
```

2. import `axios`
```
import axios from 'axios';
```

3. define axios calls as functions:
```javascript
export const getAllPosts = () => {
    return axios.get('/api/')
                .then(resp => resp.data)
                .catch(err => err)
}

export const postSomething = (content) => {
    // ensure content is an obj
    // if not, {data: content}
    return axios.post('/api/postNew', content)
                .then(resp => console.log(resp))
                .catch(err => console.error(err))
}

export const delete = id => {
    return axios.delete('/api/post/delete/${id}')
                .then(rep => rep.data)
                .catch(r => r)
}
```

From any React Component
```jsx
import * as api from '../api';

...
..
componentDidMount() {
    api.getAllPosts()
        .then(resp => this.setState({data: resp}))
        .catch(err => console.error(err));
}

handleSubmit(e) {
    e.preventDefault();
    api.postSomething(this.state.text)
        .then(resp => // clear text input)
        .catch(err => console.error(err))
        
    // update state by fetching new set of data
    api.fetchNewData...
}

handleDelete(id) {
    return api.delete(id).then().catch()...
}

// get the props..
const { _id } = props;
// ... in input ...for example

<button onClick={() => this.handleDelete(_id)} />
```

### Get e.target.value and update state efficiently
***
Let's imagine we want to grab what the user types in real-time..  

1. Hook event handler e.g. onChange
```html
<input type="text" onChange={this.handleChange} />
```

2. define the respective function `handleChange()`
```javascript
handleChange(e) {
    // update state
    this.setState({
        text: e.target.value,
    })
}
```

3. bind!

```javascript
...
.. 
constructor(props){
    super(props);
    
    this.state = {text: ''};
    
    this.handleChange = this.handleChange.bind(this);
}
```

### Setting up mongodb
***
1. install `mongo`(client) and `mongod`(daemon or server)
2. create /data/db (mongo need this file to operate)
3. change file permission: enable write access
```sh
$ brew install mongo
$ brew install mongod
$ sudo mkdir /data/db
$ sudo chown -R $USER /data/db
```
4. launch both `mongo` and `mongod`
```sh
$ mongo
$ mongod
```

5. add `mongodb` package
```sh
$ yarn add mongodb
```

6. copy this...
```javascript
import { MongoClient, ObjectID } from 'mongodb';

// instantiate connection
let mdb;

MongoClient.connect(mongoURI, { useNewUrlParser: true }, (err, client) => {
    assert(null, err); // throws error if error !== null
    mdb = client.db(dbName).collection(tableName);
});

// to find all
mdb.find({}).forEach(eachObj => ...).then(...);

// to find One
mdb.findOne({_id: ObjectID(req.params.id)}, {projection: {_id: 0}})
    .then(resp => res.send(resp))

// to delete
mdb.findOneAndDelete({_id: ObjectID(req.params.id)})
    .then(data => res.send(data.value))
    
// to insert
mdb.insertOne({})
    .then(resp => res.send(`inserted ${resp}`))
    .catch(err => console.error(err))
```

For more detailed docs: [Node Mongo Driver](http://mongodb.github.io/node-mongodb-native/3.2/api/)

### config server.js (MERN-Samer version)
_The glue that holds us together_
***
1. request handler (for client)
2. mount api
3. set templating engine
4. set sass middleware driver
5. server public folder
6. call serverRender functions

```javascript
import express from 'express';
import sassMiddleware from 'node-sass-middleware';
import apiRouter from './api';
import config from './config';
import path from 'path';

const app = express();

// set up templating engine
app.set('view engine', 'ejs');

// set up sass driver
app.use(sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public'),
}));

// set handlers
app.get(['/', '/post'], (req, res) => {
    // call serverRender
    // bla
    // 
    res.render('index', {});
});

// mount router
app.use('/api', apiRouter);

// serve public static
app.use(express.static('public'));

// after everything set up, start listening!
app.listen(config.PORT, config.serverUrl, () => console.log(`server listening on: ${config.PORT}`);
```

### initial config (for SaMERN)
_installing, config etc_
***
Create project folder
```sh
$ mkdir my-project
$ cd my-project
```
Initialize package.json and .git

```sh
$ npm init -y
$ git init
```
## Setting up dev environment:
___
#### Configuring Babel...

Install core
```sh
$ yarn add -D @babel/cli @babel/core @babel/node
```

Babel need presets or 'environment' to transpile
```sh
$ yarn add -D @babel/preset-env @babel/preset-react
```
To use es6 class properties...
```sh
$ yarn add -D @babel/plugin-proposal-class-properties
```
After installing...time to write babel config file `babel.config.js`

```sh
$ touch babel.config.js
```
copy the following to `babel.config.js`
```javascript
module.exports = {
    presets: ["@babel/env", "@babel/react"],
    plugins: ["@babel/plugin-proposal-class-properties"]
}
```
#### Configuring Webpack...
Install webpack and necessary loaders
```sh
$ yarn add -D webpack webpack-cli babel-loader css-loader style-loader
```
Create `webpack.config.js`..
```sh
$ touch webpack.config.js
```
..and copy this...
```javascript
const path = require('path');
module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {test: /\.js$/, use: 'babel-loader'},
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.(eot|otf|svg|ttf|woff|woff2)$/, use: 'file-loader'}
        ],
    }
}
```

#### Configuring eslint...
Install `eslint`, babel parser for eslint (`babel-eslint`) and eslint plugin: react (`eslint-plugin-react`)

```sh
$ yarn add -D eslint babel-eslint eslint-plugin-react
```
Create eslint config file `.eslintrc.js` and copy this:
```javascript
// short form
module.exports = {
    parser: 'babel-eslint',
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    plugins: ['react'],
}

// uncomment below for long form
<!--module.exports = {-->
<!--  "parser": 'babel-eslint',-->
<!--  "env": {-->
<!--    "browser": true,-->
<!--    "commonjs": true,-->
<!--    "es6": true,-->
<!--    "node": true-->
<!--  },-->
<!--  "extends": ["eslint:recommended", "plugin:react/recommended"],-->
<!--  "parserOptions": {-->
<!--    "ecmaFeatures": {-->
<!--      "experimentalObjectRestSpread": true,-->
<!--      "jsx": true-->
<!--    },-->
<!--    "sourceType": "module"-->
<!--  },-->
<!--  "plugins": [ "react" ],-->
<!--  "rules": {-->
<!--    "indent": ["error", 2],-->
<!--    "linebreak-style": ["error","unix"],-->
<!--    "quotes": ["error","single"],-->
<!--    "semi": ["error","always"],-->
<!--    "no-console": ["warn", { "allow": ["info", "error"] }]-->
<!--  }-->
<!--};-->
```

### custom <App />

```sh
$ touch pages/_app.js
```

```jsx
import App, { Container } from 'next/app';

class MyApp extends App {
    render() {
        const { Component } = this.props;
        
        return (
            <Container>
             // layout... headings...
                <Component />
            </Container>
        )
    }
}
```

### ways to grab query params
- .getInitialProps
- withRouter helper

```jsx
// on server
server.get('/p/:id', (req, res) => {
  const { id } = req.params;
  // can include more stuffs...
  res.extraData = { token: 3 };
  app.render(req, res, '/post', {id});
});

// on pages/post.js

Post.getInitialProps({query}) {
    return {
        id: query.id
    }
}
```

```jsx
// on pages/post.js (alternate)
import { withRouter } from 'next/router';

const Page = props => {
    const { id } = props.router.query;
    const { pathname } = props.router;
    ...
    ...
}

export default withRouter(Page)
```


### pages/index.js - simple implementation of pagination

```jsx
import Link from 'next/link'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
export default class App extends React.Component {
  static async getInitialProps({ query: { page = 1 } }) {
    const r = await fetch(
      `https://chroniclingamerica.loc.gov/search/titles/results/?terms=michigan&format=json&page=${page}`
    )
    const d = await r.json()
    return {
      items: d.items,
      page: parseInt(page, 10)
    }
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.items.map(({ title, id }) => (
            <li key={id}>{title}</li>
          ))}
        </ul>
        <button
          onClick={() => Router.push(`/?page=${this.props.page - 1}`)}
          disabled={this.props.page <= 1}
        >
          PREV
        </button>
        <button onClick={() => Router.push(`/?page=${this.props.page + 1}`)}>
          NEXT
        </button>
        <Link href="/?page=1">
          <a>First page</a>
        </Link>
      </div>
    )
  }
}

```

## From fs-rev

```jsx
/* npm logs are stored here: C:\Users\i2s\AppData\Roaming\npm-cache\_logs */


/* Responsive meta element */h
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

/* selective viewing */
const MainViewPanel = (this.state.isLogin) ? 'Show List of Employees' : 'or Show Login Form instead';

const AnnouncementBar = this.state.hasAnnouncement && 'Show Announcement' // show nothing if there is no announcement at all

<div>{MainViewPanel}</div>
<p>{AnnoucementBar}</div>

/* arrow function with explicit return */
const express = () => {
	/* some code */
	
	return something
}

/* arrow function with implicit return */
const express = () => `something`
const implicitReturnObject = justOneArgument => ({first: 'john', last: 'nanny'})

// callbacks
console.log('----------------------------')
console.log('---- CALLBACKS ----')
console.log('----------------------------')

// define MAIN FUNCTION
const doThis = (q, callbacks) =>
  callbacks(q.split(' ').join('-'))

// define CALLBACK FUNCTION
const convertUpper = greeting => greeting.toUpperCase()

// CALL em and OUTPUT
const output = doThis(`how Are Ya`, convertUpper)
console.log(output)

/* express.js */
export default express

/* other file(s) that import express.js */
import express from 'express';
 
const app = express();

const router = express.Router().get('/', (req, res) => res.send({data: []}))

express.get('/', (req, res) => {
	res.send();
})

1) Transpile es6
2) run node

$ yarn add -D @babel/cli @babel/core @babel/presets-env
$ touch .babelrc
$ vi .babelrc

# edit this @ .babelrc
{
	"presets": ["@babel/presets-env"]
}

# edit this @ index.js

import express from 'express';

const app = express();

app.get('/', (req, res) => res.send({data: []}));

app.listen(8080);

# edit this @ package.json

{
	"scripts": {
		"build": "babel-node index.js -d dist",
		"start": "npm run build && nodemon dist/index.js"
	}
}

$ npm start



# in babel.config.js

module.exports = {
	options: {
		presets: ["", ""],
		plugins: [""]
	}
}

# or in .babelrc

{
	"presets": ["es2015", "react", "stage-2"]
}
 
$ yarn add -D babel-cli babel-loader babel-preset-*
$ vim .bash_profile

export PATH=$PATH:./node_modules/.bin


$ mkdir <Project_Name>
$ cd <Project_Name>
$ npm init -y
$ yarn add react react-dom express mongodb

$ yarn add -D babel-cli babel-loader babel-preset-es2015 babel-preset-stage-2 babel-preset-react

$ yarn add -D eslint babel-eslint eslint-plugin-react
$ yarn add -D webpack webpack-cli nodemon 

$ touch [.babelrc || babel.config.js] webpack.config.js .eslintrc.js

# in package.json include this

"scripts": {
	"start": "nodemon --exec babel-node server.js --ignore public/",
	"dev": "webpack -wd"
}


# in express.js (maybe)

const express = () => {
	return {
		propA: 'Hello',
		use() {
			console.log('use this!')
		},

		Router() {
			return function (url, callback) {
				callback();
			}
		}
	}
}

module.exports = express;
export default express;


# in api/index.js
import express from 'express';

const app = express.Router();

app.get('/', (req, res) => {
	res.send({ data: [] });
});

export default app;

# in server.js

import express from 'express';
import config from './config';
import apiRouter from './api';

const app = express();

app.use('/api', apiRouter);

app.use(express.static('public'));

// listen!
app.listen(config.port, () => console.log('app is listening'));


# in config.js
const { env } = process;

export const p = process.NODE_ENV || 'development';

export const logStarts = () => console.log("ssssss")

export default {
	port: env.PORT || 8080,
}



# How to use EJS (Templating)?

$ yarn add ejs

# at root folder

$ mkdir views
$ touch views/index.ejs

# In Server.jS
import express from 'express';

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index', { body: 'ffff' });
})


# in views/index.ejs

<html>
	<body>
		<%= body %>
		<div id="root"></div>
	</body>
</html>

# Props validation
$ yarn add prop-types

import PropTypes from 'prop-types';

const SomeApp = () => {
 ...
}

# define proptypes here
SomeApp.propTypes = {
	propA: PropTypes.string.isRequired,
	propB...
}


# as for styling...
instead of:
<p style="color: red;"></p>

it is like:
<p style={{color: 'red'}}></p>





const express = require('express');
const apiRouter = require('./api');
const path = require('path');
const config = require('./config');

// import sass middleware
const sassMiddleware = require('node-sass-middleware')

const app = express();
app.set('view engine', 'ejs');
app.use(sassMiddleware({
	src: path.join(__dirname, 'sass'),
	dest: path.join(__dirname, 'public')
}));


// when client request '/'

app.get('/', (req, res) => {
	res.render('index', { headerTitle: 'Home' });
})

// api content
app.use('/api', apiRouter);

app.listen(config.port, config.host, () => console.log(`app is listening on port ${config.port}`))





# config.js
import { env } from process;

export const nodeEnv = env.NODE_ENV || 'development';
export const logMessage = () => {
	// message
}

export default {
	port: env.PORT || 8080,
	host: env.HOST || '0.0.0.0',
	get serverUrl() {
		return `http://${env.HOST}:${env.PORT}`
	}
}



# serverRender.js
$ touch serverRender.js

# in file serverRender.js

import express from 'express';
import axios from 'axios';
import config from './config';

const app = express();

axios.get(`${config.getServerUrl}/api/contests`)
	.then(({data} => console.log(data.contest)))
	.catch(err => console.err('Hello. you've got an error!'))






#

$ mkdir sass
$ touch sass/style.scss

$ mkdir views
$ touch views/index.ejs views/header.ejs views/footer.ejs

# configuring webpack

# install webpack
$ yarn add -D webpack

# create webpack config file
$ touch webpack.config.js
$ vim webpack.config.js

// for ease of getting current path
const path =  require('path');

module.exports = {
	entry: '',
	output: {
		path: path.resolve('public'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: '/\.js$/',
				exclude: 'node_modules',
				use: {
					loader: 'babel-loader',
				}
			},
		]
	}
}

# eslint
$ yarn add -D eslint babel-eslint eslint-plugin-react

# babel
$ yarn add -D babel-cli babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-2

# config babel either in .babelrc (JSON format) or babel.config.js
$ touch .babelrc
$ vim .babelrc

{
	"presets": ["es2015", "react", "stage-2"]
}

# OR in babel.config.js
$ touch babel.config.js
$ vim babel.config.js

module.exports = {
	presets: ["@babel/react", "@babel/env"]
}

# OR in this particular case,

# for presets
$ yarn add -D @babel/cli @babel/node @babel/preset-react @babel/preset-env @babel/core


# for plugins
$ yarn add -D @babel/plugin-proposal-class-properties

# in babel.config.js
module.exports = {
	presets: ['@babel/react', '@babel/env'],
	plugins: ['@babel/plugin-proposal-class-properties']
}

# for .eslintrc.js we use magic

$ touch .eslintrc.js

module.exports = {
	parser: 'babel-eslint',
	extends: ['eslint:recommended', 'plugin:react/recommended'],
	plugins: ['react'],
}

(can see config rules for more info on how to configure babel)

# Option 1: Call the api BERFORE loading <App />

# in index.js

import axios from 'axios';
import ReactDOM from 'react-dom';

import App from './components/App';

const root = document.getElementById('root');

axios.get('/api/contests')
	.then(res => ReactDOM.hydrate(<App initialContest={res.data.contests} />))


# from App, delete state, delete axios call (can even make it a stateless components)



/*
 * Design: Make the api call once and
 *         and preload the <App /> WITH
 *		   initial data supplied
 */

# in serverRender.js

import axios from 'axios';
import ReactDOMServer from 'react-dom/server';
import config from './config';

const serverRender = () => {
	return axios.get(config.serverUrl)
				.then(res => {
					return {
						initialMarkUp: ReactDOMServer.renderToString(<App initialContests={res.data.contests}),
						initialData={res.data}
					}
				})
}

export default serverRender;

# in server.js

import serverRender from './serverRender';
..
..
.

/*
 * 2 things:-
 * 1 - call serverRender
 * 2 - get the returned Promise
 * 3 - pass those to index.ejs
 */

app.get('/', (req, res) => {
	// call serverRender
	serverRender()// get them promise
				.then(({initialMarkUp, initialContests}) => {
					// all I care about: passing the 2 obj properties to
					index.ejs

					// 'pass' to index.ejs
					res.render('index', {
						initialMarkUp,
						initialContests
					})
				})
});


# in index.ejs: #1 insert the JSON (initialContests) to the global variable window

# ............ and #2 load the initialMarkUp ('stringified' render object)
<!-- Task #1 -->
<script type="text/javascript">
	window.initialData = <%- JSON.stringify(initialContests) %>
</script>

<%- include('header') -%>
<div id="root"><%- initialMarkUp -%></div>
<%- include('footer') -%>


# in 'React Zone'...
# Task 1: get the stringified JSON from window
# Task 2: load the App component with `em

import ReactDOM from 'react-dom';

ReactDOM.hydrate(<App initialContests={window.initialData.contests} />,
				document.getElementById('root'));


# files that use prop-types

src/*


import { withRouter } from 'next/router';

const hoc = ({router}) => (
	<div>
		<h1>router.pathname</h1>
		<p>router.query.title</p>
	</div>
);

export default withRouter(hoc);

============================================

import styled, {
	ThemeProvider,
	createGlobalStyles,
} from 'styled-components';

const theme = {
	fontSize: 20,
};

const GlobalStyles = createGlobalStyles`
	*, html {
		margin: 0;
		padding: 0;
		box-sizing: border-box;

		body {
			background-color: #fff;
			font-size: ${props => props.fontSize};
		}
	}
`;

export default function MainLayout(props) {
	return (
		<ThemeProvider theme={theme}>
			<React.Fragment>
				<GlobalStyles />
				{props.children}
			</React.Fragment>
		</ThemeProvider>
	)
}

======================================

// pages/_app.js

import App, { Container } from 'next/app';
import MainLayout from '../components/MainLayout';

export default (props) => (
	<Container>
		<MainLayout>
			<props.Component />
		</MainLayout>
	</Container>
);

=================================================

PostLink is a just a 1. React Component that
2. has props named `title` and 3. use it to pass through href prop in <Link />

export default (props) => (
	<div>
		<p>bla bla some text</p>
		<Link href={`/blog?id=${props._id}`} />
	</div>
)

Question is: how to I prepare for the '/blog?id=2' page? withRouter from 'next/router'


================================================
== recap callbacks
================================================

function add(x, y, callback){
  // async operation #1
  const f = x+y

  // async operation #2
  const g = x-y

  return callback(f, g);
}

// const printRandom = randomString => console.log(randomString)

add(1, 6, (a, b) => {
  return {
    f: a,
    y: b
  }
});

const ArrayPrototypeTwo = {
  content: [1, 2, 3],
  get currentContent(){
    return this.content;
  },
}

ArrayPrototypeTwo.currentContent;

class ArrayS {
  constructor(arrayContent){
    this.content = arrayContent
  }
  get currentContent(){
    return this.content;
  }
  map(callback) { // .map() 'guess-prototype'
    let ar = [];
    for (let i of this.content){
      const temp = callback(i);
      ar.push(temp);
    }
    return ar;
    
  }
}

const shoppingCart = new ArrayS([
  'Milk', 'Eggs', 'Cabbage',
  'Orange', 'Apple', 'Broccoli'
]);

shoppingCart.currentContent;
const newList = shoppingCart.map(each => {
  return each.split('').join('-')
});

for (let p in newList){
  console.log(newList[p]);
}

=================================================
== CONCEPTS
=================================================

styling: <styled jsx> || <styled jsx global>

front-end routing (Link + apiRouter + props.router.query.<field>)

HOC: Higher Order Component; rendering as HOC or children props

callbacks, async/await and Promise

Link accepts anything (as props.children) as long as its children accept onClick props

server-side routing (some config server.js + context.query.<field> + isomorphic-unfetch)
"scripts": {
	"dev": "node server.js"
}
// server.js will (wire up with next);

SSR (pages/_document.js)

react-markdown

pages/ components/ and server.js

HTTP headers and error codes: 300 - 500

optimized code for production build
"build": "next build"
"start": "next start -p %PORT%"

or $PORT for UNIX

then "$ PORT=<number> npm start" (MAC/UNIX)
or "cross-env PORT=<number> npm start"

pre-load OWN props via getInitialProps

// as a class
async static getInitialProps(context){
	return context.query // <-- double-check on this
}

// as stateless
const g = () => (
	...
)

g.getInitialProps = async (context) => (

);

// fetch
import fetch from 'isomorphic-unfetch';

async function getInitialPosts() {
	const resp = await fetch(uri);
	const data = await resp.json();

	return {
		data
	}
}

// consuming...

const BlogPosts = () => (
	{
		ObjectKeys(allPosts).map(each =>
			<Post key={each} {...allPosts[each]} />
		)
	}
)

// withROuter

{props.router.query....} ?
withRouter must be the immediate caller (so props can be passed on)

===================================================
=== configuring server.js
===================================================
// import
const express = require('express');
const next = require('next');

// intialize variables
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

// set server's behaviour
	// initiate
	app.prepare()

	// route-handling... listening
	.then(() => {
		// instantiate
		const server = express();

		server.get('/post/:id', (req, res) => {
			const actualPage = '/browse';
			const queryParams = {
				title: req.params.title,
				id: req.params.id,
			}
			server.render(req, res, actualPage, queryParams);
		});

		server.post('/post', (req, res) => {
			const content = req.body
		});

		server.get('*', (req, res) => {
			return handle(req, res);
		});

		server.listen(port, [url,] callback);
	})

	// catch error (if any)
	.catch(ex => {
		console.error(ex.stack);
		process.exit(1);
	})

"scripts": {
-	"dev": "next"
+	"dev": "node server.js"
}


=====================================================
=== SSR (instd of withRouter )
=====================================================
### Providing
$ touch server.js

​```



​```


======================================================
=== Rota food order
======================================================
Features/Functions:

- View Orders {include search bar} [My Orders | Rota Orders]

- Add Order

- Edit Order

- Delete Order

- View Summary of payment (Taker): `Hwang owes you $1.50 for Nasi Ayam Sambal`

(styling for this)
- Update payment status (Taker)

- Checked out food that has been obtained

Scenes/Pages: 

- ViewOrder.js

- OrderForm.js

- Summary.js

Component: 

==============================================================
=== Todo
==============================================================
- MobX state managements
- more and more styling

==========================================================
=======================================================



==========================================================
=======================================================

another callback example

class ArrayTwo {
  constructor() {
    this.content = [];
  }

  get displayContent() {
    return this.content;
  }

  set setContent(newContent) {
    this.content = newContent;
  }
  
  map(callback) {
    let newArray = [];
    let count = 0;
    for (let content of this.content){
      count++;
      newArray.push(callback(content, count))
    }

    return newArray;
  }
}

const emmy = new ArrayTwo();
emmy.setContent = [1, 2, 3];

emmy.map(e => e*10);

const shoppingList = new ArrayTwo();
shoppingList.setContent = ['Milk', 'Eggs', 'Toast'];

shoppingList.map((e, index) => {
    console.log(`processing item #${index}: ${e}`)
    return e.toUpperCase()
  })


// git global config: C:\ProgramData\Git


const filterResultA = [
  {
    _id: '5ce37216b6f8e2057832b1c3',
    name: 'Kaya Restaurant'
  },
    {
    _id: '5ce37216b6f8e2057832b1c5',
    name: 'Giddd'
  },
      {
    _id: '5ce37216b6f8e2057832b1c6',
    name: 'Machi'
  },
]

const filterResultB = [
  {
    _id: '5ce37216b6f8e2057832b1c7',
    name: 'Next'
  },
    {
    _id: '5ce37216b6f8e2057832b1c5',
    name: 'Giddd'
  },
    {
    _id: '5ce37216b6f8e2057832b1c8',
    name: 'Ombak'
  },
    {
    _id: '5ce37216b6f8e2057832b1c3',
    name: 'Kaya Restaurant'
  },
]

const fSetA = new Set(filterResultA.map(
  e => e._id
));
const fSetB = new Set(filterResultB.map(
  e => e._id
));

const intersection = new Set(
  [...fSetA].filter(e => fSetB.has(e))
)

console.log([...intersection])


console.log(filterResultB.values())

//

href: /about?page=2

as: /about/2

--------

href: /about?page=2&section=3

as: /about/2/3 // server.get('/about/:page/:section')
				// const { page, section } = req.params;


const P = (Component) => {
	() => (
		<Layout>
			<Header />
			<Component />
		</Layout>
	);
}

export default P

// ... some other file ...
import P from somethwere...

export default P(thisComponent);

const hrefObj = {
	pathname: '/',
	query: {
		id: 1,
		filter: 'price',
	}
}

// '/?id=1&filter=price'

<Link href={hrefObj}>
	<button>go</button>
</Link>

// pages/index.js

import { withRouter } from 'next/router';

const Home = props => {
	const { id, filter } = props.router.query;
	const { pathname } = props.router;

}

//
getInitialProps(ctx) {
	const { d } = ctx.query;

	// fetch with new param filter

	return {
		data: res.json
	}
}

handleFilter = (d) => {
	Router.push('/product?filter='d)
}


<!DOCTYPE html>

<html lang="en">
	<body>
		<input id="user" type="text" name="username" value="123" />
	</body>
</html>


.split("value=")


// frontend
start running withAuthSync() auth.js:23
no token auth.js:85 // auth finished ran here
running WrappedComponent.getInitialProps auth.js:30
running Profile (bare)


// server

start running withAuthSync()
no token // auth finished ran here
running WrappedComponent.getInitialProps
running Profile (bare)
> GET /login // redirect happens here


in General:

- store cookie
- retrieve cookie
- inject cookie in Auth header
- request endpoint (with Auth header)
- redirect: frontend and backend
- utilizing getInitialProps
- implement HOC: withAuthSync(Component)
- destroy cookie
- synchronizing logout
- implement middleware
- 'bypassing' CORS
- jwt.sign and jwt.verify
- ../utils/auth.js
- next() to proceed with endpoint
- send status code and msg

initalProps run handleAuthSSR -> kopek cookie
```



