

/**
 * In this file we define all the utilities functions to be exposed as a generic proxies to all the modules.
 */

import bcrypt from 'bcrypt-nodejs';

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

  ///  used by the serializers before exporting api data when a signup request is invoked;
  export const cryptPassword = (pass) => bcrypt.hashSync(pass, bcrypt.genSaltSync(10));

  export const comparePass = (pass,hash) => bcrypt.compareSync(pass, hash);