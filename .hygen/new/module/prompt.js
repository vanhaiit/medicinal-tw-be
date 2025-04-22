module.exports = {
    prompt: ({ prompter, args }) => {
        return prompter
            .prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'Name:',
                    validate(value) {
                        if (!value.length) {
                            return 'Module must have a name.';
                        }
                        return true;
                    },
                },
                {
                    type: 'MultiSelect',
                    name: 'picks',
                    message: 'Picks:',
                    initial: [
                        'Controller',
                        'Service',
                        'Repository',
                        'Module',
                        'Entity'
                    ],
                    choices: [
                        {
                            name: 'Controller',
                            value: 'controller',
                        },
                        {
                            name: 'Service',
                            value: 'service',
                        },
                        {
                            name: 'Repository',
                            value: 'repository',
                        },
                        {
                            name: 'Module',
                            value: 'module',
                        },
                        {
                            name: 'Entity',
                            value: 'entity',
                        }
                    ],
                },
            ])
            .then(answer => {
                return answer;
            });
    },
};
