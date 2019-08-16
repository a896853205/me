
export let objectHelper = {};

objectHelper.deepCopy = obj => {
  // 会忽略undefined,null等.
  return JSON.parse(JSON.stringify(obj));
}