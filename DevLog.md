## Vision / Overview

Hyperbolator: a webapp that helps you lie. 

### Usability path.

Drag n drop file (doc or docx) in. Set your 'exaggeration' level with a slider. We'll give you back a -- "properly formatted" -- docx, with some exaggerations built in.

### Stack

Front end: 
React.

Back end: 
Mammoth.js (translates docs to HTML).
Compromise (modest NLP with JS & Node).
Html-docx-js (translates HTML to doc/x)

Pretty simple, huh? Only major issue is that Html-docx-js has some security vulnerabilities, which I need to figure out how to solve.

## Running to-dos (5.10.20)

#### Backend 
- Design / Build API routes
    - Exaggeration level 1
    - Exaggeration level 2
    - Exaggeration level 3
    - Exaggeration level 4
    - Exaggeration level 5

- How to convert docx to doc, for Mammoth to work with?

- How to solve security issues (outdated lodash-merge as a dependency of HTML-docx-js.)

#### Frontend 
- Build an "about" to explain what the hell this is.
    - Before / after images

- Make the drag-n-drop typeable, too (?)
    - Is this possible?

- Get data from slider, scale it into 5 increments  :white_check_mark:

- Create a "Hyperbolate" (submit) button that fires the function  :white_check_mark:

- How to return file? As a DL or displayed? Both?


## The Log

### 5.10.20

#### Pre 
Today's Sunday. Which means I don't want to work THAT hard. I think today I'll set out to tackle the slider data mapping, and the Hyperbolate button. 

Anticipated issues? None, really. This is stuff I've done before. We're extracting input from the slider, passing that input to a `fetch()` call to the API. Pretty simple stuff. I don't expect it to take too long. 

#### Post

lol. Of course it was more complicated that I thought. Getting that slider's input to move around the App took a little bit of fiddling. 

Because I'm using a `reducer()` to manage my dropzone, that changed the App from a component to a function, which means I had to work with a logic I wasn't familiar with. 

Basically, it was a whole new way of constructing the App's `state`. Or at least, new to me.

Instead of building a `constructor()` in the `App.js`, I had to use the `reducer` function to pass state around. So I had to build a "hyperLevel" prop, and use the slider to manipulate it.

And of course, I had forgotten exactly how to capture the slider's input using `onChange`. It wasn't `e.parentElement.value`, it was `e.target.value`! DUH. 

But, at the end of the day, we have slider input, we have functions that log what they're supposed to. 

#### Next step!

Making that click function connect to the API. 



