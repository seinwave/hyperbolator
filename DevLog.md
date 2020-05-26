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

## Running to-dos (5.25.20)

#### Backend 
- Design / Build API routes
    - Set up controllers :white_check_mark:
    - Set up TESTS for controllers :white_check_mark:
    - Exaggeration level 1
    - Exaggeration level 2
    - Exaggeration level 3
    - Exaggeration level 4
    - Exaggeration level 5

- ~How to convert docx to doc, for Mammoth to work with?~ (No need, Mammoth takes care of that for us.)

- How to solve security issues (outdated lodash-merge as a dependency of HTML-docx-js.)

- Can I build an HTML-to-docx function on my own?

#### Frontend 
- Build an "about" to explain what the hell this is.
    - Before / after images

- Make the drag-n-drop typeable, too (?)
    - Is this possible?

- Get data from slider, scale it into 5 increments  :white_check_mark:

- Create a "Hyperbolate" (submit) button that fires the function  :white_check_mark:
    - Connect that function to the API routes (splitting by exaggeration level) :white_check_mark:

- How to return file? As a DL or displayed? Both?


## The Log

### 5.26.20

#### Pre

As promised, I'm going to make that `upload` button actually do something. And I'm going to fiddle with the design until we arrive at something I'm happy with. Not much functional complexity going into the work today -- but I'm not holding it against me. I'm working on my portfolio at the same time.

#### 

Done!

Had to learn some stuff about `refs` in React, and my `onChangeFile` function could probably use some refactoring -- but it works. 

