// 基本資料庫
const mineflayer = require("mineflayer")
const Vec3 = require('vec3').Vec3
 
// Bot 創建 與 MC資料庫
const bot = mineflayer.createBot({
  port: 63446,
  host: "localhost",
  username: "PsauceBot",
})
const mcData = require("minecraft-data")(bot.version)
const pos = new Vec3(bot.entity.position.x,bot.entity.position.y - 1,bot.entity.position.z)

const MLG = () => {
  if (bot.inventory.slots[36] == null) {
    for (let inventory_slots = 36; inventory_slots < 46; inventory_slots++){
      if(bot.inventory.slots[inventory_slots].name == null) return
      if (bot.inventory.slots[inventory_slots].name == mcData.items[661].name) {
        bot.moveSlotItem(inventory_slots, 36)
        break
      }
    }
  }else{
    if (bot.inventory.slots[36] != mcData.items[661].name) {
      for (let inventory_slots = 36; inventory_slots < 46; inventory_slots++){
        if(bot.inventory.slots[inventory_slots].name == null) return
        if (bot.inventory.slots[inventory_slots].name == mcData.items[661].name) {
          bot.moveSlotItem(inventory_slots, 36)
          break
        }
      }
    }
  }
  bot.lookAt(pos)
  while (bot.blockAt(pos).name == mcData.blocks[0].name) {
    if (bot.blockAt(pos).name != mcData.blocks[0].name) {
      bot.activateItem()
      bot.activateItem()
      break
    }
  }
}
