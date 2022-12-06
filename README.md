# Capstone Project

- Project I Intend to Complete: Astronomy Picture of the Day Search
- Student Name: Ruo-Fang Wang
- Student Number: 040987557

## Introduction of My Design

### Background of Astronomy Picture of the Day (APOD):
Astronomy Picture of the Day (APOD) is a webpage that shares beautiful Astronomy pictures every day. Users can see different and new pictures every day. If people had qualified Astronomy pictures, they could submit their photos, too. NASA will share its pictures on the APOD page. Besides, there was a discussion board to let people who are interested in APOD pictures discuss their pictures. Therefore, APOD is not only sharing astronomy pictures. It also gathers people who are interested in Astronomy and love to photograph photos of the cosmos and stars.

### Pain Points on the current page:
1. The navigation was on the bottom. Users need to scroll down to the bottom to see the navigation.
2. Some information on the Archive page overlapped with the Index and Calendar pages. It seems like the Archive page was redundant.
3. User couldn't filter the information on either the Archive page or Index page because there was not a filter function on the page.
4. The search bar on the Search page is monotonous. It is also inconvenient that users need to go to a different page when looking up pictures or information.
5. The link to submission is not obvious. Users who want to share their photos can hardly find the link.
6. Users didn't know APOD had a mobile app because they couldn't find a download button on this page.
7. If users wanted to share the pictures on their social media, there wasn't a quick sharing button to share this page. 

### Goal for redesigning the APOD page
* Design a **web application** to improve the user experience. Help users find the information more easily.
* Guide users to action pages such as the Submission and Search page.
* Optimize the information architecture, so users can understand how the page works.

### Design Decision
1. Depending on different devices, make a navigation bar of action items stick to the sidebar or bottom, so users can find the action items they want at a glance.
2. Group the site links of information to a menu button and put it at the top.
3. Add links for downloading the APOD App to the menu.
4. Combine the Archive page into the Calendar page and rename the page to Album.
5. Rename the Index page to Categories. Users can find each category by clicking on the toggle items of Categories.
6. Design an advanced filter on the Search for Pictures page. 
7. Add action buttons to each page to guide users on what they can do after seeing the picture on the APOD page.
8. Add a sharing button to the picture page. Therefore, users can share the photo on their social media immediately.

## Current Status
- [X] Design a logo for APOD
- [X] Resize images for different resolutions to use on various devices
- [X] Create all HTML pages and developed pages with Bootstrap framework and from scratch
- [X] Create my SCSS and CSS files
- [X] Customize the style of Bootstrap Components with the SCSS of Bootstrap
- [X] Develop the RWD layouts
- [X] Verify my HTML and CSS code
- [X] Commit and push final prototype to part-3 on GitHub
- [X] Create my Javascript files to code interactive functions and fetch NASA's API
- [X] Commit and push final web application to part-4 on GitHub
- [X] Check pages on multiple browsers

## How I developed the web application
I developed the web application with a modern framework, Bootstrap, HTML, CSS, SCSS, and Javascript. Here are the steps:

1. Reviewed all my mockups and listed down the structures, materials, images, and components.
2. Design a Logo for APOD.
3. Resized images for different resolutions.
4. Coded the HTML of all pages with Bootstrap and from scratch
5. Customized the style with the SCSS of Bootstrap Components.
6. Created my customized SCSS file and translated it into style.css through the extension, Live Sass Compiler.
7. Verified my code of HTML and CSS.
8. Created several JavaScript files for each purpose. Linked to specific JavaScript files on each page that needed them.
9. Fetched NASA's APOD API to show daily astronomy picture with JavaScript.
10. Coded the function to upload images by dragging file and clicking the buttons.
11. Coded the function of search bars and filters.
12. Verified my code again.
13. Uploaded to GitHub.

## Challenges Faced
1. Customized the SCSS of Bootstrap Components.
2. Developed RWD layout with my customized SCSS.
3. Use control buttons of "Previous" and "Next" to show APOD pictures from NASA's API.
4. Got HTTP Status of 429 "Too many request".
5. Failed to preview the image after dragging files and clicking buttons.
6. The function of the search bar on top navigation would stop fetching API on the search page.
7. Failed to show all results when selecting multiple filters.

## Overcoming Challeges
1. Downloaded the SCSS files of Bootstrap from its website. Searched for the variables and classes that I would customized and changed the value in the SCSS.
2. Used <code>@mixin</code> to specify the different layout for each media query. Afterward, used <code>@include</code> to apply a certain layout to each media query for creating the RWD layout.
3. Declared a variable for date and retrieved the day with <code>getDate()</code>. The type of day was number, so I could set the control buttons to increase or decrease the number. After calculating the number, I re-assigned the value to the date variable and concatenated the variable to the URL of NASA's APOD API. Then, I could get the exact URL for each APOD picture by clicking control buttons.
4. Separated the function of fetching NASA's API to deferent JS files to avoid multiply requesting NASA's APOD API.
5. Browsed the event types of EventListner and searched for the solution on websites. Referred and customized the codes from websites and used <code>console.log</code> to check the properties of targeted elements and troubleshoot the problems.
6. Since there wasn't any search bar on the top navigation on the search page, the top search bar function caused an error and thus stopped triggering the next function to fetch API. Therefore, I created another JavaScript file for the top search bar function to avoid triggering this function on the search page.
7. I created an <code>Array</code> to store the selected values from the filters and used <code>for</code> loop to examine every value in the array. If any result's value matched the filter's value, showed the results. As a result, there would be multiple results in the HTML.

## Assets Used (Bibliography)
- Images and Articles: <a href="https://apod.nasa.gov/apod/astropix.html">NASA APOD</a>
- Icons: <a href="https://fontawesome.com/">Fontawesome</a>