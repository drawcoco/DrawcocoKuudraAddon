// data format
import settings from "./settings";

var movedisplay = new Gui();

// option settings GUI
register("command", () => {
    settings.openGUI();
}).setName("DrawcocoKuudraAddon").setAliases("dka");


//===========================================================================================
//              GUI
//===========================================================================================

// move graph event
register("command", () => {
    movedisplay.open();
}).setName("moveKuudraGui").setAliases("mkg");


// mouse click event
register("guimouseclick", (x, y, button, gui, event) => {

})

// mouse drag event
register("dragged", (dx, dy, x, y) => {

});


// mouse release event
register("guimouserelease", (x, y, button, gui, event) => {

});


kuudraChestMoney = "";

// render event
register("renderoverlay", () => {
    sx = Renderer.screen.getWidth();
    sy = Renderer.screen.getHeight();

    new Text(kuudraChestMoney, 10, 10).setColor(Renderer.WHITE).draw();
});











function getArmorPrice(Type, Part, attr1, lvl1, attr2, lvl2) {
    if (Type == "Aurora") {
      return Math.max(isAuroraGodRoll(attr1, attr2) / (Part == "Helmet" ? 10 : 1), uniqueArmorAttr(attr1, lvl1, attr2, lvl2)).toString();
    }
    else if (Type == "Crimson") {
      return Math.max(isCrimsonGodRoll(attr1, attr2) / (Part == "Helmet" ? 10 : 1), uniqueArmorAttr(attr1, lvl1, attr2, lvl2)).toString();
    }
    else if (Type == "Terror") {
      return Math.max(isTerrorGodRoll(attr1, attr2) / (Part == "Helmet" ? 10 : 1), uniqueArmorAttr(attr1, lvl1, attr2, lvl2)).toString();
    }
    else if (Type == "Hollow") {
      return Math.max(isHollowGodRoll(attr1, attr2) / (Part == "Helmet" ? 10 : 1), uniqueArmorAttr(attr1, lvl1, attr2, lvl2)).toString();
    }
    else { // fervor
      return uniqueArmorAttr(attr1, lvl1, attr2, lvl2).toString();
    }
}
  
function uniqueArmorAttr(attr1, lvl1, attr2, lvl2) {
    let bonusLvl1 = lvl1 == 6 ? 0.5 : Math.pow(2, 5-lvl1);
    let bonusLvl2 = lvl2 == 6 ? 0.5 : Math.pow(2, 5-lvl2);

    let prices = [500000];
    if (attr1 == "Mana Pool" || attr2 == "Mana Pool") {
        prices.push(8000000 / (attr1 == "Mana Pool" ? bonusLvl1 : bonusLvl2));
    }
    if (attr1 == "Mana Regeneration" || attr2 == "Mana Regeneration") {
        prices.push(1000000 / (attr1 == "Mana Regeneration" ? bonusLvl1 : bonusLvl2));
    }
    if (attr1 == "Speed" || attr2 == "Speed") {
        prices.push(1000000 / (attr1 == "Speed" ? bonusLvl1 : bonusLvl2));
    }
    if (attr1 == "Veteran" || attr2 == "Veteran") {
        prices.push(6000000 / (attr1 == "Veteran" ? bonusLvl1 : bonusLvl2));
    }
    if (attr1 == "Vitality" || attr2 == "Vitality") {
        prices.push(5000000 / (attr1 == "Vitality" ? bonusLvl1 : bonusLvl2));
    }
    if (attr1 == "Breeze" || attr2 == "Breeze") {
        prices.push(4000000 / (attr1 == "Breeze" ? bonusLvl1 : bonusLvl2));
    }
    if (attr1 == "Dominance" || attr2 == "Dominance") {
        prices.push(4000000 / (attr1 == "Dominance" ? bonusLvl1 : bonusLvl2));
    }
    if (attr1 == "Lifeline" || attr2 == "Lifeline") {
        prices.push(7000000 / (attr1 == "Lifeline" ? bonusLvl1 : bonusLvl2));
    }
    if (attr1 == "Magic Find" || attr2 == "Magic Find") {
        prices.push(7000000 / (attr1 == "Magic Find" ? bonusLvl1 : bonusLvl2));
    }
    return Math.max(...prices);
}

