const mineflayer = require("mineflayer")

const bot = mineflayer.createBot({
  host: "localhost",
  port: 58521,
  username: "PsauceBot",
})

function LookAtPlayer () {
  const playerFilter = (entity) => entity.type == 'player'
  const playerEntity = bot.nearestEntity(playerFilter)

  if (!playerEntity) return

  const pos = playerEntity.position.offset(0,playerEntity.height,0)
  bot.lookAt(pos)

}

bot.on("physicTick", LookAtPlayer)
