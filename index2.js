
const minflayer = require("mineflayer")
const bot = minflayer.createBot({
  port: 62331,
  host: "localhost",
  username: "PsauceBot2",
})

bot.once("spawn",() => {
  bot.mcData = require("minecraft-data")(bot.version)
})

bot.on("chat",(username,message) => {
  const args = message.split(' ')
  if (args[0] == "item_id") {
    const item_id = bot.mcData.itemsByName[args[1]].id
    bot.chat("那物品ID為" + item_id )
  }
  if (args[0] == "block_id") {
    const block_id = bot.mcData.blocksByName[args[1]].id
    bot.chat("那方塊ID為" + block_id )
  }
})


