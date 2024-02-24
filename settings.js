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
        const categories = ["Informations", "Graphs", "Worm", "Party ping", "Others"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})


class Settings
{
    constructor() {
        this.initialize(this);
    }


     
    //##############################################################################
    //                Worm
    //##############################################################################


    @SwitchProperty({
        name: "Worm fishing Counter",
        description: "count the number of worms near you, and send a party message when it cap",
        category: "Worm",
        subcategory: "Worm"
    })
    wormCounter = false;


    @SwitchProperty({
        name: "Worm fishing Party Notifier",
        description: "Notify the party when the cap for worms is reached",
        category: "Worm",
        subcategory: "Worm"
    })
    wormPartyNotifier = false;




}
export default new Settings