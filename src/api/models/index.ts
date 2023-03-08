import {IBaseFetch} from '../../models/IFetch';
import { Pokemon } from '../../types';

export interface IPokemonsResponse extends IBaseFetch {
    data: Pokemon[];
}