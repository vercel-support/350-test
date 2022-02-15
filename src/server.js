import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import { json } from 'body-parser';
import session from 'express-session';

import redis from 'redis';
import connectRedis from 'connect-redis';
import sessionFileStore from 'session-file-store';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

let app = {};
let isLocal = false;
const useRedis = !isLocal;

if (useRedis) {
  
  // USING REDIS
  let redis_client = redis.createClient ({
    host : 'eu1-arriving-kitten-32066.upstash.io',
    port : '32066',
    password: 'fa6c080eb9074997b7df0b4c1d6d3774'
  });
  redis_client.on("error", function(err) {
    throw err;
  });
  const RedisStore = new connectRedis(session);

  app = polka() // You can also use Express
    .use(
      json(),
      session({
        secret: 'conduit',
        resave: false,
        saveUninitialized: true,
        cookie: {
          maxAge: 600000000
        },
        store: new RedisStore({ 
          client: redis_client 
        })
      }),
      compression({ threshold: 0 }),
      sirv('static', { dev }),
      sapper.middleware({
        session: (req, res) => {
          return ({
            currentUser: req.session.currentUser
          })}
      })
    )
    .listen(PORT, err => {
      if (err) console.log('error', err);
    });
  
} else {
  
  // USING LOCAL STORAGE
  const FileStore = sessionFileStore(session);
  app = polka() // You can also use Express
    .use(
      json(),
      session({
        secret: 'conduit',
        resave: false,
        saveUninitialized: true,
        cookie: {
          maxAge: 600000000
        },
        store: new FileStore({
          path: `.sessions`
        })
      }),
      compression({ threshold: 0 }),
      sirv('static', { dev }),
      sapper.middleware({
        session: req => ({
          currentUser: req.session.currentUser
        })
      })
    )
    .listen(PORT, err => {
      if (err) console.log('error', err);
    });

}

export default app.handler
