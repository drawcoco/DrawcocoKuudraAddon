// imports
import settings from "./settings";
import {data} from "./utils";
import { request } from "axios";

import { priceManify, ArmorManagement, EquipmentManagement, BookManagement, ShardManagement } from "./features/ChestPrice.js";
import { getStuff } from "./features/GetStuff.js";


ChatLib.chat("DKA running");




var movedisplay = new Gui();

// option settings GUI
register("command", () => {
    settings.openGUI();
}).setName("DrawcocoKuudraAddon").setAliases("dka");


//===========================================================================================
//              GUI
//===========================================================================================

var moveMana = false;
var moveProfit = false;

var cx = 0;
var cy = 0;


// move graph event
register("command", () => {
    movedisplay.open();
}).setName("moveKuudraGui").setAliases("mkg");

// mouse click event
register("guimouseclick", (x, y, button, gui, event) => {
    if (x > data.display.xMana - 5 &&
        x < data.display.xMana + 80 &&
        y > data.display.yMana - 5 &&
        y < data.display.yMana + 20)
    {
        if (settings.manaDrainDisplay) {
            moveMana = true;
            cx = data.display.xMana- x;
            cy = data.display.yMana - y;
        }
    }
    else if (x > data.display.xProfit - 5 &&
        x < data.display.xProfit + 160 &&
        y > data.display.yProfit - 5 &&
        y < data.display.yProfit + 90)
    {
        if (settings.chestCalc) {
            moveProfit = true;
            cx = data.display.xProfit- x;
            cy = data.display.yProfit - y;
        }
    }
})

// mouse drag event
register("dragged", (dx, dy, x, y) => {
    if (!movedisplay.isOpen()) {
        return;
    }
    if (moveMana) {
        data.display.xMana = x+cx;
        data.display.yMana = y+cy;
        data.save();
    }
    if (moveProfit) {
        data.display.xProfit = x+cx;
        data.display.yProfit = y+cy;
        data.save();
    }
});

// mouse release event
register("guimouserelease", (x, y, button, gui, event) => {
    moveMana = false;
    moveProfit = false;
});


var kuudraChestMoney = "";
var myDrainage = 0;

// render event
register("renderoverlay", () => {
    sx = Renderer.screen.getWidth();
    sy = Renderer.screen.getHeight();

    if (settings.chestCalc) {
        xProfit = data.display.xProfit;
        yProfit = data.display.yProfit;

        new Text(kuudraChestMoney, xProfit, yProfit).setColor(Renderer.WHITE).draw();
        if (movedisplay.isOpen()) {
            let exemple = "Exemple Chestplate: 5m\nExemple Book: 1.2m\n\nTotal: 6.2m";
            new Text(exemple, xProfit, yProfit).setColor(Renderer.WHITE).draw();
            emptyRectangle(xProfit-5, yProfit-5, 160, 90);
        }
    }

    if (settings.manaDrainDisplay) {
        xMana = data.display.xMana;
        yMana = data.display.yMana;

        if (movedisplay.isOpen()) {
            let exemple = "Mana Drain: 1234";
            new Text(exemple, xMana, yMana).setColor(Renderer.WHITE).draw();
            emptyRectangle(xMana-5, yMana-5, 100, 20);
        }
        else if (myDrainage != 0) {
            new Text(`Mana Drain: ${myDrainage}`, xMana, yMana).setColor(Renderer.WHITE).draw();
        }
    }
});


function emptyRectangle(x, y, dx, dy) {
    new Rectangle(Renderer.WHITE, x, y, dx, 0).setOutline(Renderer.WHITE, 1.0).draw();
    new Rectangle(Renderer.WHITE, x, y, 0, dy).setOutline(Renderer.WHITE, 1.0).draw();
    new Rectangle(Renderer.WHITE, x, y+dy, dx, 0).setOutline(Renderer.WHITE, 1.0).draw();
    new Rectangle(Renderer.WHITE, x+dx , y, 0, dy).setOutline(Renderer.WHITE, 1.0).draw();
}

