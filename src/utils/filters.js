export function getCardType (value) {
  if (value === 'ID_CARD') {
    return '身份证'
  } else {
    return ''
  }
}

export function getFenToYuan (value) {
  return new Number(value / 100).toFixed(2)
}