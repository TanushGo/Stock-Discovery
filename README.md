# Stock Discovery

Welcome, to stock discovery the latest platform to learn more about the most popular stocks, their performace and get news information. 

![](https://github.com/TanushGo/Stock_Heatmap/assets/Github_Video.gif)

## Start
Set up virtual environment in python and run

<code> pip install -r requirements.txt </code>

Set up .env file in backend folder with SECRET_KEY, News API Key and Alpha Vantage key


<code> cd backend
flask db init
flask db migrate -m 'initial migration'
flask db upgrade
python app.py
</code>


Next to set up the frontend change directory to the frontend director and download the node modules
<code>
npm start
</code>

## Backend

The backend uses flask with sqlite database connected with sqlalchemy. The user can sign up and their information gets encrypted into the database using bcrypt. The paths to in the backend are:

Sign Up:
http://localhost:5555/signup

Post Method where data is in json form and name, username and password required

Sign In:
http://localhost:5555/login

Post Method where data is in json form and username and password required, gives back jwt token which is stored in local storage at frontend

Check Login:
http://localhost:5555/check_login
Get Method where x-access-token has jwt token and the user is checked whether they are logged in or not

Search:
http://localhost:5555/search

Post Method where data is in json form and key is required which contains the company name. Searchs alpha vantage api and returns a list of possible companies

News:
http://localhost:5555/news

Post Method where data is in json form and key is required which contains the company name. Searchs news api and gets popular articles which it then runs sentiment analysis and returns the value to tell if it is positive or negative.


## Frontend

The front end is designed with React and uses HTML and CSS. The launch page has login and sign up after which the user can get access to the platform. Then after logging in the website has search bar for searching stock and heat map. The heat map is mading using a TradingView widget which reduces the need to use the Alpha Vantage Api as there are limited calls. 
After the search option, the user can click on one of the stock results and will be lead to the page containing information about comapany and stock performance. It also has the sentiment analysis. This is created using some widgets from Tradeing View