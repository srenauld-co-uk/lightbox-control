import { Diet } from '@mandl-tv/lightbox-client/dist/diet/dto/diet.dto';

export enum FetchState {
    Fetching = 'fetching',
    Idle = 'idle'
}
export type DietState = {
    diets: Array<Diet>;
    selectedDietIdx: number;
    dataState: {
        fetching: FetchState
    }
}