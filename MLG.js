// 基本資料庫
const mineflayer = require("mineflayer")
const Vec3 = require('vec3').Vec3
 
// Bot 創建 與 MC資料庫
const bot = mineflayer.createBot({
  port: 50675,
  host: "localhost",
  username: "PsauceBot",
})
bot.once("spawn",() => {
  const mcData = require("minecraft-data")(bot.version)
  function water_check () {
    if (bot.inventory.slots[36] == null) {
      for (let inventory_slots = 36; inventory_slots <= 45; inventory_slots++){
        if(bot.inventory.slots[inventory_slots] == null) return
        if (bot.inventory.slots[inventory_slots].name == mcData.items[661].name) {
          bot.moveSlotItem(inventory_slots,36)
          break
        }
      }
    }else{
      if (bot.inventory.slots[36] != mcData.items[661].name) {
        for (let inventory_slots = 36; inventory_slots <= 45; inventory_slots++){
          if(bot.inventory.slots[inventory_slots] == null) return
          if (bot.inventory.slots[inventory_slots].name == mcData.items[661].name) {
            bot.moveSlotItem(inventory_slots,36)
            break
          }
        }
      }
    }
  }
  bot.on("physicTick",() => {
    const pos = new Vec3(bot.entity.position.x,bot.entity.position.y - 1,bot.entity.position.z)
    if (bot.blockAt(pos) == null) return
    if (bot.blockAt(pos).name == mcData.blocks[0].name) {
      water_check()
      bot.lookAt(pos)
      if (bot.blockAt(pos) != mcData.blocks[0].name) {
        bot.activateItem()
        setTimeout(() => {
          bot.activateItem()
        }, 100);
      }
    }
  })
})

