const minflayer = require("mineflayer")
const bot = minflayer.createBot({
  port: 62949,
  host: "localhost",
  username: "PsauceBot",
})

function MLGblock () {
  const MinecraftData = require("minecraft-data")(bot.version)
  const fall_pos = {
    x: bot.entity.position.x,
    y: bot.entity.position.y - 1,
    z: bot.entity.position.z,
  }
  function blockNotWater() {
  if (bot.findBlock(options = fall_pos ) != MinecraftData.blocks[26]) {
    return true
  }else{
     return false
    }
  }
  if (blockNotWater() == true){
    bot.lookAt(point = fall_pos)
    bot.heldItem = MinecraftData.items[661]
    bot.activateItem()
  }else{
    }
}
bot.on("physicTick",MLGblock)