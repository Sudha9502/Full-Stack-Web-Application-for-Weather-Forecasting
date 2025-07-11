# Full-Stack-Web-Application-for-Weather-Forecasting

This is a Full Stack Web Appplication for Weather Forecasting in which we can able to forecast the accurate weather using less no.of API calls and reduce overhead to the database.
Usually weather forecasting is done only through API calls. These API calls are used to fetch the accurate weather info with parameters like temperature,windspeed,cloudy,humidity,rainfall etc.
Due these API calls usage database gets overhead That means if a user wants to fetch weather data for 5 cities he needs to use 5 API calls.This can increase the database load with redundant API calls as well.
So to overcome this, we designed an application that eventually mininmize API calls usage thereby handling consistent database. The name itself describes it is a Full Stack Application where the User Interface is developed using HTML, CSS and JavaScript and Java Servlets are used as Backend technology and managed database with Oracle21c.

Working:
The working flow of this project is as folllows:
--
--Initially the database will be empty with fields like cityname,longitude,latitude,timestamp..

--When the user enters a city in search box,the input is send to Apache Tomcat Sever in JSON format. Tomcat server processes the user request and fetch the data using API calls or database.

--If the city details are present in the database without anychange then the same details will be given as a response and if it is a new one without any entry then it makes use of API calls and the same will be       updated to the database as well.

--This can decrease the use of API calls and reduce database redundancy.

--This application has an attractive inclusion of Map feature where the data can be retrieved directly just by clicking on the specific area on map.

--This displays weather info on the UI and on the popup of the map pointer as well.


Scope:
--
This project is cost-effective and very responsive to the user to easily fetch weather data. It can also have a scope of developing as a Mobile Application.
