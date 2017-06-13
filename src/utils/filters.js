export function getCardType (value) {
  switch (value) {
    case 'ID_CARD':
      return '身份证'
    case 'ERTONG':
      return '儿童无证件'
    case 'GANGAO':
      return '港澳通行证'
    case 'HUIXIANG':
      return '回乡证'
    case 'HUZHAO':
      return '护照'
    case 'SHIBING':
      return '士兵证'
    case 'JUNGUAN':
      return '军官证'
    case 'HUKOUBO':
      return '户口薄'
    case 'CHUSHENGZHENGMING':
      return '出生证明'
    case 'TAIBAO':
      return '台湾通行证'
    case 'TAIBAOZHENG':
      return '台胞证'
    case 'OTHER':
      return '其他'
    default:
      return ''
  }
}

export function getCheckStatus (value) {
  switch (value) {
    case 'checked':
      return '已检票'
    case 'checking':
      return '检票中'
    case 'waiting':
      return '待检票'
    case 'refund':
      return '已退票'
  }
}

export function getIsExpired (value) {
  switch (value) {
    case 'yes':
      return '已过期'
    case 'no':
      return '未过期'
  }
}

export function getFenToYuan (value) {
  return Number(value / 100).toFixed(2)
}
