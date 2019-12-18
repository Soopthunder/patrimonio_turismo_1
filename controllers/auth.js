
exports.login = (req, res) => {
    res.status(200).send({success: true});
};

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

exports.currentUser = (req, res) => {
    res.send(req.user);
};