var EndedKuudraRegister = register("tick", () => {
    try {
        // after a kuudra run ended
        if (settings.chestCalc) {
            openedChest = Player.getContainer();
            // when you open a large chest
            if (openedChest.getName() == "Paid Chest" || openedChest.getName() == "Large Chest") {
                items = openedChest.getItems();
                // cycle throuth the slots

                let totalProfit = 0;

                for (i = 0; i < 54; i++) {
                    // if there's an item
                    if (items[i] != null) {
                        // Armor Management part
                        moneyAndDisplay = ArmorManagement(items[i]);
                        totalProfit += moneyAndDisplay[0];
                        kuudraChestMoney += moneyAndDisplay[1];
                        
                        // Equipment Management part
                        moneyAndDisplay = EquipmentManagement(items[i]);
                        totalProfit += moneyAndDisplay[0];
                        kuudraChestMoney += moneyAndDisplay[1];

                        // Book Management part
                        moneyAndDisplay = BookManagement(items[i]);
                        totalProfit += moneyAndDisplay[0];
                        kuudraChestMoney += moneyAndDisplay[1];

                        // Shard Management part
                        moneyAndDisplay = ShardManagement(items[i]);
                        totalProfit += moneyAndDisplay[0];
                        kuudraChestMoney += moneyAndDisplay[1];

                        // Other Items Management part
                        if (items[i].getName().includes("Enrager")) {
                            kuudraChestMoney += "ENRAGER : 3b\n";
                            totalProfit += 3000000000;
                            ChatLib.chat("&4what da french seal !!! enrager !!!");
                        }

                        if (items[i].getName().includes("Wheel of Fate")) {
                            kuudraChestMoney += "WoF : 12m\n";
                            totalProfit += 12000000;
                            ChatLib.chat("&4Woof ! Woof !!!");
                        }

                        if (items[i].getName().includes("Tentacle Dye")) {
                            kuudraChestMoney += "Dye : 13b\n";
                            totalProfit += 13000000000;
                            ChatLib.chat("&4DYE !!!");
                        }

                        if (items[i].getName().includes("Hollow Wand")) {
                            kuudraChestMoney += "Hollow Wand : 500k\n";
                            totalProfit += 500000;
                        }

                        if (items[i].getName().includes("Aurora Staff")) {
                            kuudraChestMoney += "Aurora Staff : 1m\n";
                            totalProfit += 1000000;
                        }
                    }
                }

                kuudraChestMoney += "\n" + "total : " + priceManify(totalProfit);
                
                // stop registering for chests until next kuudra end to prevent lag
                EndedKuudraRegister.unregister();

                setTimeout(function() {
                    kuudraChestMoney = "";
                }, "10000");
            }
        }
    } catch (ex) {
        ChatLib.chat(ex);
    }
});

EndedKuudraRegister.unregister();

// kuudra end run detection
register("chat", () => {
    // register for chest opening
    EndedKuudraRegister.register();
}).setChatCriteria("                        Percentage Complete: 100%");

// debug purpose
register("command", () => {
    ChatLib.chat("[DKA] forced chest calculator");
    EndedKuudraRegister.register();
}).setName("endKuudra");


// on mana drain using an end stone sword
register("chat", (mana) => {
    // get self coords
    myX = Player.getLastX();
    myY = Player.getLastY();
    myZ = Player.getLastZ();
    // construct the list of players around you
    names = [];
    World.getAllPlayers().forEach(p => {
        if (Math.pow(Math.pow(p.getLastX()-myX, 2) + Math.pow(p.getLastY()-myY, 2) + Math.pow(p.getLastZ()-myZ, 2), 0.5) < 4) {
            if (p.getName() != Player.getName()) {
                names.push(p.getName());
            }
        }
    })
    // generate the message and send it
    message = `[DKA] Drained ${mana} mana on [`;
    for(let n = 0; n < names.length; n++) {
        message += names[n];
        if (n < names.length-1) {
            message += `, `;
        }
    }
    message += `]`;
    ChatLib.say(`/pc ` + message);
}).setChatCriteria("Used Extreme Focus! (${mana} Mana)");


// on mana drain message in party, 
register("chat", (p, mana, names, event) => {
    if (settings.manaDrainDisplay) {
        // get hte list of players affected
        usernames = names.split(", ");
        // if you are part of the list, adds the mana to your total
        if (usernames.includes(Player.getName())) {
            myDrainage += parseInt(mana);
            setTimeout(function () {
                myDrainage -= parseInt(mana);
            }, 10000);
        }
    }
}).setChatCriteria("Party > ${p}: [DKA] Drained ${mana} mana on [${names}]");

register("chat", () => {
    ChatLib.say("/pc [DKA] Fresh");
}).setChatCriteria("Your Fresh Tools Perk bonus doubles your building speed for the next 10 seconds!");


register("command", (username) => {
    getStuff(username);
}).setName("getStuff");


register("chat", (username, cbtLvl, event) => {
    ChatLib.chat(`Looking for player ${username} in API!`);
    getStuff(username);
}).setCriteria("Party Finder > ${username} joined the group! (Combat Level ${cbtLvl})");

