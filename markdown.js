function createFile(data, githubInfo, badge) {
  return `
# **${data.project_name}**
${badge}
## Description 
${data.project_description}
## Table of contents
- [Description](#Description)
- [Installation](#Installation)
- [Usage](#Usage)
- [Licence](#Licence)
- [Repository Link](#Repository)
- [GitHub Info](#GitHub) 
## Installation
        ${data.installation}
## Usage
        ${data.usage}
## Licence
${data.license}
## Repository
- [${data.project_name} Repo](https://github.com/${data.github_name}/${data.repo})
## GitHub
- Email: ${data.email}
- [GitHub Profile](${githubInfo.github_profile})
`;
}

module.exports = createFile;
