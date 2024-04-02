# To Prepare System Types
- Download updated system from [the foundryvtt-lancer repo](https://github.com/Eranziel/foundryvtt-lancer)
  - Unzip it to `D:\Users\Ryan\Documents\Projects\!Roleplaying\Lancer\!CODING\foundryvtt-lancer-master`

- Copy `tsconfig-emit.json` to the root of the system
- Open a Powershell (Admin) window:

cd D:\Users\Ryan\Documents\Projects\!Roleplaying\Lancer\!CODING\foundryvtt-lancer-master
npm install
npx tsc -p tsconfig-emit.json

- Copy the generated `.d.ts` files to `D:/Users/Ryan/Documents/Projects/!!!!CODING/FoundryVTTv10/FoundryDevData/Data/modules/eunos-lancer-hacks/ts/@types/system-types/**`, retaining the original folder structure

# To Generate a Release


gh release create <tag> --title "<release-title>" --notes "<release-notes>" --assets path/to/first/asset,path/to/second/asset