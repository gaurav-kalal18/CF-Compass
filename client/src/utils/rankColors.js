export function getRankColor(rank) {

    switch(rank){

        case "newbie":
            return "#808080";

        case "pupil":
            return "#008000";

        case "specialist":
            return "#03A9F4";

        case "expert":
            return "#0000FF";

        case "candidate master":
            return "#AA00FF";

        case "master":
            return "#FF9800";

        case "international master":
            return "#FF8C00";

        case "grandmaster":
            return "#FF0000";

        case "international grandmaster":
            return "#FF0000";

        case "legendary grandmaster":
            return "#AA0000";

        default:
            return "#607D8B";

    }

}