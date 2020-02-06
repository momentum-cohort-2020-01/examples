# GitHub Bio Site

## Directions

In today's project, you'll be asked to not only write code to make live Ajax requests, but also write some HTML and CSS to bring a mockup to life.

- Start with the mockup below and using the GitHub API, pull in the info to build yourself a virtual business card.
- Everything _but_ the headers ("The Basics", "The Story") and the bio will be pulled in via GitHub's API. If it's not there on your GitHub profile, then add it.
- Make sure to pull your avatar in with GitHub and make it a circle.

![github-portfolio.png](github-portfolio.png)

## WARNING!!!

The GitHub API has some serious rate limits -- only 60 requests an hour. We will hit that rate limit very quickly. In order to avoid that, do the following:

- Use your browser or [Insomnia](https://insomnia.rest) to get your user data from GitHub.
- Copy this data into a file called 'github.json'.
- Make all your Ajax requests to 'github.json'.

## Hints

Since there are no starter files provided, you'll need to create your own HTML, CSS, and JavaScript files and link them together properly. Before you start writing any JavaScript, we suggest you spend a few moments reading through the GitHub API docs listed below to get familiar with how you can obtain the data.

Once you have a decent grasp on that, start setting up your Ajax calls and setting up your callback functions to work with the data you retrieve.

## Bonus steps

1. Read up on the [hCard microformat](http://microformats.org/wiki/h-card) and make sure your page conforms to the hCard standard.
2. Incorporate what you learned from this to make your portfolio show your GitHub information.

## Resources

- [Full Screen Mockup](github-portfolio.png)
- [GitHub User API](https://api.github.com/users/username) - change username
- [GitHub API Docs](https://developer.github.com/v3/)
- [Sawtooth banners with CSS](https://medium.com/coding-design/saw-tooth-banners-with-css-95c31e91c196)
