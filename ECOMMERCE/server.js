import jsonServer from 'json-server';
import process from 'process';

const server = jsonServer.create();

const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
 
server.use(middlewares);
server.use('/api', router);
server.listen(process.env.PORT || 3000, () => {
  console.log('JSON Server is running');
});
