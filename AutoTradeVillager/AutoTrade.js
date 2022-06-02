const { goals, Movements } = require('mineflayer-pathfinder')
const { Vec3 } = require('vec3')
const setting = require('./trade-setting.json')

module.exports = async (bot) => {
  const mcData = require('minecraft-data')(bot.version)
  const position = setting['start-coordinate']
  await bot.pathfinder.setMovements(new Movements(bot, mcData))

  //交易
  let moveIndex = 2 // 移動至下一個村民(每次都z+2)
  let moveCount = 9 //要移動幾個村民

  while (moveCount != 0) {
    await bot.waitForTicks(20)
    bot.chat('new-botTrade')
    const tradeIndex = [1, 3, 5, 9] //交易品項
    let countIndex = 0 //交易第幾個品項

    let nearestVillager = await bot.nearestEntity(entity => entity.name.toLowerCase() === 'villager')
    let tradeVillager = await bot.openVillager(nearestVillager)
    let tradeList = tradeVillager.trades[tradeIndex[countIndex]]

    while (countIndex <= 3) {
      if (countIndex === 3) {
        await tradeVillager.close()
        await bot.pathfinder.setGoal(new goals.GoalBlock(position['x'], position['y'], position['z'] + moveIndex))
        await bot.waitForTicks(20)
        await bot.lookAt(new Vec3(nearestVillager.position.x, nearestVillager.position.y + 1.75, nearestVillager.position.z))
        moveIndex += 2
        moveCount -= 1
        break
      }
      switch (true) {
        case countIndex === 5:
          await tradeVillager.close()
          break
        case tradeList['tradeDisabled']:
          countIndex += 1
          await tradeVillager.close()
          break
        case tradeIndex[countIndex] === 1:
          await bot.waitForTicks(20)
          await bot.trade(tradeVillager, 1, (tradeList['maximumNbTradeUses'] - tradeList['nbTradeUses']))
          countIndex += 1
        case tradeIndex[countIndex] === 3:
          await bot.waitForTicks(20)
          await bot.trade(tradeVillager, 3, (tradeList['maximumNbTradeUses'] - tradeList['nbTradeUses']))
          countIndex += 1
        case tradeIndex[countIndex] === 5:
          await bot.waitForTicks(20)
          await bot.trade(tradeVillager, 5, (tradeList['maximumNbTradeUses'] - tradeList['nbTradeUses']))
          countIndex += 1
        case tradeIndex[countIndex] === 9:
          await bot.waitForTicks(20)
          await bot.trade(tradeVillager, 9, (tradeList['maximumNbTradeUses'] - tradeList['nbTradeUses']))
          countIndex += 1
          await tradeVillager.close()
        default:
          countIndex += 1
          await tradeVillager.close()
          await bot.chat('甚麼都沒交易到')
      }
    }
  }
}