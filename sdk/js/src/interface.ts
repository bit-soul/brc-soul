/**
 * @description User-Service parameters
 */
export enum SbtState {
  NOTMINT = 1,
  MINTED = 2,
  BURNED = 3,
  CANCELED = 4,
}

export enum BurnType {
  BURN_TYPE_COID = 1,
  BURN_TYPE_VCID = 2,
  BURN_TYPE_FLAG = 3,
  BURN_TYPE_TIME = 4,
  BURN_TYPE_FLAG_AND_TIME = 5,
}

export enum CancelType {
  CANCEL_TYPE_VCID = 2,
  CANCEL_TYPE_FLAG = 3,
  CANCEL_TYPE_TIME = 4,
  CANCEL_TYPE_FLAG_AND_TIME = 5,
}
