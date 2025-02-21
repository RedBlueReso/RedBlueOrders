// IMPORTING
import express from 'express'
import cors from 'cors'
import ConnectMongoDBSession from 'connect-mongodb-session';
import expressSession from 'express-session';
import path from 'path'
import passport from 'passport';
import { createServer } from 'http';
import { configDotenv } from 'dotenv';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import { buildContext } from 'graphql-passport';

// loacl importing
import { configurePassport } from './passport/passport.config.js' // passport config
import { connectDB } from './db/connectDB.js'; // mongodb connection
import  mergedTypeDefs  from './typeDefs/main.typeDefs.js'; // TYPEDEFS
import  mergedResolvers  from './resolvers/main.resolvers.js'; // RESOLVERS
import { useServer } from 'graphql-ws/use/ws';


// EXECUTION OF SERVER
// DONTENV CONFIG
configDotenv()

// FOR USER CREDENTIALS WE USE PASSPORT TO STORE SESSIONS
configurePassport();

// SERVER CREATEION FOR SERVING DATA TO API CALL
const app = express();
const httpServer = createServer(app) //creting a http server, beacuse graphql uses apollo server. thats why we created implictly

//  DATABASE CONNECTION
await connectDB();

// CREATING MONGODB STORE (for session storage)
const MongoDBStore = ConnectMongoDBSession(expressSession) //initilizes mongodb session for user login data
const store = MongoDBStore({
    uri : process.env.MONGO_URI,
    collection: 'sessions',
}) // creating access to the db and assigning a collection for the login data for users
store.on('error' , (error) => console.log('Error in server.js-Store : ',error.message)) //MongoDB [Session Error: <error message>] will be the error if not handled

// MIDDLEWARE config
app.use(
    cors({
        origin : 'http://localhost:3000',
        credentials : true
    }), // allows only [localhost:3000] to access the backend
    express.json(), // allows json data to be sent to the server
    expressSession({
        secret : process.env.SESSION_SECRET,
        resave : false,
        saveUninitialized : false,
        cookie : {
            maxAge : 1000 * 60 * 60 * 24 * 1, // 1 days
            httpOnly : true,
        }, 
        store,
    }), // make session data available to the server(session db)
    passport.initialize(), //initilizing passport for credentials
    passport.session(), // passport is added to the session
);

// ADD SCHEMA FOR TYPEDEF AND RESOLVERS
const schema = makeExecutableSchema({
    typeDefs : mergedTypeDefs,
    resolvers : mergedResolvers,
});

// CREATEING WEBSOCKET SERVER for live subscription
const wsServer = new WebSocketServer({
    server : httpServer, // the server we created for subscription  
    path : '/graphql', // the path for the websocket
})

// SERVER CLEANUP (used to turn off the server if no subscribers)
const serverCleanup = useServer( // subcription listening server
    {
        schema, // type allowed for the subscription
        context : (
            ctx , // CONTEXT - connection details
            msg , // incoming messages
            args  // arguments extracted from the websocket
        ) => {
            return { ctx };
        },
    },
    wsServer
);

// SERVER - apollo for graphql
const server = new ApolloServer({
    schema,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }), //makes apollo server to allow http servers also
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
    ],
});

await server.start();

// ACTIVE BACKED END POINT
app.use(
    "/graphql",
    expressMiddleware(server , {
        context : async({req , res}) => buildContext({req , res}),
    }),
);

// server production
const __dirname = path.resolve();
if(process.env.NODE_ENV = 'production'){
    app.use(express.static(path.join(__dirname , 'frontend','dist')))
    app.get('*', (req , res) => {
    res.sendFile(path.join(__dirname , 'frontend','dist','index.html'))
    })
}

// START SERVER
const PORT = process.env.PORT;
httpServer.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
})

