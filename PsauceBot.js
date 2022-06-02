const mineflayer = require('mineflayer')
const { pathfinder, Movements } = require('mineflayer-pathfinder')
const { GoalNear, GoalBlock, GoalXZ, GoalY, GoalInvert, GoalFollow, GoalBreakBlock } = require('mineflayer-pathfinder').goals

const bot = mineflayer.createBot({
  host: 'localhost',
  port: 64512,
  username: 'PsauceBot'
})

bot.loadPlugin(pathfinder)

bot.on('chat', async function (username, message) {
  if (username == bot._client.username) return
  if (message == 'go') {
    require('./AutoTradeVillager/Pathfinder')(bot)
  }
  
})