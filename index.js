// 基本資料庫
const mineflayer = require("mineflayer")
const Vec3 = require('vec3').Vec3
 
// Bot 創建 與 MC資料庫
const bot = mineflayer.createBot({
  port: 63446,
  host: "localhost",
  username: "PsauceBot",
})

bot.once("spawn",()=>{
  const mcData = require("minecraft-data")(bot.version)
  bot.on("physicTick",()=>{  
    const pos = new Vec3(bot.entity.position.x,bot.entity.position.y - 1,bot.entity.position.z)
    if (bot.blockAt(point = pos).name == mcData.blocks[0].name) {
      bot.lookAt(point = pos)
      bot.setQuickBarSlot(0)
      if(bot.inventory.slots[36] == null){
        for(let inventory_slots = 36; inventory_slots < 46; inventory_slots ++){
          if(bot.inventory.slots[inventory_slots] == null) return
          if (bot.inventory.slots[inventory_slots].name == mcData.items[661].name) {
            bot.moveSlotItem(inventory_slots, 36)
            bot.lookAt(point = pos)
            bot.activateItem()
            break
          }else{
            bot.lookAt(point = pos)
            bot.activateItem()
          }
        }
      }else{
        if(bot.inventory.slots[36].name != "water_bucket"){
          bot.chat("!= water_bucket")
          for(let inventory_slots = 36; inventory_slots < 45; inventory_slots ++){
            if(bot.inventory.slots[inventory_slots] == null) return
            if (bot.inventory.slots[inventory_slots].name == mcData.items[661].name) {
              bot.chat("move item")
              bot.moveSlotItem(inventory_slots, 36)
              bot.lookAt(point = pos)
              bot.activateItem()
              break
            }
          }
        }else{
          bot.chat("== water_bucket")
          bot.lookAt(point = pos)
          bot.activateItem()
          setTimeout(() => {
            bot.activateItem()
          }, 100);
          bot.chat("有放水")
        }
      }
    }
  })
})
