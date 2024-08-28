import { sf7 } from '../html/sf7';

export const StrawberryFarmConfig = {
  input: {
    iconRender: (name: string) => {
      return sf7('i-feather', { i: name });
    },
  },
};

interface StrawberryFarm {

}