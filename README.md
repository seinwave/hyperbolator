# The Hyperbolator

Upload a .docx or .txt file. The Hyperbolator turns it into lies. 

![BSL in action](https://mattseidholz.com/assets/images/hyperbolator.gif)

Try it out [here.](seinwave.github.io/hyperbolator)


## Rationale


### What does this do?

You upload a document. Then you pick, on a scale of 0-5, how much you want to lie.

The Hyperbolator adds some adjectives / adverbs, multiplies or divides some numbers (where appropriate), and gives you your exaggerated file back.

Does it work? Mostly. 

I'll get into my discontents later. 

### Why make this?

It all started when I stumbled on [Compromise](http://compromise.cool/), [Spencer Kelly](https://www.google.com/search?client=firefox-b-1-d&q=github+spencerymountain)'s very cool JS-based NLP library.

From the second I saw it, I wanted to play with it. And play I did!

The Hyperbolator is the result. 

## Execution

### What's your tech stack?

A tried-and-true combo of a `React` frontend, with a `Node.js` server on the backend (deployed to Heroku).

The server's where all the action is — where files are uploaded, stored very briefly, mutated, and written to a new file. Which is what the user downloads. 

Easy peasy!

### What weren't you happy with?


#### Too many packages

Unfortunately, for all the file management, I was pretty dependent on some node packages. Which was really my downfall here.

First of these was `Mammoth`, converts `.docx` files to `HTML`. Once it's in `HTML`, `Compromise` plays around with it, according to the degree set by the user. *That* part actually works pretty well.

What's less great is the reverse process — taking `HTML` and putting it back into `.docx`. I relied on another package — `html-to-docx-js`. 

The issue is formatting. 

Mammoth's HTML output preserves some of the original `docx` document's stylings, but it still *looks* like a very mutated piece of work. 

Not the seamless experience I was going for.

And I'm not entirely sure how to fix it.

#### The wrong start

I also bumped into some of `Compromise's` limitations. 

I had envisioned a very ambitions lying machine — with a primary use-case on resumes. 

It would replace job titles with better ones, swap out less prestigious companies / universities for better ones, etc.

But I kept running in to awkward misfires. `Compromise` uses regex and statistical linguistic clues to determine if something is an organization or a person, etc. It didn't quite hit the mark, and I wasn't sure how to fix that, either.

Ultimately, I decided to move along to other projects.

But there's always a chance I could pick this up again someday. 


## Clone this App!

If you have some ideas for the Hyperbolator, feel free to fork the `dev branch` repo. (But bear in mind this repo is only the frontend. Link to the API repo down below).

And if you'd like to clone the Hyperbolator to your local machine, it should be pretty straightforward.

- Clone the `dev branch` of this repo using the protocol of your choice.
- Head to the <a target ="_blank" href = "https://github.com/seinwave/hyperbolator-api">Hyperbolator API</a> repo, and clone that too.
    - You'll need the following dependencies (`npm install` or `yarn add`):
        - body-parser
        - compromise, and the following compromise extensions:
            - compromise-adjectives
            - compromise-numbers
            - compromise-sentences
        - <a target ="_blank" href = "https://www.npmjs.com/package/html-docx-js"> html-docx-js </a>
        - <a target ="_blank" href = "https://www.npmjs.com/package/mammoth"> mammoth </a>

Enjoy!