function isAuroraGodRoll(attr1, attr2) {
    if (attr1 == "Mana Pool" && attr2 == "Mana Regeneration") {
        return 220000000;
    }
    if (attr1 == "Magic Find" && attr2 == "Mana Pool") {
        return 15000000;
    }
    return 0;
}

function isCrimsonGodRoll(attr1, attr2) {
    if (attr1 == "Veteran" && attr2 == "Vitality") {
        return 60000000;
    }
    if (attr1 == "Magic Find" && attr2 == "Veteran") {
        return 250000000;
    }
    if (attr1 == "Dominance" && attr2 == "Vitality") {
        return 15000000;
    }
    return 0;
}

function isTerrorGodRoll(attr1, attr2) {
    if (attr1 == "Lifeline" && attr2 == "Mana Pool") {
        return 110000000;
    }
    if (attr1 == "Dominance" && attr2 == "Mana Pool") {
        return 15000000;
    }
    if (attr1 == "Dominance" && attr2 == "Vitality") {
        return 30000000;
    }
    return 0;
}

function isHollowGodRoll(attr1, attr2) {
    if (attr1 == "Mana Pool" && attr2 == "Mana Regeneration") {
        return 25000000;
    }
    return 0;
}

function getEquipmentPrice(Part, attr1, lvl1, attr2, lvl2) {
    return Math.max(isEquipGodRoll(Part, attr1, attr2), uniqueEquipmentAttr(Part, attr1, lvl1, attr2, lvl2));
}

function isEquipGodRoll(Part, attr1, attr2) {
    if (Part == "Necklace") {
        if (attr1 == "Mana Pool" && attr2 == "Mana Regeneration") {
            return 60000000;
        }
    } else if (Part == "Cloak") {
        if (attr1 == "Lifeline" && attr2 == "Mana Pool") {
            return 70000000;
        }
        if (attr1 == "Magic Find" && attr2 == "Veteran") {
            return 50000000;
        }
        if (attr1 == "Mana Pool" && attr2 == "Mana Regeneration") {
            return 50000000;
        }
    } else if (Part == "Belt") {
        if (attr1 == "Lifeline" && attr2 == "Mana Pool") {
            return 90000000;
        }
        if (attr1 == "Magic Find" && attr2 == "Veteran") {
            return 60000000;
        }
    } else { // bracelet
        if (attr1 == "Lifeline" && attr2 == "Mana Pool") {
            return 50000000;
        }
        if (attr1 == "Magic Find" && attr2 == "Veteran") {
            return 50000000;
        }
    }
    return 0;
}

