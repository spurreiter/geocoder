export function isTrustableMapboxResult(matchCode) {
  console.log(matchCode)
  return Number(
    matchCode.address_number === 'matched' &&
      matchCode.street === 'matched' &&
      matchCode.postcode === 'matched' &&
      matchCode.country === 'matched'
  )
}
