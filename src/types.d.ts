import 'redux-thunk/extend-redux';

export interface Pokemon {
    name: string,
    types: Array<string>,
    img: string,
    favorite?: boolean,
}