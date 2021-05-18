

/**
 * In this file we define all the utilities functions to be exposed as a generic proxies to all the modules.
 */

 const bcrypt = require('bcrypt-nodejs');

export const getStringHash = () => {
    let hash = 0;
    if (this.length == 0) {
      return hash;
    }
    for (let i = 0; i < this.length; i++) {
      const char = this.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash &= hash; // Convert to 32bit integer
    }
    return hash;
  };

  export const cryptPassword = (pass) => bcrypt.genSalt(10, (err, salt) => {
    if (err) return null;
    bcrypt.hash(pass, salt, null, (err, hash) => {
      if (err) pass = null;
      pass = hash;
    });
  });
