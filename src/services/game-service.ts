
import { Genre } from "./genre-service";
import create from "./http-service";
import { PlatForm } from "./platform-service";

export interface Game {
    id: number;
    background_image: string;
    name: string;
    slug: string;
    games_count: number;
    metacritic: number;
    playtime: number;
    rating_top: number;
    platforms: {
        platform: PlatForm;
        released_at: string;
    }[];
}

export interface GameQueryVars {
    genre: Genre | null;
    platform: PlatForm | null;
    sort: string;
    search: string;
    page: number;
}

export default create("/games");