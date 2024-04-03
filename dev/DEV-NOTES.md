# To Prepare System Types
- Download updated system from [the foundryvtt-lancer repo](https://github.com/Eranziel/foundryvtt-lancer)
  - Unzip it to `D:\Users\Ryan\Documents\Projects\!Roleplaying\Lancer\!CODING\foundryvtt-lancer-master`

- Copy `tsconfig-emit.json` to the root of the system
- Open a Powershell (Admin) window:

cd D:\Users\Ryan\Documents\Projects\!Roleplaying\Lancer\!CODING\foundryvtt-lancer-master
npm install
npx tsc -p tsconfig-emit.json

- Copy the generated `.d.ts` files to `D:/Users/Ryan/Documents/Projects/!!!!CODING/FoundryVTTv10/FoundryDevData/Data/modules/eunos-lancer-hacks/ts/@types/system-types/**`, retaining the original folder structure

# *** RUNNING DEVELOPMENT SERVER ***

  Open TWO POWERSHELL WINDOWS (ADMINISTRATOR)

    First Window:
      - cd 'D:\Users\Ryan\Documents\Projects\!!!!CODING\FoundryVTTv10\FoundryDevData\Data\modules\eunos-lancer-hacks'
      - npx vite build *> .reports/vite-build-output.txt
      - node 'D:\LTSC Programs\FoundryVTTv10\Foundry Virtual Tabletop\resources\app\main.js' --dataPath='D:\Users\Ryan\Documents\Projects\!!!!CODING\FoundryVTTv10\FoundryDevData' --hotReload
      - node 'D:/LTSC Programs/FoundryVTT/Foundry Virtual Tabletop/resources/app/main.js' --dataPath='D:\Users\Ryan\Documents\Projects\!Roleplaying\!!!FOUNDRY'

    Second Window:
      - npx vite serve

# *** PREPARING TO DISTRIBUTE ***

  1) CTRL-SHIFT-P > Tasks: Run Task > COPY: City of Knives to Root
                  > Tasks: Run Task > Build fonts.scss

  2) Open POWERSHELL WINDOW (ADMINISTRATOR)
    - cd 'D:\Users\Ryan\Documents\Projects\.CODING\FoundryVTT\FoundryDevData\Data\systems\eunos-blades'
    - npx vite build

  3) Zip 'city-of-knives' and 'dist' folders into archive.

  4) Edit archive. Rename 'dist' folder to 'eunos-blades'.
-->

# To Generate a Release


gh release create <tag> --title "<release-title>" --notes "<release-notes>" --assets path/to/first/asset,path/to/second/asset