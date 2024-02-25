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


// render event
register("renderoverlay", () => {

});











function getPrice(Type, Part, attr1, lvl1, attr2, lvl2) {
    if (Type == "Aurora") {
      return Math.max(isAuroraGodRoll(attr1, attr2) / (Part == "Helmet" ? 10 : 1), uniqueAttr(attr1, lvl1, attr2, lvl2)).toString();
    }
    else if (Type == "Crimson") {
      return Math.max(isCrimsonGodRoll(attr1, attr2) / (Part == "Helmet" ? 10 : 1), uniqueAttr(attr1, lvl1, attr2, lvl2)).toString();
    }
    else if (Type == "Terror") {
      return Math.max(isTerrorGodRoll(attr1, attr2) / (Part == "Helmet" ? 10 : 1), uniqueAttr(attr1, lvl1, attr2, lvl2)).toString();
    }
    else if (Type == "Hollow") {
      return Math.max(isHollowGodRoll(attr1, attr2) / (Part == "Helmet" ? 10 : 1), uniqueAttr(attr1, lvl1, attr2, lvl2)).toString();
    }
    else { // fervor
      return uniqueAttr(attr1, lvl1, attr2, lvl2).toString();
    }
}
  
function uniqueAttr(attr1, lvl1, attr2, lvl2) {
    bonusLvl1 = lvl1 == 6 ? 0.5 : Math.pow(2, 5-lvl1);
    bonusLvl2 = lvl2 == 6 ? 0.5 : Math.pow(2, 5-lvl2);

    prices = [500000];
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


EndedKuudra = 1;

armorTypes = ["Aurora", "Crimson", "Terror", "Fervor", "Hollow"];
armorParts = ["Helmet", "Chestplate", "Leggings", "Boots"];
armorAttr = ["Arachno Resistance", "Blazing Resistance", "Breeze", "Dominance","Ender Resistance","Experience","Fortitude","Life Regeneration",
    "Lifeline","Magic Find","Mana Pool","Mana Regeneration","Speed","Undead Resistance","Veteran", "Vitality"];
bookEnchants = ["Fatal Tempo", "Inferno", "Hardened Mana", "Ferocious Mana", "Strong Mana", "Mana Vampire"];

const romanVal = {
    I: 1,
    V: 5,
    X: 10
}



/*
t5
fero 1.5
vamp 1.7
hard 0.5
strong 1.8


*/




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

                        // Armor Managment part

                        // try every combination of kuudra armor and piece on the item
                        armorTypes.forEach(armorType => {
                            armorParts.forEach(armorPart => {
                                // if there's a match, get the lore of the item
                                if (items[i].getName().includes(armorType + " " + armorPart)) {
                                    ChatLib.chat("&6" + armorType + " " + armorPart);
                                    spaces = 0;
                                    // sneaky move to not get stats as attributes (like Speed and Health Regen)
                                    attributes = []
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
                                                    ChatLib.chat(attr + " &6" + level);
                                                }
                                            });
                                        }
                                    });
                                    ChatLib.chat("price: " + getPrice(armorType, armorPart, attributes[0][0], attributes[0][1], attributes[1][0], attributes[1][1]));
                                }
                            });
                        });

                        // Book Managment part
                    }
                }
                
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