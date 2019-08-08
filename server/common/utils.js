const BigNumber = require('bignumber.js')

function hexToStringUTF8(h) {
  return new Buffer(h, 'hex').toString('utf-8')
}

function toTimestamp(rpepoch) {
  return (rpepoch + 0x386D4380) * 1000
}

function dropsToBase(drops) {
  return (new BigNumber(drops)).dividedBy(gConfig.base.drops).toString()
}

function parseAmount(chaindAmount, useIssuer) {
	let amount = {};

	if (typeof chaindAmount === 'string') {
		amount.currency = gConfig.base.currency;
		amount.value = dropsToBase(chaindAmount);
		if (useIssuer) {
			amount.issuer = '';
		} else {
			amount.counterparty = '';
		}
	} else {
		amount.currency = chaindAmount.currency;
		amount.value = chaindAmount.value;
		if (useIssuer) {
			amount.issuer = chaindAmount.issuer;
		} else {
			amount.counterparty = chaindAmount.issuer;
		}
	}

	return amount;
}

function parseTransaction (_tx,isDetail) {
  const tx = _tx.tx || _tx
  let transaction = {
    hash: tx.hash,
    account: tx.Account,
    type: tx.TransactionType,
    date: tx.closeTime ? tx.closeTime : '',
    time: (tx.closeTime ? new Date(tx.closeTime*1000).toISOString() : ''),
    fee: dropsToBase(tx.Fee) || '',
    ledger: tx.ledger_index ? tx.ledger_index + '' : 'pending',
    sequence: tx.Sequence,
    result: _tx.meta.TransactionResult,
    amount:'',
    txResults:[]
  }
  if (Array.isArray(tx.Memos) && tx.Memos.length > 0) {
    transaction.memos = []
    transaction.simple_memos = []
    for (let m = 0; m < tx.Memos.length; m++) {
      const memo = {
        memo_type: tx.Memos[m].Memo.MemoType,
        memo_data: tx.Memos[m].Memo.MemoData
      }
      const simpleMemo = {
        memo_type: tx.Memos[m].Memo.MemoType ? hexToStringUTF8(tx.Memos[m].Memo.MemoType) : undefined,
        memo_data: tx.Memos[m].Memo.MemoData ? hexToStringUTF8(tx.Memos[m].Memo.MemoData) : undefined
      }
      transaction.memos.push(memo)
      transaction.simple_memos.push(simpleMemo)
    }
  }
  if (tx.TransactionType == 'Payment') {
    transaction.destination = tx.Destination
    const amount = parseAmount(tx.Amount, true)
    transaction.amount = new BigNumber(amount.value).toFormat()+' '+amount.currency;

    transaction.amountObjs = []
    transaction.amountObjs.push(amount)

  } else if (tx.TransactionType == 'OfferCreate') {
    const taker_gets = parseAmount(tx.TakerGets)
    const taker_pays = parseAmount(tx.TakerPays)
    const amount = new BigNumber(taker_gets.value).toFormat()+' '+taker_gets.currency+' -> '+ new BigNumber(taker_pays.value).toFormat()+' '+taker_pays.currency
    transaction.amount =amount;

    transaction.amountObjs = []
    transaction.amountObjs.push(taker_gets)
    transaction.amountObjs.push(taker_pays)

    if (_tx.meta&&isDetail) {
      for (let i = 0;i < _tx.meta.AffectedNodes.length;i++) {
        const affectedNode = _tx.meta.AffectedNodes[i]
  
        // 全部吃单
        if (affectedNode.ModifiedNode && affectedNode.ModifiedNode.LedgerEntryType == 'Offer' && affectedNode.ModifiedNode.FinalFields) {
          if (affectedNode.ModifiedNode.PreviousFields) {
            const modifiedOfferd = affectedNode.ModifiedNode.FinalFields
            const _takerGets = parseAmount(modifiedOfferd.TakerGets)
            const _takerPays = parseAmount(modifiedOfferd.TakerPays)
            const _takerGetsD = parseAmount(affectedNode.ModifiedNode.PreviousFields.TakerGets)
            const _takerPaysD = parseAmount(affectedNode.ModifiedNode.PreviousFields.TakerPays)
            const _amount = new BigNumber(_takerPaysD.value).minus(new BigNumber(_takerPays.value)).toFormat() + ' ' + _takerPays.currency + ' -> ' + new BigNumber(_takerGetsD.value).minus(new BigNumber(_takerGets.value)).toFormat() + ' ' + _takerGets.currency
  
            transaction.txResults.push(_amount)
          }
        }
  
        // 部分吃单
        if (affectedNode.DeletedNode && affectedNode.DeletedNode.LedgerEntryType == 'Offer' && affectedNode.DeletedNode.FinalFields) {
          if (affectedNode.DeletedNode.PreviousFields) {
            const deletedOfferd = affectedNode.DeletedNode.FinalFields
            const _takerGets = parseAmount(deletedOfferd.TakerGets)
            const _takerPays = parseAmount(deletedOfferd.TakerPays)
            const _takerGetsD = parseAmount(affectedNode.DeletedNode.PreviousFields.TakerGets)
            const _takerPaysD = parseAmount(affectedNode.DeletedNode.PreviousFields.TakerPays)
            const _amount =  new BigNumber(_takerPaysD.value).minus(new BigNumber(_takerPays.value)).toFormat() + ' ' + _takerPays.currency + ' -> ' + new BigNumber(_takerGetsD.value).minus(new BigNumber(_takerGets.value)).toFormat() + ' ' + _takerGets.currency
  
            transaction.txResults.push(_amount)
          }
        }
      }
    }
  } else if (tx.TransactionType == 'OfferCancel') {
    if (_tx.meta) {
      for (let i = 0; i < _tx.meta.AffectedNodes.length; i++) {
        if (_tx.meta && _tx.meta.AffectedNodes[i].DeletedNode && _tx.meta.AffectedNodes[i].DeletedNode.LedgerEntryType == 'Offer') {
          var deletedField = _tx.meta.AffectedNodes[i].DeletedNode.FinalFields
          const taker_gets = parseAmount(deletedField.TakerGets, true)
          const taker_pays = parseAmount(deletedField.TakerPays, true)
          const amount = new BigNumber(taker_gets.value).toFormat()+' '+taker_gets.currency+' -> '+new BigNumber(taker_pays.value).toFormat()+' '+taker_pays.currency
          transaction.amount =amount;

          transaction.amountObjs = []
          transaction.amountObjs.push(taker_gets)
          transaction.amountObjs.push(taker_pays)
        }
      }
    }
  } else if (tx.TransactionType == 'TrustSet') {
    const amount = parseAmount(tx.LimitAmount, true)
    transaction.amount = new BigNumber(amount.value).toFormat()+' '+amount.currency;

    transaction.amountObjs = []
    transaction.amountObjs.push(amount)

    transaction.destination = transaction.amount.counterparty
  } else if (tx.TransactionType == 'AccountSet') {
  }

  if(_tx.meta.TransactionResult!=='tesSUCCESS'){
    transaction.txResults= []
    transaction.txResults.push('error: '+_tx.meta.TransactionResult)
  }
  return transaction
}


module.exports = {
  hexToStringUTF8,
  parseTransaction
}
