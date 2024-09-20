
import create from "./http-service";

export interface Game {
    id: number;
    image_background: string;
    name: string;
    slug: string;
    games_count: number;
}

export default create("/games");