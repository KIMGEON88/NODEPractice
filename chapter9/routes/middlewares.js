exports.isLoggedIn = (req, res, next) => {
  if (req.isAhthenticated()) {
    next();
  } else {
    res.status(403).end("로그인 필요");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAhthenticated) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다.");
    res.redirect(`/?error=${message}`);
  }
};
