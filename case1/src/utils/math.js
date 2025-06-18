/**
 * 数値配列の合計を計算します
 * @param {number[]} arr - 合計を計算する数値の配列
 * @returns {number} 配列内の全数値の合計値
 */
export function sumNumbers(arr) {
  let total = 0;
  for (const n of arr) {
    total += n;
  }
  return total;
}

/**
 * 数値配列の平均値を計算します
 * @param {number[]} arr - 平均値を計算する数値の配列
 * @returns {number} 配列の平均値。空配列の場合は0を返す
 */
export function average(arr) {
  if (arr.length === 0) return 0;
  return sumNumbers(arr) / arr.length;
}
