// //SBA 308: JavaScript Fundamentals

function getLearnerData(course, ag, submissions) {
  const result = [];

  submissions.forEach(submission => {
    const learnerId = submission.learner_id;
    const assignmentId = submission.assignment_id;
    const submissionScore = submission.submission.score;

    const assignment = ag.assignments.find(a => a.id === assignmentId);

    if (assignment && isValidSubmission(submission, assignment)) {
      let learnerResult = result.find(item => item.id === learnerId);

      if (!learnerResult) {
        learnerResult = {
          id: learnerId,
          avg: 0,
        };
        result.push(learnerResult);
      }

      const weightedScore = calculateWeightedScore(submissionScore, assignment, submission);
      updateLearnerResult(learnerResult, weightedScore, assignment);
    }
  });

  return result;
}

function isValidSubmission(submission, assignment) {
  const submissionTime = new Date(submission.submission.submitted_at);
  const dueTime = new Date(assignment.due_at);

  return submissionTime <= dueTime;
}

function calculateWeightedScore(submissionScore, assignment, submission) {
  let weightedScore = submissionScore / assignment.points_possible;

  // Deduct 15% for late submissions
  let submissionTime = new Date(submission.submission.submitted_at);
  let dueTime = new Date(assignment.due_at);
  if (submissionTime > dueTime) {
    weightedScore -= 0.15;
  }

  return weightedScore;
}

function updateLearnerResult(learnerResult, weightedScore, assignment) {
  learnerResult.avg += weightedScore;
  learnerResult[assignment.id] = weightedScore;
}


// Example data
const CourseInfo = {
  id: 308,
  name: "Introduction to JavaScript"
};

const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 308,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

// call to the function
const learnerData = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(learnerData);
