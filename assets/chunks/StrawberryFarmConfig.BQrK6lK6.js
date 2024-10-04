const r=`import { sf7 } from '../html/sf7';\r
\r
export const StrawberryFarmConfig = {\r
  input: {\r
    iconRender: (name: string) => {\r
      return sf7('i-feather', { i: name });\r
    },\r
  },\r
};\r
\r
interface StrawberryFarm {\r
\r
}`;export{r as default};
