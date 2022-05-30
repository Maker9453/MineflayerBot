const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'localhost',
  port: 60712,
  username: 'PsauceBot'
})

function lookAtNearestPlayer() {
  const playerfilter = ( entity ) => entity.type === 'player'
  const playerEntity = bot.nearestEntity(playerEntity)

  if (!playerfilter) return

  const pos = playerEntity.position.offset(0, playerEntity.height, 0)
  bot.lookAt(pos)

}

bot.on('physicTick', lookAtNearestPlayer)