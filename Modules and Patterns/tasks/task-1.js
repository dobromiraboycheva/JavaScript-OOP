/* Task Description */
/* 
* Create a module for a Telerik Academy course
  * The course has a title and presentations
    * Each presentation also has a title
    * There is a homework for each presentation
  * There is a set of students listed for the course
    * Each student has firstname, lastname and an ID
      * IDs must be unique integer numbers which are at least 1
  * Each student can submit a homework for each presentation in the course
  * Create method init
    * Accepts a string - course title
    * Accepts an array of strings - presentation titles
    * Throws if there is an invalid title
      * Titles do not start or end with spaces
      * Titles do not have consecutive spaces
      * Titles have at least one character
    * Throws if there are no presentations
  * Create method addStudent which lists a student for the course
    * Accepts a string in the format 'Firstname Lastname'
    * Throws if any of the names are not valid
      * Names start with an upper case letter
      * All other symbols in the name (if any) are lowercase letters
    * Generates a unique student ID and returns it
  * Create method getAllStudents that returns an array of students in the format:
    * {firstname: 'string', lastname: 'string', id: StudentID}
  * Create method submitHomework
    * Accepts studentID and homeworkID
      * homeworkID 1 is for the first presentation
      * homeworkID 2 is for the second one
      * ...
    * Throws if any of the IDs are invalid
  * Create method pushExamResults
    * Accepts an array of items in the format {StudentID: ..., Score: ...}
      * StudentIDs which are not listed get 0 points
    * Throw if there is an invalid StudentID
    * Throw if same StudentID is given more than once ( he tried to cheat (: )
    * Throw if Score is not a number
  * Create method getTopStudents which returns an array of the top 10 performing students
    * Array must be sorted from best to worst
    * If there are less than 10, return them all
    * The final score that is used to calculate the top performing students is done as follows:
      * 75% of the exam result
      * 25% the submitted homework (count of submitted homeworks / count of all homeworks) for the course
*/

function solve() {

    var Course = {
    init: function (title, presentations) {
        this.title = title;
        this.presentations = presentations;
        this.students = [];
        studentsId = 1;

        return this;
    },
    addStudent: function (name) {
        isValidSting(name, 'student name');

        this.name = name.split(' ');
        this.id = studentsId;
        this.visitExam = false;
        this.score = 0;
        this.totalScore = 0;

        studentsId++;

        if (this.name.length !== 2 || !isValidName(this.name[0]) || !isValidName(this.name[1])) {
            throw new Error('Invalid student name');
        }

        this.students.push({
            firstname: this.name[0],
            lastname: this.name[1],
            id: this.id,
            visitExam: this.visitExam,
            score: this.score,
            totalScore: this.totalScore
        });

        return this.id;
    },
    getAllStudents: function () {
        return this.students.slice(0);
    },
    submitHomework: function (studentID, homeworkID) {
        if (!isValidId(studentID, 1, this.students.length)) {
            throw new Error('Invalid student ID');
        }

        if (!isValidId(homeworkID, 1, this.presentations.length)) {
            throw new Error('Invalid homeword ID');
        }

        this.students.forEach(function (student) {
            if (student.id === studentID) {
                if (student.homeworks === undefined) {
                    student.homeworks = 1;
                } else {
                    student.homeworks++;
                }
            }
        });

        return this;
    },
    pushExamResults: function (results) {
        results.forEach(function (studentWithExam) {
            var studentId = studentWithExam.studentID,
                result = studentWithExam.score;
            if (result != Number(score) || result === '') {
                throw new Error('Invalid exam score');
            }

            if (!this.students[studentId - 1]) {
                throw new Error('Invalid student id');
            }

            if (this.students[studentId - 1].visitExam === true) {
                throw new Error('This student have passed exam');
            }

            this.students[studentId - 1].visitExam = true;
            this.students[studentId - 1].score = score;
        });

        return this;
    },
    getTopStudents: function () {
        var topStudents;
        this.students.forEach(function (student) {
            student.totalScore = (25 * (student.homeworks / this.presentations.length)) + (0.75 * student.score);
        });

        this.students.sort(function (firstStudent, secondStudent) {
            return firstStudent.totalScore - secondStudent.totalScore;
        });

        topStudents = this.students.slice(0, 10);

        return topStudents;
    }
};

Object.defineProperty(Course, 'title',
    {
        get: function () {
            return Course._title;
        },
        set: function (value) {
            if (!isValidTitle(value)) {
                throw new Error('Invalid title');
            }

            Course._title = value;
        }
    });

Object.defineProperty(Course, 'presentations',
{
    get: function () {
        return Course._presentations;
    },
    set: function (value) {

        if (!isValidPresentation(value)) {
            throw new Error('Invalid presentations');
        }

        Course._presentations = value;
    }
});

return Course;

function isValidTitle(title) {
    if (title === null || typeof title !== 'string') {
        return false;
    }

    if (title.trim() === '' || title.length === 0 || title != title.trim() || /\s{2,}/.test(title)) {
        return false;
    }

    return true;
}

function isValidPresentation(presentation) {

    if (presentation === null || presentation.length == 0) {

        return false;
    }

    for (var i = 0; i < presentation.length; i++) {
        if (!isValidTitle(presentation[i])) {
            return false;
        }
    }
    return true;
}

function isValidSting(value, msg) {
    if (value === null || typeof value !== 'string' || value.trim() === '') {
        throw new Error('Invalid ' + msg);
    }
}

function isValidName(name) {
    return /^[A-Z][a-z]*$/.test(name);
}

function isValidId(id, min, max) {
    if (id != Number(id)) {
        return false;
    }

    id = parseFloat(id);

    if (id < min || id > max) {
        return false;
    }

    return true;
}

return Course;
}

module.exports = solve;