function uniqueEquipmentAttr(Part, attr1, lvl1, attr2, lvl2) {
    let bonusLvl1 = lvl1 == 6 ? 0.5 : Math.pow(2, 5-lvl1);
    let bonusLvl2 = lvl2 == 6 ? 0.5 : Math.pow(2, 5-lvl2);

    let prices = [1000000];
    if (attr1 == "Mana Pool" || attr2 == "Mana Pool") {
        prices.push((Part == "Necklace" ? 15000000 : Part == "Cloak" ? 18000000 : Part == "Belt" ? 12000000 : 11000000) / (attr1 == "Mana Pool" ? bonusLvl1 : bonusLvl2));
    }
    if (attr1 == "Dominance" || attr2 == "Dominance") {
        prices.push((Part == "Necklace" ? 14000000 : Part == "Cloak" ? 6000000 : Part == "Belt" ? 6000000 : 6000000) / (attr1 == "Dominance" ? bonusLvl1 : bonusLvl2));
    }
    if (attr1 == "Lifeline" || attr2 == "Lifeline") {
        prices.push((Part == "Necklace" ? 6000000 : Part == "Cloak" ? 20000000 : Part == "Belt" ? 24000000 : 26000000) / (attr1 == "Lifeline" ? bonusLvl1 : bonusLvl2));
    }
    if (attr1 == "Veteran" || attr2 == "Veteran") {
        prices.push((Part == "Necklace" ? 9000000 : Part == "Cloak" ? 9000000 : Part == "Belt" ? 9000000 : 6000000) / (attr1 == "Veteran" ? bonusLvl1 : bonusLvl2));
    }
    if (attr1 == "Vitality" || attr2 == "Vitality") {
        prices.push((Part == "Necklace" ? 4000000 : Part == "Cloak" ? 4000000 : Part == "Belt" ? 4000000 : 4000000) / (attr1 == "Vitality" ? bonusLvl1 : bonusLvl2));
    }
    if (attr1 == "Magic Find" || attr2 == "Magic Find") {
        prices.push((Part == "Necklace" ? 4000000 : Part == "Cloak" ? 20000000 : Part == "Belt" ? 14000000 : 14000000) / (attr1 == "Magic Find" ? bonusLvl1 : bonusLvl2));
    }
    if (attr1 == "Mana Regeneration" || attr2 == "Mana Regeneration") {
        prices.push((Part == "Necklace" ? 7000000 : Part == "Cloak" ? 5000000 : Part == "Belt" ? 2000000 : 4000000) / (attr1 == "Mana Regeneration" ? bonusLvl1 : bonusLvl2));
    }
    if (attr1 == "Breeze" || attr2 == "Breeze") {
        prices.push((Part == "Necklace" ? 10000000 : Part == "Cloak" ? 10000000 : Part == "Belt" ? 5000000 : 2000000) / (attr1 == "Breeze" ? bonusLvl1 : bonusLvl2));
    }
    if (attr1 == "Speed" || attr2 == "Speed") {
        prices.push((Part == "Necklace" ? 6000000 : Part == "Cloak" ? 6000000 : Part == "Belt" ? 7000000 : 8000000) / (attr1 == "Speed" ? bonusLvl1 : bonusLvl2));
    }

    return Math.max(...prices);
}


function getEnchantPrice(enchant, lvl) {
    let bonusLvl = Math.pow(2, 5-lvl);

    if (enchant == "Fatal Tempo") {
        return 80000000;
    }
    if (enchant == "Inferno") {
        return 10000000;
    }

    if (enchant == "Hardened Mana") {
        return 400000 / bonusLvl;
    }
    if (enchant == "Ferocious Mana") {
        return 1300000 / bonusLvl;
    }
    if (enchant == "Strong Mana") {
        return 1800000 / bonusLvl;
    }
    if (enchant == "Mana Vampire") {
        return 1800000 / bonusLvl;
    }
    return 0;
}

function getShardPrice(shard, lvl) {
    let bonusLvl = Math.pow(2, 4-lvl);

    if (shard == "Breeze") {
        return 7000000 / bonusLvl;
    }
    if (shard == "Dominance") {
        return 6500000 / bonusLvl;
    }
    if (shard == "Lifeline") {
        return 9000000 / bonusLvl;
    }
    if (shard == "Magic Find") {
        return 8000000 / bonusLvl;
    }
    if (shard == "Mana Pool") {
        return 10000000 / bonusLvl;
    }
    if (shard == "Mana Regeneration") {
        return 6000000 / bonusLvl;
    }
    if (shard == "Speed") {
        return 3500000 / bonusLvl;
    }
    if (shard == "Veteran") {
        return 7000000 / bonusLvl;
    }
    if (shard == "Vitality") {
        return 7000000 / bonusLvl;
    }
    if (shard == "Blazing Fortune") {
        return 9000000 / bonusLvl;
    }
    if (shard == "Fishing Experience") {
        return 10000000 / bonusLvl;
    }
    if (shard == "Double Hook") {
        return 4000000 / bonusLvl;
    }
    if (shard == "Fishing Speed") {
        return 5000000 / bonusLvl;
    }
    if (shard == "Trophy Hunter") {
        return 3000000 / bonusLvl;
    }
    return 500000;
}


