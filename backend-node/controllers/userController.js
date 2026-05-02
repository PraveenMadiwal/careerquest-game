let user = {
  name: "Player1",
  level: 1,
  xp: 0,
};

exports.getUser = (req, res) => {
  res.json(user);
};

exports.updateXP = (req, res) => {
  const { xp } = req.body;

  user.xp += xp;

  // Level logic
  if (user.xp >= 100) {
    user.level += 1;
    user.xp = 0;
  }

  res.json({
    message: "XP Updated",
    user,
  });
};