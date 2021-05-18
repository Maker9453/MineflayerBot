
const minflayer = require("mineflayer")
const Vec3 = require("vec3").Vec3
const bot = minflayer.createBot({
  port: 50675,
  host: "localhost",
  username: "PsauceBot2",
})

bot.on("physicTick",()=>{
  const pos = new Vec3(bot.entity.position.x,bot.entity.position.y - 1,bot.entity.position.z)

})



