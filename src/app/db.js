// db.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.patch('/updateBalance/:accountNumber', (req, res) => {
  const accountNumber = req.params.accountNumber;
  const updatedBalance = req.body.availableBalance;

  // Find the account by account number and update the balance
  const accounts = router.db.get('accounts');
  const account = accounts.find({ accountNumber }).value();

  if (account) {
    account.availableBalance = updatedBalance;
    router.db.set('accounts', accounts).write();
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
