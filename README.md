# Js_Lab4
JavaScript Fundamentals lab 

Function: getLearnerData
Overview
The getLearnerData function processes learner submissions and calculates the weighted scores, considering assignment deadlines. The function takes three parameters:

course: Information about the course.
ag: Information about the assignment group, including assignments.
submissions: An array of learner submissions.
Steps
Initialize an empty result array:

result: An array to store processed learner data, including learner ID, average score, and scores for each assignment.
Iterate through learner submissions:

For each submission, extract learner ID, assignment ID, and submission score.
Find corresponding assignment:

Use the assignment ID to find the corresponding assignment in the assignment group.
Check validity of submission:

Ensure the submission is valid by checking if it was submitted on or before the assignment's due date.
Update learner data:

If the submission is valid, update the learner's data in the result array:
If the learner is new, create a new entry in the result array.
Calculate the weighted score for the submission.
Update the learner's average score and scores for each assignment.
Return the result array:

The function returns the processed learner data.
