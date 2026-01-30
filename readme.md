## Seatment chart app

Provide csv data in the format:

```
"Etunimi","Sukunimi","Avec","Pöytäseuruetoive"
"Carl","Barks","Don Rosa","Artists"
"Leonardo","Da Vinci","","Artists, Innovators"
"Don","Rosa","Carl Barks","Artists"
"Nikola","Tesla","","Innovators"
"Barack","Obama","Michelle Obama",""
"Michelle","Obama","Barack Obama",""
"Artturi","Virtanen","","Innovators"
```

<img width="1917" height="996" alt="image" src="https://github.com/user-attachments/assets/7771669f-efcf-4673-aff1-97491bc2ec6f" />


Mind that the app doesn't have typo-detection.

## Running the app

### Frontend

The app uses yarn for frontend package management. Yarn is installed via npm with `npm install --global yarn`. For the frontend, go to `./frontend`. For the first time, run `yarn install`. To start run `yarn start`.

### Backend:

For the backend you will need python. To run the backend django app, go to `./networkApi` and run

1. `python3 -m venv env` / `python -m venv env` [for first time setup]
2. `source env/bin/activate` on linux or `env\Scripts\Activate.ps1` on windows
3. `pip install -r requirements.txt`
4. `python manage.py runserver`

### Express backend

The express app is not up to date nor is it being actively developed.

To run the backend express app, go to `./api` and run `yarn build` and `yarn start`.
