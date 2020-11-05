const inquirer = require('inquirer');
const fs = require('fs');
const axios = require('axios');
const createFile = require('./markdown');
let badge = '';

function init() {
  const questions = [
    {
      type: 'input',
      name: 'github_name',
      message: 'What is your github username?',
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email?',
    },
    {
      type: 'input',
      name: 'project_name',
      message: 'What is your projects name?',
    },
    {
      type: 'input',
      name: 'project_description',
      message: 'Please provide a short description of your project.',
    },
    {
      type: 'input',
      name: 'repo',
      message: 'What is your projects repository name?',
    },
    {
      type: 'list',
      name: 'license',
      message: 'What kind of license does your project have?',
      choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3', 'None'],
    },
    {
      type: 'input',
      name: 'installation',
      message: 'What command should be run to install dependencies.',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Please provide Instructions on how to use the project.',
    },
    {
      type: 'input',
      name: 'contribute',
      message: 'Please provide how people can contribute to the project.',
    },
  ];

  inquirer.prompt(questions).then(function (data) {
    const queryUrl = `https://api.github.com/users/${data.github_name}`;

    switch (data.license) {
      case 'MIT':
        badge =
          '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
        break;
      case 'Apache 2.0':
        badge =
          '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
        break;
      case 'GPL 3.0':
        badge =
          '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
        break;
      case 'BSD 3':
        badge =
          '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)';
        break;
      case 'None':
        break;
    }

    axios.get(queryUrl).then(function (res) {
      const githubInfo = {
        github_profile: res.data.html_url,
      };

      fs.writeFile('README.md', createFile(data, githubInfo, badge), function (
        err
      ) {
        if (err) {
          throw err;
        }

        console.log('Your README file has been created!!');
      });
    });
  });
}

init();
