// data format
import {data} from "./utils"
import settings from "./settings"

var movedisplay = new Gui();

// option settings GUI
register("command", () => {
     
}).setName("DrawcocoKuudraAddon").setAliases("dka");




//===========================================================================================
//              GUI
//===========================================================================================

// move graph event
register("command", () => {
    movedisplay.open()
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
