
import { Game } from "./game-service";
import create from "./http-service";

export interface Genre {
    id: number;
    image_background: string;
    name: string;
    slug: string;
    games_count: number;
    games: Game[];
}

export default create("/genres");