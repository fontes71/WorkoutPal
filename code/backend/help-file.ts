/*passport.use(new BearerStrategy(
    function(token, done) {
        User.findOne({ token: token }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            return done(null, user, { scope: 'all' });
        });
    }
));
 
// Signup endpoint
app.post('/signup', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.sendStatus(201);
});
   // Login endpoint
  app.post('/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name);
    if (user == null) return res.sendStatus(400);
    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const accessToken = jwt.sign(user, 'your_secret_key');
        res.json({ accessToken });
      } else {
        res.sendStatus(403);
      }
    } catch {
      res.sendStatus(500);
    }
  });*/