const User = require('../models/user');
const bcrypt = require('bcrypt');

User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
  });

User.beforeUpdate(async (user, options) => {
if (user.changed('password')) {
    const salt = bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
}
});

//   To verify passwords during login
User.prototype.validPassword = async function(password) {
return await bcrypt.compare(password, this.password);
};