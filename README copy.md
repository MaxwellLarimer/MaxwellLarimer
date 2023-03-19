# Rapidfire 🔥

This contains a Flask API with a database managed by SQLAlchemy.

Key features include:
- Flask app factory pattern
- migrations powered by Flask-Migrate
- Local development with Heroku
- Local SQLite db
- Staging/prod Postgres DB powered by Heroku

# Getting started
To run this application locally, you will need a few key tools:

- Heroku CLI
- Python 3.10.7

First, clone this repo.

Next, create your dev environment:

```
source create_devenv.sh
```

If you have already created your devenv, you can simply:

```
source activate_devenv.sh
```

This will create the python virtual environment, upgrade pip, and install the project requirements.


To run the app locally:

```
heroku local
```

# Deploying to Heroku/Other

If creating a new deployment (to heroku or any other platform), you will need to set the environment variable `ENV` to either `prod` in the case of a production environment. On heroku, this will automatically connect it to the postgres extension.

Additionally, you will have to generate a `SECRET_KEY` env variable. This can be done with:

```
import secrets
secrets.token_hex(16)
```

For the possible options of `ENV`, see rapidfire.config.config. It may also be left blank, which will default to `dev` settings.


# Managing migrations

When making database changes, you can create a migration and apply it with:

```
flask db migrate
flask db upgrade
```

During development on a branch, you may do this many times. When you're satisfied with your migrations, you can commit them to the repo.

After deploying to Heroku, these migrations must be applied. This can be done with:

```
heroku run flask db upgrade
```

> **Note**
> Integrate this somehow with CI pipeline.