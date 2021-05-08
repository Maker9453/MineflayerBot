const mineflayer = require("mineflayer")
const { pathfinder, Movements, goals } = require("mineflayer-pathfinder")
const GoalFollow = goals.GoalFollow

const bot = mineflayer.createBot({
  host: "localhost",
  port: 58521,
  username: "PsauceBot",
})

bot.loadPlugin(pathfinder)

function followPlayer () {
  const playerCI = bot.players["YenKa305"]

  if (!playerCI) {
    bot.chat("I can't see CI")
    return
  }

  const mcData = require("minecraft-data")(bot.version)
  const movements = new Movements(bot, mcData)
  bot.pathfinder.setMovements(movements)

  const goal = new GoalFollow(playerCI.entity, 1)
  bot.pathfinder.setGoal(goal, true)
}

bot.once('spawn', followPlayer)