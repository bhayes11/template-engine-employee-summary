const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { Console } = require("console");
const team = [];

//createTeam function begins prompts
const createTeam = () => {
    console.log("Build your team");
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is the Manager's name?"
        },

        {
            type: "input",
            name: "managerId",
            message: "What is the Manager's id?"
        },
    
        {
            type: "input",
            name: "managerEmail",
            message: "What is the Manager's email?",
        },

        {
            type: "input",
            name: "officeNumber",
            message: "What is the Manager's number?"
        },
    ]).then(response => {
            const manager = new Manager(
                response.managerName,
                response.managerId,
                response.managerEmail,
                response.officeNumber
            );
            team.push(manager);
            console.log(manager);
            teamMembers();
        })
    //Additional team member prompt
    function teamMembers() {
        inquirer.prompt([
            {
                type: "list",
                name: "addTeam",
                message: "Choose from the list",
                choices: [
                    "Add an Engineer",
                    "Add an Intern",
                    "Finished building my team.",
                ]
            }
        ]).then((data) => {
            //console.log(data);
                if (data.addTeam === "Add an Engineer") {
                    //console.log(data.addTeam);
                    engineer();
                } else if (data.addTeam === "Add an Intern") {
                    intern();
                } else
                    finalTeam();
            });
    };
    //Engineer prompt
    const engineer = () => {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is the Engineer's name?"
            },

            {
                type: "input",
                name: "engineerId",
                message: "What is the Engineer's id?"
            },
            
            {
                type: "input",
                name: "engineerEmail",
                message: "What is the Engineer's email?",
            },

            {
                type: "input",
                name: "engineerGithub",
                message: "What is the Engineer's GitHub username?"
            },
        ]).then(response => {
                const engineer = new Engineer(
                    response.engineerName,
                    response.engineerId,
                    response.engineerEmail,
                    response.engineerGithub
                    );
                    team.push(engineer);
                    console.log(engineer);
                    teamMembers();
            }); 
    };
    //Intern prompt
    const intern = () => {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is the Intern's name?"
            },

            {
                type: "input",
                name: "internId",
                message: "What is the Intern's id?"
            },

            {
                type: "input",
                name: "internEmail",
                message: "What is the Intern's email?",
            },

            {
                type: "input",
                name: "internSchool",
                message: "What is the Intern's school?"
            },
        ]).then(response => {
                const intern = new Intern(
                    response.internName,
                    response.internId,
                    response.internEmail,
                    response.internSchool
                    );
                    team.push(intern);
                    console.log(intern);
                    teamMembers();
            });

    }

};

//function ot generate HTML document
function finalTeam() {
    console.log("All done!");
    const generateTeam = team.join(``);
    fs.writeFile(outputPath, render(team), "utf-8", (err) => {
        if (err) throw err; 
    });
}

createTeam();


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
