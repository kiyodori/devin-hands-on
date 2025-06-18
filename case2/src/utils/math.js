function average(arr) {
  if (arr.length === 0) return 0;
  // バグ：最後の要素を集計していない
  let sum = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
}

module.exports = { average };
