/**
 * Takes the open section of freeCodeCamp and creates all files and folders needed
 *
 * Open the section you need
 * Copy all of this in Chrome dev tools
 * Paste the result in appropriate folder in terminal
 */

const limit = 10;
const template =
  'mkdir "{{TITLE}}" && touch "{{TITLE}}/index.js" && echo "// {{LINK}}" >> "{{TITLE}}/index.js"';

function copyToClipboard(text) {
  const tempTextArea = document.createElement('textarea');

  document.body.appendChild(tempTextArea);

  tempTextArea.value = text;
  tempTextArea.select();
  document.execCommand('copy');

  document.body.removeChild(tempTextArea);
}

function getAllChallenges() {
  const selector =
    '.block.open > ul > li.map-challenge-title:not([class*="completed"]):not(:first-of-type) > a';
  const openChallenges = document.querySelectorAll(selector);
  const openChallengesArray = Array.prototype.slice.call(openChallenges);

  return openChallengesArray.slice(0, limit);
}

function formatChallenges(challenges) {
  return challenges.map((challenge) => {
    return {
      link: challenge.href,
      title: challenge.text,
    };
  });
}

function start() {
  const commands = [];
  const challenges = getAllChallenges();
  const formattedChallenges = formatChallenges(challenges);

  for (let i = 0; i < formattedChallenges.length; i++) {
    const currentChallenge = formattedChallenges[i];
    const command = template
      .replace(/{{TITLE}}/g, currentChallenge.title)
      .replace(/{{LINK}}/g, currentChallenge.link);

    commands.push(command);
  }

  const commandString = commands.join(' &&');

  copyToClipboard(commandString);
}
