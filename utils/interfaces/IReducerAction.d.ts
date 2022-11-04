export default interface IReducerAction<T extends Object, K> {
  type: keyof T;
  payload: K;
}
