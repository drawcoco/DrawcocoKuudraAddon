// imports
import { request } from "axios";


var stuff = {
    "username" : "",
    "skyblock_level" : 0,
    "MP" : 0,
    "oneB_bank" : "false",
    "Terror" : {
      "tier" : "false",
      "ll" : 0,
      "dom" : 0,
      "mp" : 0
    },
    "Aurora" : {
      "tier" : "false"
    },
    "Terminator" : {
      "Ult" : [],
      "pow_seven" : "false",
      "cub_six" : "false"
    },
    "Hyperion" : "false",
    "Reaper" : "false",
    "Ragaxe" : {
      "present" : "false",
      "chimera" : 0
    }
  }
  
var ArmorTiers = [[5, "Infernal"],[4, "Fiery"], [3, "Burning"], [2, "Hot"], [1, ""]];



export function getStuff(username) {
    ChatLib.chat("Requesting SkyCrypt ...");
    request({url: `https://sky.shiiyu.moe/api/v2/profile/${username}`, json: true}).then(response => {
        ChatLib.chat("...");
        playerProfile = Object.entries(response.data.profiles).find(profile => profile[1].current == true)[1];
    
        stuff.username = username;
        stuff.skyblock_level = playerProfile.data.skyblock_level.level;
        stuff.MP = playerProfile.data.accessories.magical_power.total;
        stuff.oneB_bank = (parseInt(playerProfile.data.networth.bank) > 950000000).toString();
    
        playerProfile.items.inventory.forEach(item => {
        if (item.display_name != null) {
            if (item.display_name.includes("Ragnarock")) {
            stuff.Ragaxe.present = "true";
            if (item.tag.ExtraAttributes.enchantments.ultimate_chimera != null) {
                stuff.Ragaxe.chimera = item.tag.ExtraAttributes.enchantments.ultimate_chimera;
            }
            }
            if (item.display_name.includes("Hyperion") || item.display_name.includes("Valkyrie") || item.display_name.includes("Scylla") || item.display_name.includes("Astraea")) {
            stuff.Hyperion = "true";
            }
            if (item.display_name.includes("Terminator")) {
            if (item.tag.ExtraAttributes.enchantments.ultimate_reiterate != null) {
                stuff.Terminator.Ult.push("duplex");
                if (item.tag.ExtraAttributes.enchantments.power != null) {
                if (item.tag.ExtraAttributes.enchantments.power == 7) {
                    stuff.Terminator.pow_seven = "true";
                }
                }
                if (item.tag.ExtraAttributes.enchantments.cubism != null) {
                if (item.tag.ExtraAttributes.enchantments.cubism == 6) {
                    stuff.Terminator.cub_six = "true";
                }
                }
            } else if (item.tag.ExtraAttributes.enchantments.ultimate_fatal_tempo != null) {
                stuff.Terminator.Ult.push("Fatal Tempo");
            } else {
                stuff.Terminator.Ult.push("other ult");
            }
            }
        }
        });
    
        bestTerror = 0;
        bestAurora = 0;
        playerProfile.items.wardrobe.forEach(armor => {
        ll = 0;
        dom = 0;
        mp = 0;
    
        armor.forEach(piece => {
            if (piece != null) {
            if (piece.display_name.includes("Reaper")) {
                stuff.Reaper = "true";
            }
            if (piece.display_name.includes("Terror")) {
                ArmorTiers.forEach(tier => {
                if (piece.display_name.includes(tier[1])) {
                    if (bestTerror <= tier[0]) {
                    bestTerror = tier[0];
                    stuff.Terror.tier = tier[1];
                    if (piece.tag.ExtraAttributes.attributes.dominance != null) {
                        dom += piece.tag.ExtraAttributes.attributes.dominance;
                        console.log(piece);
                        if (stuff.Terror.dom < dom) {
                        stuff.Terror.dom = dom;
                        }
                    }
                    if (piece.tag.ExtraAttributes.attributes.lifeline != null) {
                        ll += piece.tag.ExtraAttributes.attributes.lifeline;
                        if (stuff.Terror.ll < ll) {
                        stuff.Terror.ll = ll;
                        }
                    }
                    if (piece.tag.ExtraAttributes.attributes.mana_pool != null) {
                        mp += piece.tag.ExtraAttributes.attributes.mana_pool;
                        if (stuff.Terror.mp < mp) {
                        stuff.Terror.mp = mp;
                        }
                    }
                    }
                }
                });
            }
            if (piece.display_name.includes("Aurora")) {
                ArmorTiers.forEach(tier => {
                if (piece.display_name.includes(tier[1])) {
                    if (bestAurora < tier[0]) {
                    bestAurora = tier[0];
                    stuff.Aurora.tier = tier[1];
                    }
                }
                });
            }
            }
        });
        });
    
        ll = 0;
        dom = 0;
        mp = 0;
        playerProfile.items.armor.armor.forEach(piece => {
        if (piece != null) {
            if (piece.display_name.includes("Terror")) {
            ArmorTiers.forEach(tier => {
                if (piece.display_name.includes(tier[1])) {
                if (bestTerror <= tier[0]) {
                    bestTerror = tier[0];
                    stuff.Terror.tier = tier[1];
                    if (piece.tag.ExtraAttributes.attributes.dominance != null) {
                    dom += piece.tag.ExtraAttributes.attributes.dominance;
                    if (stuff.Terror.dom < dom) {
                        stuff.Terror.dom = dom;
                    }
                    }
                    if (piece.tag.ExtraAttributes.attributes.lifeline != null) {
                    ll += piece.tag.ExtraAttributes.attributes.lifeline;
                    if (stuff.Terror.ll < ll) {
                        stuff.Terror.ll = ll;
                    }
                    }
                    if (piece.tag.ExtraAttributes.attributes.mana_pool != null) {
                    mp += piece.tag.ExtraAttributes.attributes.mana_pool;
                    if (stuff.Terror.mp < mp) {
                        stuff.Terror.mp = mp;
                    }
                    }
                }
                }
            });
            }
            if (piece.display_name.includes("Aurora")) {
            ArmorTiers.forEach(tier => {
                if (piece.display_name.includes(tier[1])) {
                if (bestAurora < tier[0]) {
                    bestAurora = tier[0];
                    stuff.Aurora.tier = tier[1];
                }
                }
            });
            }
        }
        });
    
        playerProfile.items.equipment.equipment.forEach(equipment => {
        if (equipment != null) {
            if (equipment.display_name.includes("Molten")) {
            if (equipment.tag.ExtraAttributes.attributes.dominance != null) {
                stuff.Terror.dom += equipment.tag.ExtraAttributes.attributes.dominance;
            }
            if (equipment.tag.ExtraAttributes.attributes.lifeline != null) {
                stuff.Terror.ll += equipment.tag.ExtraAttributes.attributes.lifeline;
            }
            if (equipment.tag.ExtraAttributes.attributes.mana_pool != null) {
                stuff.Terror.mp += equipment.tag.ExtraAttributes.attributes.mana_pool;
            }
            }
        }
        })
        let terrorDisp = ``
        if (stuff.Terror.tier != "false") {
            terrorDisp = `Terror ${stuff.Terror.tier}    `;
            if (stuff.Terror.tier != "false") {
                terrorDisp += (stuff.Terror.ll > stuff.Terror.dom ? `ll ${stuff.Terror.ll} ` : `dom ${stuff.Terror.dom} `);
                terrorDisp += `mp ${stuff.Terror.mp}`;
            }
        } else {
            terrorDisp = `$4No Terror`;
        }

        let termDisp = ``;
        if (stuff.Terminator.Ult.length > 0) {
            termDisp = `Terminator : `;
            stuff.Terminator.Ult.forEach(ult => {
                termDisp += `${ult} `;
            });
            if (stuff.Terminator.pow_seven == "true" || stuff.Terminator.cub_six == "true") {
                termDisp += `&6[`;
                if (stuff.Terminator.pow_seven == "true") {
                    termDisp += `p7`;
                    if (stuff.Terminator.cub_six == "true") {
                        termDisp += `, c6`;
                    }
                } else {
                    termDisp += `c6`;
                }
                termDisp += `]&r`;
            }
        } else {
            termDisp = `$4no Terminator&r`;
        }

        let ragaxeDisp = ``;
        if (stuff.Ragaxe.present == "true") {
            ragaxeDisp = `Ragaxe `;
            if (stuff.Ragaxe.chimera > 0) {
                ragaxeDisp += `&6chimera ${stuff.Ragaxe.chimera}&r`;
            }
        } else {
            ragaxeDisp = `&4No Ragaxe&r`;
        }

        ChatLib.chat(`&2&l~~~ Info for player ${stuff.username} ~~~&r`);
        ChatLib.chat(parseInt(stuff.skyblock_level) > 300 ? `&6Sb Lvl ${stuff.skyblock_level}&r` : parseInt(stuff.skyblock_level) < 200 ? `&4Sb Lvl ${stuff.skyblock_level}&r` : `Sb Lvl ${stuff.skyblock_level}`);
        ChatLib.chat(parseInt(stuff.MP) > 1200 ? `&6Magical Power ${stuff.MP}&r` : parseInt(stuff.MP) < 800 ? `&4Magical Power ${stuff.MP}&r` : `Magical Power ${stuff.MP}`);
        ChatLib.chat(stuff.Hyperion != "false" ? `Hyperion OK` : `&4Hyperion KO&r`);
        ChatLib.chat(terrorDisp);
        ChatLib.chat(`Aurora ${stuff.Aurora.tier}`);
        ChatLib.chat(termDisp);
        ChatLib.chat(stuff.oneB_bank == "true" ? `1b bank OK` : `&41b bank KO&r`);
        ChatLib.chat(ragaxeDisp);
        ChatLib.chat(stuff.Reaper == "true" ? `Reaper armor OK` : `&4Reaper armor KO&r`);

    }).chat(error => {
        ChatLib.chat(error);
    })
}