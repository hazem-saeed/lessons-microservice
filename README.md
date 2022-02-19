# Summary

Create a backend microservice called Lesson. Think of this as part of a bigger lesson planner application with some similar functionality as Google Calendar. This particular service is concerned with the operations around lesson scheduling.

Please provide the following in a README.md file:

    Clear instructions on how to run the app.
    Clear description of the endpoints and their expected request and response (imagine you're giving this to your frontend engineer to develop against).

# Requirements:

## Lesson

A Lesson must, at least, contain the following:

    title
    description
    recurrence:
    None (the lesson doesn't repeat)
    Daily (the lesson repeats daily), this must be accompanied with an until date. Basically think about it as "Repeat this lesson daily until x date"
    Weekly (the lesson repeats in some pattern weekly), this must be accompanied with an until date and repition pattern. Basically think about it as "Repeat this lesson weekly on Mondays and Wednesdays until x date".

## Data

Design your data model however way you want. Meaning, you can use a single table or many or you can use a single Mongo collection or many. Just be prepared to explain/support your choices.

## Endpoints

all requests and responses must be in JSON

Fetch Lessons:

An endpoint to return all lessons for a given date range. Basically, it answers the question: "what are my lessons from date x to date y?".

    We expect the response to include all lessons. Basically, the frontend shouldn't have to figure out the recurrence. if there's only a single lesson, but repeated 5 times within that date range, then the response would be 5 lessons.
    The data in the lessons should show the relationship between recurring lessons. Imagine that the frontend engineer wants to show the same color for a lesson and all its recurrences.

Create Lesson:

An endpoint to create a scheduled lesson.

    This can be with or without recurrence. Meaning, the user can create a lesson that does or doesn't repeat. Please refer to the Lesson#recurrence description above.

Move Lesson:

An endpoint to move a lesson from one date to another or to reorder it within the same day.

Update Lesson (Bonus):

An endpoint to update a scheduled lesson.

    This can be with or without recurrence. Meaning, the user can update an lesson's title only or can update the recurrence pattern, from any state to the other (none, daily, weekly).
    If it's a recurring lesson, then it can be for a single or all lessons in the recurrence. Think about Google Calendar asking you: "Update this event only or This and all following events?".

Delete Lesson (Bonus)

    If it's a recurring lesson, then it can be for a single or all lessons in the recurrence. Think about Google Calendar asking you: "Delete this event only or This and all following events?".

# DevOps

    Service must be containerized.
    Bonus: The service is deployed (heroku, aws, gcp, etc).

# Technology

if it is not specified, then you can use any technology you want

    Language/Framework: Node.js (bonus if you use Typescript), you can choose any Node framework, but you must be prepared to explain/support your choice.
    DB: Postgresl, Mysql or MongoDB
    Containerization: Docker.