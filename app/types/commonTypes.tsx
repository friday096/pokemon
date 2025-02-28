interface Ability {
  ability: {
    name: string;
  };
}

interface Type {
  type: {
    name: string;
  };
}

interface Stat {
  stat: {
    name: string;
  };
  base_stat: number;
}

interface Move {
  move: {
    name: string;
  };
}

export interface PokemonDetailsType {
    name: string;
    sprites: {
        other: {
          'official-artwork': {
            front_default: string;
            front_shiny: string;
          };
        };
      };
    abilities: Ability[];
    types: Type[];
    stats: Stat[];
    moves: Move[];
  }

 export interface PokemonType {
    name: string;
    url: string;
  }