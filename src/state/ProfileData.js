const {atom} = require('recoil');

export const ProfileMessageState = atom({
  key: 'profileMessage',
  default: '',
});
