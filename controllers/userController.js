

exports.login = async (req, res, next) => {
  await res.render('login', { title: 'Login' });
} 

exports.register = async (req, res, next) => {
    await res.render('register', { title: 'Register' });
  } 