// 基本資料庫
const minflayer = require("mineflayer")

// Bot 創建 與 MC資料庫
const bot = minflayer.createBot({
  port: 63150,
  host: "localhost",
  username: "PsauceBot",
})
// 基本指令
bot.on("spawn",MLG)
// 函式集
function MLG(){
  const bot_pos = {
    x: bot.entity.position.x,
    y: bot.entity.position.y - 1,
    z: bot.entity.position.z,
  }
  const mcData = require("minecraft-data")(bot.version)
  // 函式
  bot.heldItem = mcData.items[661]
}
