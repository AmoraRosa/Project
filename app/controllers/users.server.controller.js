const User = require('mongoose').model('User');
const passport = require('passport');
function getErrorMessage(err) {
let message = '';
if (err.code) {
switch (err.code) {
case 11000:
case 11001:
message = 'Nome de usuário já existe.';
break;
default:
message = 'Ocorreu um erro.';
}
} else {
for (var errName in err.errors) {
if (err.errors[errName].message) message = err.errors[errName].message;
}
}
return message;
};
exports.renderSignin = function(req, res, next) {
if (!req.user) {
res.render('signin', {
title: 'Entrar',
messages: req.flash('error') || req.flash('info')
});
} else {
return res.redirect('/');
}
};
exports.renderSignup = function(req, res, next) {
if (!req.user) {
res.render('signup', {
title: 'Cadastro',
messages: req.flash('error')
});
} else {
return res.redirect('/');
}
};
exports.signup = function(req, res, next) {
if (!req.user) {
const user = new User(req.body);
user.provider = 'local';
user.save((err) => {
if (err) {
const message = getErrorMessage(err);
req.flash('error', message);
return res.redirect('/signup');
}
req.login(user, (err) => {
if (err) return next(err);
return res.redirect('/');
});
});
} else {
return res.redirect('/');
}
};
exports.signout = function(req, res) {
req.logout();
res.redirect('/');
};