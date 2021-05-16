
const minflayer = require("mineflayer")
const bot = minflayer.createBot({
  port: 63446,
  host: "localhost",
  username: "PsauceBot2",
})

bot.on("physicTick",()=>{
  const helditem = bot.heldItem
  console.log(helditem)
})



