/**
 * Takes the open section of freeCodeCamp and creates all files and folders needed
 *
 * Open the section you need
 * Copy all of this in Chrome dev tools
 * Paste the result in appropriate folder in terminal
 */

// Replace with file type
const type = '';
const limit = 10;
const template =
  `mkdir "{{TITLE}}" && touch "{{TITLE}}/index.${type}" && echo "{{COMMENT}}" >> "{{TITLE}}/index.${type}"`;

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

function getComment(link) {
  if (type === 'html') {
    return `<\\!-- ${link} -->`;
  } else if (type === 'js') {
    return `// ${link}`;
  } else {
    return '';
  }
}

function start() {
  const commands = [];
  const challenges = getAllChallenges();
  const formattedChallenges = formatChallenges(challenges);

  for (let i = 0; i < formattedChallenges.length; i++) {
    const currentChallenge = formattedChallenges[i];
    const comment = getComment(currentChallenge.link);
    const command = template
      .replace(/{{TITLE}}/g, currentChallenge.title)
      .replace(/{{COMMENT}}/g, comment);

    commands.push(command);
  }

  const commandString = commands.join(' && ');

  copyToClipboard(commandString);
}

start();
