# MyGitRank
This is my first ReactJs project which allows clients to view a ranked list of repositories on Github and see the details of each response by using Github API.
## How to run this project?
1. Download or clone this repository.
2. `npm install`
3. `npm start`
## Test environment?
* (Important!)To achieve the best experience, 1024*768 resolution is recommanded.
* My test environment is under MacOS 10.12 and Chrome 56.0.2924 (64-bit).
## How does it work?
* Click on any repositories' name on the list and the detail will be shown on the detail view.
* Click the < and > button to perform pagination.
* Type in any interger(number should not be smaller than 1) in the input field, to jump to any page that you want.
* Selecting the language you want in the selection language will give you the repositories in that language.
* This project should be responsive for any screen resolution larger than 1024*768.
* (Importhan!) Due to rate limitation of Github API, you can only make up to10 requests per minute.
## How did I implement this project?
I implemented this project in around 10.5 hours in total(3 hours learning + 7.5 hours implementing):
1. Learning React(3 hours)
2. Implement the List and Detail View(2 hours)
3. Github Search API (0.5 hour)
4. Implement the pagination(3 hours) 
5. Implement the Selection Box(0.5 hour)
6. Implement the content in the Detail View(0.5 hour)
7. Decoration and validation check(1 hour)
8. README.md and code cleaning (0.5 hour)
## What can be improved?
* A responsive design for smaller size of screen(i.e smart phones)
* More detailed information for each repository
* An icon for each repository
* Use Ajax to fetch more information in once to reduce the number of requests to Github