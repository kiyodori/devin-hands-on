/**
 * 配列内の全ての数値の合計を計算します
 * @param {number[]} arr - 数値の配列
 * @returns {number} 配列内の全要素の合計値
 */
export function sumNumbers(arr) {
  let total = 0;
  for (const n of arr) {
    total += n;
  }
  return total;
}

/**
 * 配列内の数値の平均値を計算します
 * @param {number[]} arr - 数値の配列
 * @returns {number} 配列内の数値の平均値。空配列の場合は0を返します
 */
export function average(arr) {
  if (arr.length === 0) return 0;
  return sumNumbers(arr) / arr.length;
}
