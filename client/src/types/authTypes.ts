export type AuthReducerState = {
  uid: String | undefined;
};

export type AuthReducerAction = {
  type: String;
  uid?: String | undefined;
};
