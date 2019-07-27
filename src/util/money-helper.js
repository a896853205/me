
export let moneyHelper = {};

moneyHelper.parseMoney = unParseMoney => {
  // 显示的时候显示分
  return `${unParseMoney / 100}`;
}