# Stock_Heatmap


## Start
Set up .env file in backend folder with SECRET_KEY
cd backend
flask db init
flask db migrate -m 'initial migration'
flask db upgrade


python app.py

Create individual components for each of the search results
Click on best match from search and then go to a separate page about the company
Then on the page display widgets about the company and also news information with sentiment analysis from Vader