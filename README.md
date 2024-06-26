# Stock Discovery

Welcome, to stock discovery the latest platform to learn more about the most popular stocks, their performace and get news information. 

![](https://github.com/TanushGo/Stock_Heatmap/assets/Github_Video.gif)

## Start
Set up virtual environment in python and run

<code> pip install -r requirements.txt </code>

Set up .env file in backend folder with SECRET_KEY, News API Key and Alpha Vantage key

<code>
cd backend
flask db init
flask db migrate -m 'initial migration'
flask db upgrade
python app.py
</code>

Next to set up the frontend change directory to the frontend directory
<code>
npm start
</code>

Create individual components for each of the search results
Click on best match from search and then go to a separate page about the company
Then on the page display widgets about the company and also news information with sentiment analysis from Vader