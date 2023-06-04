import chalk from 'chalk';
import inquirer from 'inquirer';
import { QUESTIONS, type eQuestions } from '../../constants';

async function askQuestion(questionType: eQuestions) {
  const question = QUESTIONS[questionType];

  const res: unknown = await inquirer.prompt([
    {
      type: question.type,
      name: question.name,
      message: chalk.hex('#C5ABFF').italic(question.message),
      choices: question.choices,
    },
  ]);

  return res as never;
}

export default askQuestion;