EndedKuudra = 1;

armorTypes = ["Aurora", "Crimson", "Terror", "Fervor", "Hollow"];
armorParts = ["Helmet", "Chestplate", "Leggings", "Boots"];
armorAttr = ["Arachno Resistance", "Blazing Resistance", "Breeze", "Dominance","Ender Resistance","Experience","Fortitude","Life Regeneration",
    "Lifeline","Magic Find","Mana Pool","Mana Regeneration","Speed","Undead Resistance","Veteran", "Vitality"];
bookEnchants = ["Fatal Tempo", "Inferno", "Hardened Mana", "Ferocious Mana", "Strong Mana", "Mana Vampire"];
equipmentParts = ["Belt", "Necklace", "Cloak", "Bracelet"];

shardAttr = ["Arachno Resistance", "Blazing Resistance", "Breeze", "Dominance","Ender Resistance","Experience","Fortitude","Life Regeneration",
"Lifeline","Magic Find","Mana Pool","Mana Regeneration","Speed","Undead Resistance","Veteran", "Vitality",
"Arachno", "Attack Speed", "Blazing", "Combo", "Elite", "Ender", "Ignition", "Life Recovery", "Mana Steal", "Midas Touch", "Undead", "Warrior",
"Deadeye", "Blazing Fortune","Fishing Experience", "Infection", "Double Hook", "Fisherman", "Fishing Speed", "Hunter", "Trophy Hunter"];

const romanVal = {
    I: 1,
    V: 5,
    X: 10
}



function romanToInt(romanString) {
    total = 0;
    for (let i = 0; i < romanString.length; i++) {
        if (romanString[i] == "I" && romanString[i+1] == "V") {
            total += 4;
            i++;
        }
        else if (romanString[i] == "I" && romanString[i+1] == "X") {
            total += 9;
            i++;
        }
        else {
            total += romanVal[romanString[i]];
        }
    }
    return total;
}

