## Seatment chart app


## Running the app

### Frontend

The app uses yarn for frontend package management. For the frontend, go to `./frontend`. For the first time, run `yarn install`. To start run `yarn start`.

### Backend:

To run the backend django app, go to `./networkApi` and run

1. `python -m venv env` [for first time setup]
2. `source env/bin/activate` on linux or `env\Scripts\Activate.ps1` on windows
3. `pip install -r requirements.txt`
4. `python manage.py runserver`.

### Express backend

The express app is not up to date nor is it being actively developed.

To run the backend express app, go to `./api` and run `yarn build` and `yarn start`.
