# Remote library imports
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv, find_dotenv
import os
load_dotenv(find_dotenv())
# Instantiate app, set attributes
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
# generate a secret key by running the following script in terminal:
# `python -c 'import os; print(os.urandom(16))'`
app.secret_key = os.getenv('SECRET_KEY')
app.alpha_key = os.getenv('ALPHA_KEY')
app.news_key = os.getenv("NEWS_KEY")

# Instantiate db
db = SQLAlchemy()
migrate = Migrate(app, db)
db.init_app(app)

bcrypt = Bcrypt(app)

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app)