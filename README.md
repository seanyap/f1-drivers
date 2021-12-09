# Formula 1 Drivers

A simple website that displays the current(2021) F1 Drivers and some of their info,
including name, date of birth, and nationality. User can browse through the list of
players styled to look like playing cards, which I drew inspiration from the design
of baseball cards.

Below is a screenshot of the app. Check the live deploy of the website [here](https://seanyap.github.io/f1-drivers/)
<img height="500" src="./images/app-screenshot.png">

## Development Process

In the making of this app, I have used 2 APIs ([Edgast](https://ergast.com/mrd/)
and Wikipedia) to obtain drivers' information and drivers' headshots respectively.
I have also setup GitHub Actions to automate the continuous integration and deployment
workflow.

More specifically, I created two separate branches for the repository, main and
development. The main branch will be the branch where the working website is deployed
on GitHub Pages. The development branch will be where I will be using to work on
the features of the website. After I am satisfied with the progress of the development
branch, I will then have to merge the commits into main so it can be deployed.
Having to perform this repeatedly is not very fun, therefore, I used GitHub Actions
to listen to push events on the development branch. When it receives an event, it will
automatically attempt to merge/integrate it into main for deployment.

## GitHub Actions Workflow

The configuration YAML file for the workflow can be found in the .github/workflows folder

You can also view the history of workflow ran by GitHub Actions in the "Actions"
tab above
