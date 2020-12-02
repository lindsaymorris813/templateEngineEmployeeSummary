const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");
let employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
// TODO: Write code to define and export the Employee class

const teamManagerQs = [
    {
        type: 'input',
        name: 'name',
        message: "What is the team manager's name?",
        validate: response => {
            if (response.trim() === "") {
                console.log('Please enter a name.')
            } else {
                return true;
        }}
    },
    {
        type: 'input',
        name: 'email',
        message: "What is manager's email address?",
        validate: response => {
            if (response.trim() === "") {
                console.log('Please enter a valid email address.')
            } else {
                return true;
        }}
    },
    {
        type: 'input',
        name: 'id',
        message: "What is manager's employee ID number?",
        validate: response => {
            if (response.trim() === "") {
                console.log('Please enter a valid employee ID number.');
            } else {
                return true;
        }}
    },
    {
        type: 'input',
        name: 'office',
        message: "What is manager's office number or suite?",
        validate: response => {
            if (response.trim() === "") {
                console.log('Please enter a valid office number or suite.')
            } else {
                return true;
        }}
    },
    {
        type: 'list',
        name: 'addTeam',
        message: "Would you like to add employees to the manager's team?",
        choices: ['Yes', 'No']
    }
];

const teamMemberQs = [
    {
        type: 'input',
        name: 'name',
        message: "What is employee's name?",
        validate: response => {
            if (response.trim() === "") {
                console.log('Please enter a name.')
            } else {
                return true;
        }}
    },
    {
        type: 'input',
        name: 'email',
        message: "What is employee's email?",
        validate: response => {
            if (response.trim() === "") {
                console.log('Please enter a valid email address.')
            }  else {
                return true;
        }}
    },
    {
        type: 'input',
        name: 'id',
        message: "What is employee's employee ID number?",
        validate: response => {
            if (response.trim() === "") {
                console.log('Please enter a valid employee ID number.');
            }  else {
                return true;
        }}
    },
    {
        type: 'list',
        name: 'role',
        message: "What is employee's role?",
        choices: ['Intern', 'Engineer']
    },
    {
        when: response => response.role === 'Engineer'
        ,
        type: 'input',
        name: 'gitHub',
        message: "What is the engineer's GitHub username?",
        validate: response => {
            if (response.trim() === "") {
                console.log('Please enter a valid GitHub username.')
            }  else {
                return true;
        }}
    },
    {
        when: response => response.role === 'Intern',
        type: 'input',
        name: 'school',
        message: 'What school does the intern attend?',
        validate: response => {
            if (response.trim() == "") {
                console.log('Please enter a valid school name.');
            }  else {
                return true;
        }}
    },
    {
        type: 'list',
        name: 'addTeam',
        message: "Would you like to add employees to the manager's team?",
        choices: ['Yes', 'No']
    }
];

const initManager = function () {
    inquirer.prompt(teamManagerQs).then(response => {
        let newManager = new Manager(response.name, response.email, response.id, response.office);
        employees.push(newManager);
        if (response.addTeam === 'Yes') {
            initEmployee();
        } else {
            render();
        }
    })
}

const initEmployee = function () {
    inquirer.prompt(teamMemberQs).then(response => {
        if (response.role === 'Engineer') {
            let newEngineer = new Engineer(response.name, response.email, response.id, response.gitHub);
            employees.push(newEngineer);
            console.log(employees);
        } else {
            let newIntern = new Intern(response.name, response.email, response.id, response.school);
            employees.push(newIntern);
            console.log(employees);
        }
        if (response.addTeam === 'Yes') {
            initEmployee();
        } else {
            render(employees);
        }
    })
}

initManager();