Everything was accomplished in `Input.js`, after a modest amount of struggling. [This stack overflow answer](https://stackoverflow.com/questions/37457128/react-open-file-browser-on-click-a-div) was extremely helpful.

Lesson learned today, though: I will NOT be doing any more CSS noodling until my functionality is up and running. Want to get those basics down first.

And, when I do start CSS-ing, I want to do it with a *checklist in hand*. 

Otherwise the noodling will be endless.

Okay, until next time. 

#### Post

### 5.25.20

#### Pre

Gonna fiddle with the CSS today. Need to get the style distinct from my previous efforts. The samey-ness of my portfolio is a little telling.

#### Post

Did a pretty okay job here. It definitely doesn't look "the same." But it definitely doesn't look "good" either. I'll work on that.

I also added an 'upload file' button -- for users who can't do drag n' drop, or on mobile. But I haven't made the button actually do anything. That's for tomorrow.

### 5.22.20

#### Pre

Now to figure out other `numbers` cases: like percentages, negative comparisons, etc.

Question: is Compromise smart enough to exclude dates from `numbers()`?

Guess I'll find out!

#### Post

Made a lot of progress in unexpected directions. Got decent grammar mutilators running, and the number mutilators are *almost* sensitive enough to satisfy me.

Now I need to plug them into the hyperbolation routes and get this thing running!


### 5.21.20

#### Pre

With a firmer grasp of Compromise in hand, it's time to write the rest of the mutilators.

I'll start with the test suite, then build out the functions. Like a good boy.

Should be fun! Here we go!

#### Post

Hell yeah! Got the grammar functions scripted out, fixed the folder structure so I can import functions directly, TOTALLY sabotaged my unit tests -- but otherwise stuff is functioning pretty well.

Now it's just a matter of fine tuning:
1. Get the text output a little more human friendly
2. Fix the CSS so my style isn't so "samey"
3. Get it so we can export docx-to-docx, with formatting

We're close, baby!

#### Post

Started writing the `orgUp` mutilator, which replaces Organizations in a text with ${MorePrestigiousOrganizations}. Ran into a limitation with Compromise -- it was failing to detect several organizations I tested, including "University of Minnesota" and "NRC Health." May need to call attention to that on github.

I may abandon the `orgUp` and `titleUp` functions for now, in favor of refining the number- and grammar-oriented functions.

With the `numbers`, I need to:
- Figure out more cases to apply a hyperbolation. %s. Citations. Etc.
    - My gut tells me that, in most cases, exaggeration will be better applied in a POSITIVE direction, rather than a negative one. 
        - How to detect the negative-exaggeration cases?
- On the bright side, though, I did figure out how to apply a new hyperbolation to EACH number, rather than the same hyperbolation to ALL numbers. 
    - AND I got it deployed on my first `hyperbolator` route!

With the `grammars`, I need to:
- Write my first damn function, and figure out how to test it.

For tomorrow!

- - - 

### 5.20.20

#### Pre

Right back to it, then! Figuring out these `mutilator` functions, getting them nice and tested.

Think I should start by constructing pre- and post- mock bodies of text. Will make the test suite look a lot cleaner.

And plus that will help me understand exactly what I want to have happen.

To work!

#### Post

Took some work, but things are cookin' now!

My issue was that I underestimated `Compromise`. It's much more comprehensive and powerful than I thought.

Just look at how easy to read / write this function is:

```
const comparatorUp = (doc) => {
    let content = nlp(doc)
    content
    .filter(s => {return s.has('more than')})
    .numbers()
    .add(3)
    return content.text()
}
```

It adds 3 to every number in every sentence that contains the phrase "more than." Brilliant!

(PS - I love that I have working, meaningful tests for all these.)

Next step is to scale this function (along with its counterpart, `comparatorDown`) along the `hyperbolator` levels.

For tomorrow!

- - -

### 5.19.20

#### Pre

Nice to wake up with a clear place to start. 

Time to write those `mutilator` functions. Some considerations before I start:

1. I want them pretty functional -- modular, plug-n-play, testable.
2. I want them to scale up or down with the hyperbolation level. Don't want to repeat myself. 
3. The `mutilator` list is by no means exhaustive. I just don't have any more ideas at the moment. 

Okay. One at a time, here we go!

#### Post

Okay, much slower going than I thought. Mostly because I'm trying to unit-test everything as I go. Which has been good, because helping me understand `Compromise`'s guts a bit better. 

I can modify the text right now. But I can't *conditionally* modify it. And I'm not sure what the best solution for integrating localized changes (eg - a sentence has been modified because it has "more than" in it. How to work that back into the text? Possible solution -- Compromise's `replace()` methods?)

Anyway. Not my fastest or most productive day. But making progress.

- - - 

### 5.18.20

#### Pre

At last, we arrive at the heart of the app. The routes are clear. But what's going to happen along the way?

In other words: how, exactly, are we going to mutilate the user's text?

My goals for today are:

1. Figure out what my `mutilating functions` should be, based on what should happen at various levels of hyperbolation
2. Block out my `mutilating functions` in pseudocode, structuring them so they're nice and functional
3. Map the mutilating functions to appropriate `Compromise` calls. 

This one will probably be a "more thinking, less coding" kind of day. Let's see how it goes!

#### Post

Not the most blistering pace of productivity today. But that's alright. Getting the pseudocode down is a major intellectual hurdle-clearing, imo.

I don't think I have any more `mutilations` to design. At least, I can't come up with any more ideas at the moment. Maybe later.

That's the beauty of modular design. I can always plug-n-play more ideas, as they come.

Next steps are:
- Actually write these functions
    - Including gradations for each `hyperbolation` level (using 2nd argument?)
- Work out the directory / importing structure
- Populate the various arrays with people / institutions / etc. Maybe this is a case for JSON objects?
- Testing!

- - - 

### 5.17.20

#### Pre

Don't have as much time today. Too many chores. Going to be a little modest in my goals. 

I want to figure out two things today, one directly related to this project and one not:

1. Testing these API routes
2. A markdown-to-blog platform, for my portfolio.

I'll let you know how I do. 

#### Post

Aaay mission accomplished on #1!

Got some *meaningful* (though not individuated) tests going for each of my API routes!

The key was figuring out how to work with `supertest`, which I wasn't even looking at closely. The `request.post` method had a `send` property that I could use to include whatever I wanted -- including my `mockFile` for uploading. 

Worked out great!

One quick issue: CircleCI was yelling at me because, as the tests were running, the `/download` route was attempting to delete files from the upload folder. 

But there *were* no files in the upload folder -- I was just using mocks to test!

So I had to add a condition `if (files)` statement to `/download`, and that shut CircleCI up. 

- - - 


### 5.15.20

#### Pre

Lord save me, I think I'm going to attempt some TDD.

I'm going to start by fashioning some unit tests for each of my `hyperbolation` routes. Very basic. Upon `req`, they should return a file. That's it.

Then I'll make those tests, so help me god.

After that, I'll toss in some simple `compromise` functions to make them distinct from one another.

#### Post 

Okay, full disclosure: I need to learn more about how to test HTTP requests.

I'm going to move on to another task while I figure that out.

Now, I'm just going to try and configure `handleh0` so that it modifies a simple text file. 

#### Post 2

Achieved! I have all of my `hyperbolator` routes altering simple text files, and returning the altered files to the user!

Next step is to get them altering `docxs` -- which shouldn't be too bad.

And from there, figuring out how to make the alterations meaningful.

Tomorrow's Saturday, so -- till Sunday!

- - - 

### 5.14.20

#### Pre

Okay, yesterday was rough. A lot of wheel-spinning on the same, pretty small issue. I'm hoping today's a little better.

To recap, what I want to achieve today is: 

1. Empty the `uploads` folder between sessions on the backend.
2. Reset the `fileList` array on the front-end, without messing up the app.

Think I'll start with #2. And I'll start with the React documentation.

Wish me luck.

#### Post

Good news on the #2 front -- figured it out! I was having two issues: 

1. A typo in my `dispatch` function, of course. 
2. I was defining my `initialState` within the `useReducer` function, when it's easier to manipulate if `initialState` is its own `const`. 

Those problems solved, now the `fileList` empties out like I want!

(Also, I cannot overstate the importance of using the React documentation / React devtools to figure this out. Way easier than searching for blog posts, and `console.log`ing everything.)

AND good news on the #1 front! I know I said "Matt you're gonna use the documentation from now on", but this [stackoverflow](https://stackoverflow.com/questions/27072866/how-to-remove-all-files-from-directory-without-removing-directory-in-node-js) answer was just too elegant and perfect. 

(Plus the fs documentation is...very long).

I now have an `fs` function firing in my `/download` path that empties the `uploads` folder, as soon as the user gets their file.

There's no interruption in the downloads, and the `uploads` directory stays manageably small!

This gives me room for some...

#### BONUS PROBLEM -- The filename issue

Maybe with my extra time, I can figure out the `filename` issue from `5.12.20.`

...which, I'm happy to report, I was successful with!

Another [stackoverflow](https://stackoverflow.com/questions/32545632/how-can-i-download-a-file-using-window-fetch)-derived solution. But I legit think there's no way I would have figured this out, through any amount of documentation reading.

At first, I tried to pass the `filename` as the second argument in the `/download` route's function, and then use `JSON.stringify()` the `/download` route's response, and use that to parse the filename from it. No dice.

But the appending an invisible `a` element, with a `.download` `filename` that I designate, worked like a charm. 

With that, my stable, "upload-is-a-flat-circle" project is now complete!


#### BONUS PROBLEM #2 -- Mammoth?

So, I realized that I made an ungenerous assumption about [Compromise](https://github.com/spencermountain/compromise) (the NLP engine on the backend of all this) -- that it can't parse word docxs. 

But I never tested that assumption.

I should probably figure that out BEFORE I install any possibly unnecessary third-party libraries, huh?

#### Post-Bonus #2

Okay, I can report that, after testing, Compromise CANNOT handle docxs in the way I need. It works with text only, baby. 

Wasted ~45m investigating that. Should've quit while I was ahead.

Oh well. Still leaped some major hurdles today!


#### For tomorrow:

1. Install `mammoth` and `compromomise` on the backend. 
2. Get downloaded file altered, based on the `hyperbolation` level. 
    - Some easy, mock alteration -- like changing all nouns to 6 or something.

- - - 

### 5.13.20

#### Pre

Today, I will be solving the problems I created for myself yesterday. Here's what I believe I need to do, *in the order I believe I need to do it in*:

1. Get the user's uploaded file into a `temp` or `uploads` folder.
2. Get the `/download` path to read the file from the `temp` / `uploads` folder
3. Get the downloaded file's `filename` in fuckin' English. 

I have a feeling this will take me a while. 

But I learned yesterday that, whenever I run into a stumbling block, my first impulse is to scout around for a blog post or a YouTube video that's going to hold my hand through the process.

No. Stop that, Matthew.

The *first* place I need to look is the documentation for the software tools at hand. 

In many cases, that documentation is better-organized / better-written than the warmed-over methods / recipes you find in blog posts.

Reading the docs first is also how I'll build a deeper / more comprehensive knowledge of the tools I'm using. It's direct contact with the thing-in-itself. Next best thing to reading code. Reading blog posts *about* documentation won't get me there. 

And, finally, reading documentation is a skill in itself. Something I should practice.

So, that said, I will *start* today's problem solving by looking at the `formidable` documentation, and at whatever documentation I can find to explain how `fetch()` works on a `blob()`. 

#### Post

Wow. That was MUCH harder than I thought it was going to be.

To review, my goals were: 

1. Get the user's uploaded file into a `temp` or `uploads` folder.
2. Get the `/download` path to read the file from the `temp` / `uploads` folder
3. Get the downloaded file's `filename` in fuckin' English. 

Of those, (1) was actually pretty easy. And, I'm thrilled to say I found the answer by perusing (and yes, I'm using that word [correctly](https://www.google.com/search?client=firefox-b-1-d&q=perusing+dictionary)) the `formidable` documentation.

Helped me feel like a real coder.

Good thing step (2) was here to humble me. That took SO long!

`Express`'s documentation on the `res.download` method was very helpful. But I had the craziest time getting the file from the `upload` into my front-end's `state`, and then moving it from the `state` into the `download` fetch request.

Seriously took me all morning.

Part of it was because I forget to pass the filepath through `JSON.stringify()` upon uploading. Part of it was because I didn't know to modify the headers on my download `fetch()` request. (Thanks to [this GH thread](https://github.com/github/fetch/issues/323) for that tip). And part of it was because I forgot that my uploaded `fileList` was an ARRAY of file paths -- not the string of a single file path.

With those kinks worked out, everything's going okay.

I can upload a file. Click a button. Download the same file. Reliably. That's huge, for me.

NOW my issue is a memory / data one: these files keep getting uploaded, and my upload folder keeps getting bigger and bigger. So problems to solve are:

1. How to purge files from upload folder? (Guessing: "use DBs!" will be the answer here.)
2. How to clear files from my `fileList` array, without totally screwing up the frontend? (For some reason, the `Button.js` won't render if I try to modify the state...)

For tomorrow!


- - - 

### 5.12.20

#### Pre

##### A - Unit tests

Today I want to set up some tests for my API routes. Nothing too crazy. But since I shoe-horned CircleCI into my app yesterday, it'd be nice for it to have something to run on. 

For now, the tests will be very very basic, and will evolve as the app does. Goal right now is just to get the reps in on working with Jest.

##### B - Uploading is a flat circle

Here's what I want to achieve:
1. Upload a file on the front end.
2. Receive it on the back end.
3. Send back the file to DL on the front end.

That's it. Just trying to wrap my head on the basic mechanics of this. Do I need a DB? Probably. But here's when I'll find out for sure. 

#### Post

##### A - Unit tests

Nice! Got unit tests up and running. It was -- *ahem*, as always -- slightly more complicated than I thought.

I didn't realize that `Jest`, by itself, wasn't the easiest tool to use for mocking HTTP requests. `supertester` was the tool of the hour, which made things much easier.

I also had to split my `server.js` file into two files -- `app.js` for all the main functions of the API, and `server.js`, just for deploying the server. 

Why? Because when everything was in `server.js`, the server would spin up before the unit tests could finish their work. That interrupted the testing.

By sequestering the API functions into `app.js`, I gave the testing suite something to work on BEFORE the server ever deploys.

Thanks to [Rithm School](https://www.rithmschool.com/courses/intermediate-node-express/api-tests-with-jest) for that explanation.

##### B - Uploading is a flat circle

Okay, wow! Made some progress, but it's slow going. Didn't finish this task yet. Here's what I did, and what I need to accomplish.

1. I have the `download` response working, upon clicking the Hyperbolator button. 
    - It even prompts the 'save' dialogue in the user's window. But the filename is messed up, because it's `resp.blob().`
2. I have the `upload` response working, along with access to the `file-name`.

What I NEED to do is:

1. Connect the `upload` and `download` paths -- what the user uploads needs to be what they download. (Hence the flat circle)
2. Solve the filename / dialogue issue. I need to get it so that the filename in the `save prompt` matches the user's expectations.

For tomorrow, then!

- - - 

### 5.11.20

#### Pre

Alright, now that I'm moving the data around the way I want, it's time to use that data to invoke the correct function on the API side. I think the way to do that is with query string parameters?

First step is to build the routes / controllers, and have them log something simple. Then I'll figure out what I want to do with them.

#### Post

Success! And I got everything neatly split into controllers, too. That will help a LOT when it's time to design what the routes actually do, exaggeration-wise. Maybe tomorrow?

- - - 

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



