import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import createApolloServer from './createApolloServer';

dotenv.config();
const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

// app.use(morgan('dev'));
app.use(cors());
app.get('/', (_, res) => res.send(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`))

const apolloServer = createApolloServer();

apolloServer.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
});
