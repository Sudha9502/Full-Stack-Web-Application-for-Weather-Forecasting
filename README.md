# Full-Stack-Web-Application-for-Weather-Forecasting

This is a Full Stack Web Appplication for Weather Forecasting in which we can able to forecast the accurate weather using less no.of API calls and reduce overhead to the database.
Usually weather forecasting is done only through API calls. These API calls are used to fetch the accurate weather info with parameters like temperature,windspeed,cloudy,humidity,rainfall etc.
Due these API calls usage database gets overhead That means if a user wants to fetch weather data for 5 cities he needs to use 5 API calls.This can increase the database load with redundant API calls as well.
So to overcome this, we designed an application that eventually mininmize API calls usage thereby handling consistent database. The name itself describes it is a Full Stack Application where the User Interface is developed using HTML, CSS and JavaScript and Java Servlets are used as Backend technology and managed database with Oracle21c.

## Working: ##
*The working flow of this project is as follows:*

- **Initially the database will be empty with fields like cityname,longitude,latitude,timestamp..**

- **When the user enters a city in search box,the input is send to Apache Tomcat Sever in JSON format. Tomcat server processes the user request and fetch the data using API calls or database.**

- **If the city details are present in the database without anychange then the same details will be given as a response and if it is a new one without any entry then it makes use of API calls and the same will be       updated to the database as well.**

- **This can decrease the use of API calls and reduce database redundancy.**

- **This application has an attractive inclusion of Map feature where the data can be retrieved directly just by clicking on the specific area on map.**

- **This displays weather info on the UI and on the popup of the map pointer as well.**

## Technologies Used: ##
- **Programming Languages:** HTML,CSS,JavaScript,Java Servlets
- **Database:** Oracle21c
- **Platforms:** Eclipse IDE

## How to Run
1. Clone the repository or download the source code.
2. In the eclipse, create a new Dynamic Web Project.
3. Paste the code in eclipse and Save files in Web Project as:
   ```bash
   index.html
   ```
   ```bash
   style.css
   ````
   ```bash
   script.js
   ```
4. Install Apache Tomcat server and Oracle 21c from Google:
5. Also paste the Servlet code into the Project by naming its as:
   ```bash
   WeatherApp.java
   ```
   in the package
   ```bash
   com.weatherapp.servlets
   ```
   under src


6.Follow the file structure in Eclipse as:

<img width="300" height="400" alt="Screenshot 2025-07-10 220740" src="https://github.com/user-attachments/assets/0b397b84-f0dc-40cd-b7fc-3b05c96b9ff5" />

7. Right Click on Project and click on Run as and click Run on Server.
8. Then select Tomcat Server.
9. Web App will open on Browser.

Scope:
--
This project is cost-effective and very responsive to the user to easily fetch weather data. It can also have a scope of developing as a Mobile Application.
