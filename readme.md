## Setting up

The app uses yarn for package management. Run `yarn install` for both the `./api` and `./frontend` directories.

## Running the app

### Frontend

For the frontend, go to `./frontend` and run `yarn start`. The server has to be restarted when making changes.

### For the backend, run only one of the following:

To run the backend express app, go to `./api` and run `yarn build` and `yarn start`.

To run the backend django app, go to networkApi and run

1. `python -m venv env` [for first time setup]
2. `source env/bin/activate`
3. `pip install -r requirements.txt`
4. `python manage.py runserver`.