register("tick", () => {
    try {
        // after a kuudra run ended
        if (EndedKuudra == 1) {
            openedChest = Player.getContainer();
            // when you open a large chest
            if (openedChest.getName() == "Paid Chest" || openedChest.getName() == "Large Chest") {
                items = openedChest.getItems();
                // cycle throuth the slots
                for (i = 0; i < 54; i++) {
                    // if there's an item
                    if (items[i] != null) {

                        // Armor Management part
                        // try every combination of kuudra armor and piece on the item
                        armorTypes.forEach(armorType => {
                            armorParts.forEach(armorPart => {
                                // if there's a match, get the lore of the item
                                if (items[i].getName().includes(armorType + " " + armorPart)) {
                                    spaces = 0;
                                    // sneaky move to not get stats as attributes (like Speed and Health Regen)
                                    attributes = [];
                                    items[i].getLore().forEach(lorePart => {
                                        if (lorePart.includes("⚔")) {
                                            spaces += 1;
                                        }
                                        // get the attributes and display them
                                        if (spaces == 1) {
                                            armorAttr.forEach(attr => {
                                                if (lorePart.includes(attr) && !lorePart.includes("Grants")) {
                                                    splits = lorePart.split(' ');
                                                    level = romanToInt(splits[splits.length-1]);
                                                    attributes.push([attr, level]);
                                                }
                                            });
                                        }
                                    });
                                    kuudraChestMoney += armorType + " " + armorPart + " : " + attributes[0][0] + attributes[0][1] + " and " + attributes[1][0] + attributes[1][1] +
                                                            " => " + getArmorPrice(armorType, armorPart, attributes[0][0], attributes[0][1], attributes[1][0], attributes[1][1]) + "\n";
                                }
                            });
                        });
                        
                        // Equipment Management part
                        // try every combination of kuudra armor and piece on the item
                        equipmentParts.forEach(equipmentPart => {
                            // if there's a match, get the lore of the item
                            if (items[i].getName().includes(equipmentPart)) {
                                spaces = 0;
                                // sneaky move to not get stats as attributes (like Speed and Health Regen)
                                attributes = [];
                                items[i].getLore().forEach(lorePart => {

                                    if (lorePart.length < 5) {
                                        spaces += 1;
                                    }
                                    // get the attributes and display them
                                    if (spaces == 1) {
                                        armorAttr.forEach(attr => {
                                            if (lorePart.includes(attr) && !lorePart.includes("Grants")) {
                                                splits = lorePart.split(' ');
                                                level = romanToInt(splits[splits.length-1]);
                                                attributes.push([attr, level]);
                                            }
                                        });
                                    }
                                });
                                kuudraChestMoney += equipmentPart + " : " + attributes[0][0] + attributes[0][1] + " and " + attributes[1][0] + attributes[1][1] +
                                                        " => " + getEquipmentPrice(equipmentPart, attributes[0][0], attributes[0][1], attributes[1][0], attributes[1][1]) + "\n";
                            }
                        })

                        // Book Management part
                        // if the item is a book
                        if (items[i].getName().includes("Enchanted Book")) {
                            nameLore = items[i].getLore()[1];
                            // try every combination of book on the item
                            bookEnchants.forEach(enchant => {
                                if (nameLore.includes(enchant)) {
                                    // magic to get level and name then display
                                    splits = nameLore.split(' ');
                                    level = romanToInt(splits[splits.length-1]);
                                    kuudraChestMoney += enchant + level + " => " + getEnchantPrice(enchant, level) + "\n";
                                }
                            });
                        }

                        // Shard Management part
                        // if the item is an attribute shard
                        if (items[i].getName().includes("Attribute Shard")) {
                            nameLore = items[i].getLore()[1];
                            // try every combination of shard on the item
                            shardAttr.forEach(shard => {
                                if (nameLore.includes(shard)) {
                                    // magic to get level and name then display
                                    splits = nameLore.split(' ');
                                    level = romanToInt(splits[splits.length-1]);
                                    kuudraChestMoney += shard + level + " => " + getShardPrice(shard, level) + "\n";
                                }
                            });
                        }

                        // Other Items Management part
                        if (items[i].getName().includes("Enrager")) {
                            kuudraChestMoney += "ENRAGER => " + 3000000000 + "\n";
                            ChatLib.chat("what da french seal !!! enrager !!!");
                        }

                        if (items[i].getName().includes("Wheel of Fate")) {
                            kuudraChestMoney += "WoF => " + 12000000 + "\n";
                            ChatLib.chat("Woof ! Woof !!!");
                        }

                        if (items[i].getName().includes("Tentacle Dye")) {
                            kuudraChestMoney += "Dye => " + 13000000000 + "\n";
                            ChatLib.chat("DYE !!!");
                        }

                        if (items[i].getName().includes("Hollow Wand")) {
                            kuudraChestMoney += "Hollow Wand => " + 500000 + "\n";
                        }

                        if (items[i].getName().includes("Aurora Staff")) {
                            kuudraChestMoney += "Aurora Staff => " + 1000000 + "\n";
                        }
                    }
                }
                
                setTimeout(function() {
                    kuudraChestMoney = "";
                }, "10000");

                EndedKuudra = 0;
            }
        }
    } catch (ex) {
        ChatLib.chat(ex);
    }
});

// debug purpose
register("command", () => {
    EndedKuudra = true;
}).setName("endKuudra");


// kuudra end run detection
register("chat", () => {
    EndedKuudra = true;
}).setChatCriteria("                        Percentage Complete: 100%");