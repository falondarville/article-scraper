## Article Scraper

This is an article scraper application that scrapes from my personal website and displays the articles on the main blog page. Users can click the scrape button to see if new articles are available, save the articles to the saved articles page, delete the articles from the saved articles page, and leave comments on the saved articles. All of this data is stored in a MongoDB database. 

This application was deployed on Heroku. Please note that I am running this application on a free tier of the service, so you may be greeted by an error page when first landing on the page. That's normal. It likely means that the "dynos" are asleep. Give them several seconds to wake up and then refresh the page. 

## Technologies and Methods Used

JavaScript, jQuery, HTML/CSS, MongoDB, npm packages: express, body-parser, cheerio (for scraping), request, express-handlebars, mongoose

## Challenges and Learning Summary

I would say that the challenges of this assignment were challenges that I have previously encountered. So I did refer back to my old code often to see how I structured particular functionality. 

In terms of my thoughts on scraping, I would not scrape websites that monetize the content that I would be duplicating. I decided to scrape my personal website because I knew that I would encroach on other people's work. As a blogger myself, I know the work that goes into creating content and would not personally want my own website scraped. 