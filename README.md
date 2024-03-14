# ClickbAIt
ClickbAIt is an AI tool to help you generate clickbait YouTube titles. It takes the user input and puts them in an engineerd prompt. It also takes the subject & genre and searches for them on YouTube using the YouTube API. This way it can create working and up to date video titles, even if the subject was released after the LLM's training stage.

ClickbAIt uses NodeJS with Javascript and uses a .env file that is placed in the gitignore to hide the API keys.

Installation instructions:
1 after cloning the repo, go to the terminal in your prefered IDE and CD to the SERVER directory.
2 In the server Directory type "npm install".
3 Make a .env file where you cn put you OpenAI API key and Google API key.
4 Type "npm run server" in the terminal of the SERVER directory.
5 Now you are ready to generate as many clickbait video titles as you want! (or as many as your keys allow ;P)

Potential issues:
When starting the server using "npm run server" it may crash, if this happens just keep running "npm run server" untill it works.
