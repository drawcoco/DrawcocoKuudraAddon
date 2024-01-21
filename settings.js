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
        const categories = ["Informations"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})


class Settings
{
    constructor() {
        this.initialize(this)
    }



//##############################################################################
//                INFORMATIONS
//##############################################################################

    @ButtonProperty({
        name: "Discord",
        description: "You can join the Discord to see updates, give feature ideas, and report bugs!",
        category: "Informations",
        placeholder: "Join Us!"
    })
    MyDiscord() {
        java.awt.Desktop.getDesktop().browse(new java.net.URI("https://discord.gg/8YcmJA7aeM"));
    }
}
export default new Settings