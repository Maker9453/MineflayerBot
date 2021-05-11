const minflayer = require("mineflayer")
const bot = minflayer.createBot({
  port: 60618,
  host: "localhost",
  username: "PsauceBot",
})
const mcData = require("minecraft-data")(bot.version)
const pos = bot.entity.position,global
const theblock = bot.findBlock(options = {
  x: pos.x,
  y: pos.y - 1,
  z: pos.z,
}),global

function MLG(){
  bot.heldItem(mcData.items[661])
  bot.activateItem()
}
if (theblock == mcData.blocks[0]){
  MLG()
}
