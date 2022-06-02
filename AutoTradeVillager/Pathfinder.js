const { goals, Movements } = require('mineflayer-pathfinder')
const { Vec3 } = require('vec3')

module.exports = async (bot) => {
  const setting = require('./trade-setting.json')
  const mcData = require('minecraft-data')(bot.version)

  const position = setting['start-coordinate']
  //定位到定點
  bot.pathfinder.setMovements(new Movements(bot, mcData))
  bot.pathfinder.setGoal(new goals.GoalBlock(position['x'], position['y'], position['z']))

  //使機器人到達指定地點 停頓0.5秒
  const moving = setInterval(async () => {
    if (!bot.pathfinder.isMoving()) {
      await bot.waitForTicks(10)
      const nearestVillager = await bot.nearestEntity(entity => entity.name === 'villager')
      //看向村民 停頓兩秒
      await bot.lookAt(new Vec3(nearestVillager.position.x, nearestVillager.position.y + 1.75, nearestVillager.position.z))
      console.log('【自動交易系統】機器人已抵達起始地點!')
      clearInterval(moving)
      await bot.waitForTicks(40)

      //讓機器人拿箱子裡的綠寶石
      bot.pathfinder.setGoal(new goals.GoalBlock(position['x'], position['y'], position['z'] - 2))
      const moving_2 = setInterval(async () => {
        if (!bot.pathfinder.isMoving()) {
          await bot.lookAt(new Vec3(position['x'] - 2, position['y'], position['z'] - 2))
          clearInterval(moving_2)

          //打開箱子開始拿綠寶石及關閉箱子 停頓一秒
          console.log('【自動交易系統】機器人開始拿取綠寶石...')
          const chestWindow = await bot.openChest(bot.blockAt(new Vec3(position['x'] - 2, position['y'], position['z'] - 2)))
          await chestWindow.withdraw(mcData.itemsByName['emerald'].id, null, 1152)
          console.log(`【自動交易系統】目前箱子裡還有 ${chestWindow.containerCount(mcData.itemsByName['emerald'].id)} 個綠寶石!`)
          await chestWindow.close()
          await bot.waitForTicks(20)

          //回歸原位
          await bot.pathfinder.setGoal(new goals.GoalBlock(position['x'], position['y'], position['z']))
          const moving_3 = setInterval(async () => {
            if (!bot.pathfinder.isMoving()) {
              await bot.lookAt(new Vec3(nearestVillager.position.x, nearestVillager.position.y + 1.75, nearestVillager.position.z))
              console.log('【自動交易系統】即將開始進行交易!')
              clearInterval(moving_3)
            }
          }, 1500)
        }
      }, 500)
    }
  }, 1500)
}