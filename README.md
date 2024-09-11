# django_web_app

1. To run application:
- Make sure django and node.js are installed in system
- Connect terminal to virtual enviroment using python env variable (.venv)
- run Django backend using command "python manage.py runserver"
- In separate terminal, go to the front-end directory ("cd chart_dashboard") and then run "npm run dev"
- Run "http://localhost:3000/dashboard" on browser

2. Libraries and Tools
- The program is primarily run using Next.js in the front-end and Django in the back-end
- For the back-end, I used REST API to process the requests between the hardcoded data and corresponding API endpoints in Django
- For the front-end, I used React as the framework for the user interface, axios to process the data from the API endpoints to the front-end, and chart-js and light-weight-charts to generate the graphs

3. Approach, Thought Process, and Reflection

For my approach, I made sure to split the task into segments and tested the components individually to ensure that each part works properly. I start with the back-end, creating a Django project and working towards ensuring the data can by dynamically integrated to the frontend. Using REST framework was the logical approach to me to allow the data to be transferred to the API endpoints. From there, I approached the front-end by creating the framework using React, and then deciding a proper means of collecting the data from the API endpoints, which I opted to use axios for its ability to run in the browser and next.js in the same codebase. I then had to research the proper means of displaying the data to the dashboard charts. Here, chart-js was able to cover 3/4 of the charts, but I had to spend extra time learning how to integrate the candlestick chart to the interface. After all of these steps, I was able to run the backend and frontend components in conjunction, and display the necessary visuals of the task. Overall, this was a very enjoyable and engaging challenge to complete, and I look forward to expanding to more complex tasks in the future!
