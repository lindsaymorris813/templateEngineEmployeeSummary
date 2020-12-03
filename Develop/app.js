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
let employeeList = [];

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
            }
        }
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
            }
        }
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
            }
        }
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
            }
        }
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
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: "What is employee's email?",
        validate: response => {
            if (response.trim() === "") {
                console.log('Please enter a valid email address.')
            } else {
                return true;
            }
        }
    },
    {
        type: 'input',
        name: 'id',
        message: "What is employee's employee ID number?",
        validate: response => {
            if (response.trim() === "") {
                console.log('Please enter a valid employee ID number.');
            } else {
                return true;
            }
        }
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
            } else {
                return true;
            }
        }
    },
    {
        when: response => response.role === 'Intern',
        type: 'input',
        name: 'school',
        message: 'What school does the intern attend?',
        validate: response => {
            if (response.trim() == "") {
                console.log('Please enter a valid school name.');
            } else {
                return true;
            }
        }
    },
    {
        type: 'list',
        name: 'addTeam',
        message: "Would you like to add more employees?",
        choices: ['Yes', 'No']
    }
];

const initManager = function () {
    inquirer.prompt(teamManagerQs).then(response => {
        let newManager = new Manager(response.name, response.email, response.id, response.office);
        employeeList.push(newManager);
        if (response.addTeam === 'Yes') {
            initEmployee();
        } else {
            var html = render(employeeList);
            if (!fs.existsSync(OUTPUT_DIR)) {
                fs.mkdir(path.join(__dirname, 'output'), {}, function (err) {
                    if (err) throw (err);
                })
            } else {
                fs.writeFile(outputPath, html, (err) => {
                    if (err) throw (err);
                })
            }
        }
    })
}

const initEmployee = function () {
    inquirer.prompt(teamMemberQs).then(response => {
        if (response.role === 'Engineer') {
            let newEngineer = new Engineer(response.name, response.email, response.id, response.gitHub);
            employeeList.push(newEngineer);
        } else {
            let newIntern = new Intern(response.name, response.email, response.id, response.school);
            employeeList.push(newIntern);
        }
        if (response.addTeam === 'Yes') {
            initEmployee();
        } else {
            var html = render(employeeList);
            if (!fs.existsSync(OUTPUT_DIR)) {
                fs.mkdir(path.join(__dirname, 'output'), {}, function (err) {
                    if (err) throw (err);
                })
            } else {
                fs.writeFile(outputPath, html, (err) => {
                    if (err) throw (err);
                })
            }
        }

    })
}

initManager();