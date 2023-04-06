export enum UserRecordRole {
  ADMIN = "admin",
  USER = "userRecord",
}

export enum RecordStatus { //状态-1默认0未完成1完成2异常
  PENGDING = 0,
  STAGING = 1,
  SUCCESS = 2,
  ERROR = -1,
}
