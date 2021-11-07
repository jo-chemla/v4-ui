import { Amount } from '@pooltogether/hooks'
import { ThemedClipSpinner, Tooltip } from '@pooltogether/react-components'
import { PrizePool } from '@pooltogether/v4-js-client'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { EstimateAction } from 'lib/hooks/Tsunami/useEstimatedOddsForAmount'
import { useUsersCurrentOdds } from 'lib/hooks/Tsunami/useUsersCurrentOdds'
import { InfoListItem } from './InfoList'
import { getAmountFromBigNumber } from 'lib/utils/getAmountFromBigNumber'
import { getAmountFromString } from 'lib/utils/getAmountFromString'

export const UpdatedOdds = (props: {
  amount: Amount
  prizePool: PrizePool
  action: EstimateAction
}) => {
  const { amount, prizePool, action } = props
  const { t } = useTranslation()

  return (
    <InfoListItem
      label={
        <Tooltip
          id={`tooltip-deposit-updated-odds`}
          tip={t('oddsToWinOnePrize', 'Your estimated odds of winning at least one prize')}
        >
          {t('updatedWinningOdds', 'Updated winning odds')}
        </Tooltip>
      }
      value={<UsersOddsValue prizePool={prizePool} amount={amount} action={action} />}
    />
  )
}

export const UsersOddsValue = (props: {
  prizePool: PrizePool
  emptyString?: string
  action?: EstimateAction
  amount?: Amount
}) => {
  const { t } = useTranslation()
  const { amount, prizePool, action, emptyString } = props

  const { data, isFetched } = useUsersCurrentOdds(prizePool, action, amount?.amountUnformatted)

  if (!isFetched) {
    return <ThemedClipSpinner sizeClassName='w-3 h-3' />
  } else if (data.odds === 0) {
    return <span className='opacity-80'>{emptyString || t('none')}</span>
  }
  return <>{t('oneInOdds', { odds: data.oneOverOdds.toFixed(2) })}</>
}

UsersOddsValue.defaultProps = {
  action: EstimateAction.none
}