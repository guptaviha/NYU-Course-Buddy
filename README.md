# NYU-Course-Buddy

An academic project for Cloud Computing (CS-GY-9233) at NYU Tandon with Prof Sambit Sahu.

NYU Course Buddy is a web-app designed to help NYU students in the course registration process.

## Project Description and Motivation:

Every NYU student can relate with the struggle of registering for their desired classes. Often courses are full within seconds, leaving students grappling for courses they don’t wish to take. At the end, it is up to these students to find others who are interested in swapping the particular pair of courses they have with the ones they want. Another way students can register for a course is when someone else drops it. But the challenge is finding out when a course has become available. The students have to look at quite a few different places to find reviews about the subjects as well. The existing tools out there, i.e. Coursicle, RateMyProfessor, etc offer some relief but at a cost and are not consolidated as one solution. 

### Existing Products:
- [Coursicle](https://www.coursicle.com/)
- [NYU Albert](http://albert.nyu.edu/albert_index.html?tab=NYU_STUDENTS_TAB)
- [RateMyProfessor](https://www.ratemyprofessors.com/)

## Product Features:

We propose a web application that facilities our NYU students in the class registration process. It will have the following features:
1. A complete list of all the courses being offered for the current semester.
2. Ability to add courses to the user’s wishlist.
3. When a course that is in the wishlist becomes available, a notification will be sent to the user's email.
4. Ability to view and add new reviews/ratings for a particular course.
5. A dashboard for a high level view on course trends. For example, live charts/analytics for hot subjects and course ratings.
6. A smart chatbot through which users can query for various use cases like Open Courses, Trending Courses, etc 


## Data Source:

[Schedge](https://blog.torchnyu.com/2020/01/15/schedge-an-albert-api.html) - Albert course listing API

"Schedge is a program that scrapes Albert, then provides a simple API for course data. You can query course data from different semesters with all the corresponding meeting times and recitations."

## Architecture:

![Architecture](https://github.com/therealbappi/NYU-Course-Buddy/blob/main/Resources/System-Architecture.png?raw=true)

For design and prototype using Figma [click here](https://www.figma.com/proto/mXqgsQ9RWYtaqv3WDAT3eA/Cloud?node-id=0%3A1&scaling=min-zoom&starting-point-node-id=1%3A52)

1. AWS Services
2. Hosting on S3
3. User Authentication and Security using Cognito and IAM
4. APIs on API Gateway
5. Backed for APIs on Lambda
6. Databases: RDS 
7. Indexing ElasticSearch
8. Chatbot on Lex
9. Notifications using SES
10. Polling with EventBridge + Lambda 
11. Queue user notifications with SQS

## Contributors:

### Contributors

<p float="left">

<a href="https://github.com/therealbappi">
    <img src="https://github.com/therealbappi.png?size=50" alt="Bharath" width="50">
</a>

<a href="https://github.com/purva-k">
    <img src="https://github.com/purva-k.png?size=50" alt="Syed Ahmad" width="50">
</a>

<a href="https://github.com/alekzanderx1">
    <img src="https://github.com/alekzanderx1.png?size=50" alt="Purva Kondaji" width="50">
</a>

<a href="https://github.com/guptaviha">
    <img src="https://github.com/guptaviha.png?size=50" alt="Viha Gupta" width="50">
</a>

</p>
