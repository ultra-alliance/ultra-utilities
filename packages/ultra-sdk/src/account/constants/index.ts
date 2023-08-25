// istanbul ignore file

export enum eErrors {
  CONNECT = "Couldn't connect to Ultra",
  DISCONNECT = "Couldn't disconnect from Ultra",
  SIGN_TRANSACTION = "Couldn't sign transaction",
  BUY_UNIQ = "Couldn't buy uniq",
  RESELL_UNIQ = "Couldn't resell uniq",
  CANCEL_RESELL_UNIQ = "Couldn't cancel resell uniq",
  TRANSFER_UNIQ = "Couldn't transfer uniq",
  TRANSFER_UOS = "Couldn't transfer UOS",
  SET_AVATAR = "Couldn't set avatar",
  CLEAR_AVATAR = "Couldn't clear avatar",
}

export enum eContracts {
  TOKEN = 'eosio.token',
  NFT = 'eosio.nft.ft',
  AVATAR = 'ultra.avatar',
}

export enum eActions {
  TRANSFER = 'transfer',
  BUY = 'buy',
  RESELL = 'resell',
  CANCEL_RESELL = 'cancelresell',
  SET_AVATAR = 'setavatar',
  CLEAR_AVATAR = 'clearavatar',
}
