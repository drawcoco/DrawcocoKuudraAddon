import {
    @ButtonProperty,
    @CheckboxProperty,
    Color,
    @ColorProperty,
    @DecimalSliderProperty,
    @PercentSliderProperty,
    @SliderProperty,
    @SelectorProperty,
    @SwitchProperty,
    @TextProperty,
    @Vigilant
} from "Vigilance";


@Vigilant("scStats", "scStats", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["Informations", "Kuudra"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})


class Settings
{
    constructor() {
        this.initialize(this);
    }


    //##############################################################################
    //                Informations
    //##############################################################################


    @ButtonProperty({
        name: "Discord",
        description: "You can join the Discord to see updates, give feature ideas, and report bugs! ",
        category: "Informations",
        placeholder: "Join Us !"
    })
    MyDiscord() {
        java.awt.Desktop.getDesktop().browse(new java.net.URI("https://discord.gg/8YcmJA7aeM"));
    }

     
    //##############################################################################
    //                Kuudra
    //##############################################################################


    @SwitchProperty({
        name: "Chest Calculator",
        description: "Calculate an approximate value of the chest (does not substract the key price! )",
        category: "Kuudra",
        subcategory: "Kuudra"
    })
    chestCalc = true;

    @SwitchProperty({
        name: "Mana Drain display",
        description: "Shows the total mana drained by your mates during a fight. (Only works if your mates use DKA)",
        category: "Kuudra",
        subcategory: "Kuudra"
    })
    manaDrainDisplay = true;

}
export default new Settings