---
title: "The 2020 Material UI Developer Survey: here's what we discovered"
description: Your feedback helps us to build better products. Here's what we learned about your needs in our annual survey.
date: 2020-06-27T00:00:00.000Z
authors: ['mnajdova', 'oliviertassinari', 'mbrookes']
tags: ['Developer Survey']
manualCard: true
---

Continuing the tradition from last year, we launched a Developer Survey a few months ago, to which we received 1488 responses. This is twice as many as last year (734), so we thank you all for your participation!
The survey is closed and we can now give a detailed summary of the results.

Like last year, the survey was again broken into three sections: ["Introduction"](#introduction), ["About you"](#about-you) and ["Your product"](#your-product).

## Introduction

In this section, we wanted to hear what developers think is going well, what we should keep doing, and which areas need improving to make the library even better.

### 1. How would you feel if you could no longer use Material UI?

<img src="/static/blog/2020-survey/1.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="Pie chart: 73.3% Very disappointed, 21.3% somewhat disappointed, 5.4% not disappointed." />

Similar to last year, over 94% of the respondents would be disappointed if they could no longer use Material UI, which is very encouraging. We will keep working hard to hopefully move more of you into the "very disappointed" category!

The number of respondents who would not be disappointed has moved down from 6.5% to 5.4%, which is technically a 17% improvement! 🙂 We'd love to understand more about those who use Material UI, but would happily use other solutions, so a follow-up question might be needed next year.

### 2. How likely is it that you would recommend Material UI to a friend or colleague?

<img src="/static/blog/2020-survey/2a.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Bar chart: 0.20% - 1, 0% - 2, 0.20% - 3, 0.20% - 4, 1.02% - 5, 1.97% - 6, 8.71% - 7, 22.52% - 8, 20.88% - 9, 44.29% - 10" />
<img src="/static/blog/2020-survey/2b.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="Pie chart: 73.3% Very disappointed, 21.3% somewhat disappointed, 5.4% not disappointed." />

As last year, we again calculated the [Net Promoter Score](https://en.wikipedia.org/wiki/Net_Promoter)
(promoters less detractors). This year it is again a pretty high number 61.54%! (As the values for NPS range between -100 and +100, a "positive" score is considered "good", greater than 50 is "excellent", and above 70 is considered "world class").

### 3. Who do you think would most benefit from Material UI?

<img src="/static/blog/2020-survey/3.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="Word cloud of who would benefit most" />

<p class="blog-description">This word cloud was generated with wordclouds.com.</p>

Developers are again at the center of our universe 🙂 (And "people" and "teams" in general, of course!) This is understandable, given the [job role demographic](#8-which-of-the-following-best-describes-your-current-job-role)
of the majority of respondents. We will push hard on making the experience for you even better over the next year.

### 4. What is the main benefit you receive from Material UI?

<img src="/static/blog/2020-survey/4.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="Word cloud of the main benefit of Material UI" />

The responses to this question are a very clear indicator to us about what we need to continue to do more of. Some of the most common points were: the range of components, ease of use, documentation quality, as well as the design. We will, of course, continue to work on all of these.

### 5. How can we improve Material UI for you?

As the answers to these questions were pretty different, we grouped them into different categories and counted the different number of times the concern was mentioned. You can see all of them sorted in descending order:

<!-- vale MUI.CorrectReferenceAllCases = NO -->

<style>th { text-align: left; border-bottom: 3px solid !important; }</style>

<table>
  <tr><th style="width: 40px;">306</th><th style="width: 700px;">more components</th></tr>
  <tr><td>202</td><td>more components - ?</td></tr>
  <tr><td>15</td><td>more components - data grid</td></tr>
  <tr><td>12</td><td>more components - carousel</td></tr>
  <tr><td>12</td><td>more components - charts</td></tr>
  <tr><td>10</td><td>more components - lab to core</td></tr>
  <tr><td>10</td><td>more components - upload</td></tr>
  <tr><td>9</td><td>more components - icons</td></tr>
  <tr><td>6</td><td>more components - big calendar</td></tr>
  <tr><td>5</td><td>more components - layout</td></tr>
  <tr><td>4</td><td>more components - navbar</td></tr>
  <tr><td>4</td><td>more components - nested menu</td></tr>
  <tr><td>2</td><td>more components - rich text editor</td></tr>
  <tr><td>2</td><td>more components - splitter</td></tr>
  <tr><td>1</td><td>more components - masonry</td></tr>
  <tr><td>1</td><td>more components - nav bar</td></tr>
  <tr><td>1</td><td>more components - numberpad</td></tr>
  <tr><td>1</td><td>more components - onboarding</td></tr>
  <tr><td>1</td><td>more components - prompt</td></tr>
  <tr><td>1</td><td>more components - scrollspy</td></tr>
  <tr><td>1</td><td>more components - swappable tabs</td></tr>
  <tr><td>1</td><td>more components - timeline</td></tr>
  <tr><td>1</td><td>more components - video player</td></tr>
  <tr><td>1</td><td>more components - virtualization</td></tr>
  <tr><td>1</td><td>more components - drag and drop</td></tr>
  <tr><td>1</td><td>more components - dropdown</td></tr>
  <tr><td>1</td><td>more components - image</td></tr>
  <tr><th>189</th><th>customization</th></tr>
  <tr><td>85</td><td>customization - easier</td></tr>
  <tr><td>22</td><td>customization - docs</td></tr>
  <tr><td>16</td><td>customization - dynamic color & variant</td></tr>
  <tr><td>15</td><td>customization - improve custom themes</td></tr>
  <tr><td>13</td><td>customization - provide more themes (not just Material Design)</td></tr>
  <tr><td>11</td><td>customization - ?</td></tr>
  <tr><td>9</td><td>customization - unstyled components</td></tr>
  <tr><td>8</td><td>customization - support system in all components</td></tr>
  <tr><td>8</td><td>customization - theme editor (visual tool)</td></tr>
  <tr><td>2</td><td>customization - theme gallery (coming from the community)</td></tr>
  <tr><th>155</th><th>docs</th></tr>
  <tr><td>46</td><td>docs - ?</td></tr>
  <tr><td>45</td><td>docs - more examples</td></tr>
  <tr><td>33</td><td>docs - more templates</td></tr>
  <tr><td>16</td><td>docs - beginner friendly</td></tr>
  <tr><td>8</td><td>docs - smaller demos</td></tr>
  <tr><td>8</td><td>docs - tutorials</td></tr>
  <tr><td>3</td><td>docs - api integration with components</td></tr>
  <tr><td>2</td><td>docs - better search</td></tr>
  <tr><td>2</td><td>docs - spanish</td></tr>
  <tr><td>1</td><td>docs - chinese</td></tr>
  <tr><td>1</td><td>docs - translations</td></tr>
  <tr><td>1</td><td>docs - detailed api</td></tr>
  <tr><td>1</td><td>docs - easier discoverability of components</td></tr>
  <tr><td>1</td><td>docs - generated DOM</td></tr>
  <tr><td>1</td><td>docs - japanese</td></tr>
  <tr><td>1</td><td>docs - more realistic examples</td></tr>
  <tr><td>1</td><td>docs - nested props</td></tr>
  <tr><td>1</td><td>docs - plugins</td></tr>
  <tr><td>1</td><td>docs - ssr</td></tr>
  <tr><th>64</th><th>performance</th></tr>
  <tr><td>31</td><td>performance - ?</td></tr>
  <tr><td>32</td><td>performance - bundle size</td></tr>
  <tr><td>1</td><td>performance - DOM size</td></tr>
  <tr><th>56</th><th>styles</th></tr>
  <tr><td>19</td><td>styles - styled components</td></tr>
  <tr><td>7</td><td>styles - docs</td></tr>
  <tr><td>5</td><td>styles - simpler</td></tr>
  <tr><td>4</td><td>styles - ?</td></tr>
  <tr><td>3</td><td>styles - CSS syntax</td></tr>
  <tr><td>3</td><td>styles - better dark/light switch</td></tr>
  <tr><td>3</td><td>styles - emotion</td></tr>
  <tr><td>3</td><td>styles - performance</td></tr>
  <tr><td>2</td><td>styles - agnostic to engine</td></tr>
  <tr><td>2</td><td>styles - CSS modules</td></tr>
  <tr><td>2</td><td>styles - utility class names</td></tr>
  <tr><td>1</td><td>styles - atomic compiled CSS-in-JS</td></tr>
  <tr><td>1</td><td>styles - keep jss</td></tr>
  <tr><td>1</td><td>styles - remove JSS</td></tr>
  <tr><th>25</th><th>typescript</th></tr>
  <tr><td>19</td><td>typescript - ?</td></tr>
  <tr><td>3</td><td>typescript - docs</td></tr>
  <tr><td>3</td><td>typescript - faster check</td></tr>
  <tr><th>21</th><th>date picker - improve</th></tr>
  <tr><th>19</th><th>react native</th></tr>
  <tr><th>13</th><th>form</th></tr>
  <tr><th>13</th><th>material design updates</th></tr>
  <tr><th>12</th><th>animations</th></tr>
  <tr><td>8</td><td>animations - ?</td></tr>
  <tr><td>2</td><td>animations - docs</td></tr>
  <tr><td>1</td><td>animations - declarative API</td></tr>
  <tr><td>1</td><td>animations - SVG</td></tr>
  <tr><th>11</th><th>test</th></tr>
  <tr><td>4</td><td>test - jest</td></tr>
  <tr><td>3</td><td>test - stable snapshot</td></tr>
  <tr><td>1</td><td>test - ?</td></tr>
  <tr><td>1</td><td>test - docs</td></tr>
  <tr><td>1</td><td>test - styles</td></tr>
  <tr><td>1</td><td>test - testing library integration</td></tr>
  <tr><th>8</th><th>more opinionated</th></tr>
  <tr><th>8</th><th>simplify</th></tr>
  <tr><th>7</th><th>class components</th></tr>
  <tr><th>7</th><th>mobile</th></tr>
  <tr><th>7</th><th>fewer breaking changes</th></tr>
  <tr><th>7</th><th>designers</th></tr>
  <tr><td>2</td><td>designers - bridge design tools and code</td></tr>
  <tr><td>2</td><td>designers - Adobe XD material</td></tr>
  <tr><td>2</td><td>designers - Figma material</td></tr>
  <tr><td>1</td><td>designers - ?</td></tr>
  <tr><th>6</th><th>free vs paid balance</th></tr>
  <tr><th>6</th><th>tree view - improve</th></tr>
  <tr><th>6</th><th>less abstracted components</th></tr>
  <tr><th>5</th><th>more abstracted components</th></tr>
  <tr><th>4</th><th>accessibility</th></tr>
  <tr><td>1</td><td>accessibility - ?</td></tr>
  <tr><td>1</td><td>accessibility - auto id</td></tr>
  <tr><td>1</td><td>accessibility - full audit</td></tr>
  <tr><td>1</td><td>accessibility - more examples</td></tr>
  <tr><th>4</th><th>system</th></tr>
  <tr><td>1</td><td>system - CSS grid</td></tr>
  <tr><td>1</td><td>system - docs</td></tr>
  <tr><td>1</td><td>system - performance</td></tr>
  <tr><td>1</td><td>system - rework breakpoints</td></tr>
  <tr><th>3</th><th>components consistency</th></tr>
  <tr><th>3</th><th>grid - improve</th></tr>
</table>

<!-- vale MUI.CorrectReferenceAllCases = YES -->

### Comparison with last year

There are a couple of noticeable differences compared to last year.
Some can be explained by our work, others by the evolution of the ecosystem.
Each item is prefixed by the multiplication factor of the pain point for 2020 relative to 2019.

Decreasing pain:

- x0: Slider. No requests. The requirements are mostly met, especially with the introduction of the range feature.
- x0.1: Strict mode. We fixed a lot of strict mode compatibility issues this year. However, since Create React App has made this mode a default, we have seen a lot more requests for it.
- x0.1: Autocomplete. We added a new component, and have resolved a large number of issues opened since. This will be moved from lab to the core in v5.
- x0.2: Fewer breaking changes. Only releasing minor versions under v4 for over a year helps a lot. However, we still need to be careful with CSS changes.
- x0.3: Accessibility. We have been able to leverage GitHub issues opened by a11y experts, often coming from large companies using Material UI at scale to improve it a lot this year.
- x0.4: Material Design. We didn't do much for it this year, at least not as much as we could have. Maybe the reduction is because fewer people care? It seems that we start to resonate more with developers building custom design systems.
- x0.4: TypeScript. The continued migration of all the demos to TypeScript and of all the props to IntelliSense is paying off.
- x0.5: Date picker. We did a lot for it this year. We probably still need the range feature, and to move it into the main repository (docs migration, etc.) for consistency.
- x0.7: Performance. We didn't do much this year, so perhaps developers are leveraging React more effectively with virtualization, update pruning, etc?

Growing pains:

- ∞: Forms is a new item. It seems that we should at least work more closely with react-hook-form, formik, and react-final-form.
- ∞: Charts is a new item. Material Design even has a page dedicated to [date visualization](https://m2.material.io/design/communication/data-visualization.html).
- x5: Custom themes.
- x5: Simpler customization. We have improved customizability this year by introducing global class names and reducing the CSS specificity of some selectors. However, it seems that we are now tapping into a new audience. We need to do better.
- x1.5: Animations.
- x1.2: React native. We still have no plans for it. The [market is too small](https://npm-stat.com/charts.html?package=react-dom,react-native) to make it sustainable with our model.
- x1.1: More components. The more we offer, the more developers ask for! We will try to help solve this with the enterprise version, both because it's the best model we have found that can sustain the development of advanced components, and because it allows us to reinvest in the open source components. The first early access will land this year.

### 6. What are your key criteria when choosing a UI library?

<img src="/static/blog/2020-survey/6.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Bar chart: 21.99% The design, look & feel, 21.64% Documentation quality, 16.38% Customizability, 8.42% TypeScript integration, 6.89% Comprehensiveness, 5.35% Enterprise ready, 4.68% Bundle size, 4.92% Popularity, 4.45% Accessibility, 2.62% Documentation quality, 1.88% Offered support & help, 0.12% Performance, 0.67% Other." />

The number of answers was limited to 3.

## About you

### 7. How did you hear about Material UI?

<img src="/static/blog/2020-survey/7.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Bar chart: 50.65% Search, 26.18% Word of mouth, 10.76% Social, 5.10% Blog, 7.31% Other." />

### 8. Which of the following best describes your current job role?

<img src="/static/blog/2020-survey/8.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Bar chart: 52.18% Full-stack developer, 27.11% Frontend developer, 11.65% Entrepreneur (I do it all), 3.47% Beginner learning web development, 1.23% Backend Developer, 1.16% UX Designer, 0.34% Student, 0.20% CTO, 2.66% Other." />

This was expected :)

### 9. How big is your organization?

<img  src="/static/blog/2020-survey/9.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Bar chart: 12.30% Hobby / side project, 13.40% Self-employed, 35.60% 2-5 people, 16.10% 6-10, 10.30% 11-20, 5.10% 21-50, 2.50% 51-100, 4.60% 100+" />

It seems we are consistently popular with small to medium-sized organizations, so we will keep working on the ease of use of the components, while at the same time, allowing designers to style them to match their organizations' brand.

### 10. How long have you been developing with JavaScript

<img src="/static/blog/2020-survey/10.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Bar chart: 3.60% I'm just getting started!, 7.40% 6 months +, 20.80% 1 year +, 27.80% 3 years +, 24.30% 5 years +, 9.80% 10 years +, 4.10% 15 years +, 2.30% 20 years +" />

We can see the normal distribution of developer experience here, where most have moderate level of experience (between 1 and 5 years).

### 11. How long have you been developing with React?

<img src="/static/blog/2020-survey/11.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Bar chart: 10.70% I'm just getting started!, 15.60% 6 months +, 24.60% 1 year +, 21.40% 2 years +, 23.10% 3 years +, 4.60% Bleeding edge baby! 5 years +" />

### 12. How long have you been developing with Material UI?

<img src="/static/blog/2020-survey/12.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Bar chart: 20.50% I'm just getting started!, 24.90% 6 months +, 28% 1 year +, 17.40% 2 years +, 7.50% 3 years +, 1.70% I'm a pioneer! 4 years +" />

### 13. What were you primarily using before Material UI?

<img src="/static/blog/2020-survey/13.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Bar chart: 47.08% Bootstrap, 16.04% Custom system, 13.68% Started with Material UI, 6.67% Angular Material, 4.44% Semantic-UI, 3.19% Ant Design, 8.89% Other" />

Similar to last year, it seems that most respondents were previously using Bootstrap. We can see also that custom solutions, as well as some other frameworks, were replaced with Material UI.

### 14. How many Material UI based projects have you built?

<img src="/static/blog/2020-survey/14.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Bar chart: 11.50% 0 (I'm just getting started), 23% 1, 54.80% 2-5, 7.80% 6-10, 2.90% 10+" />

## Your product

### 15. What are you building?

<img src="/static/blog/2020-survey/15.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Bar chart: 23.43% Enterprise application, 20.31% Dashboard admin app, 7.40% A design system, 7.40% A set of UI components, 7.37% playing with tech, 7.34% A prototype, 6.40% Landing page, 5.41% e-commerce site, 4.80% CMS, 3.59% Portfolio or resume, 1.88% Blog, 4.69% Other" />

Enterprises and dashboards are at the top of the heap, and yes, we know that for many of you, the systems you are building are internal, but if you have something that you would like to share as part of [the showcase](/material-ui/discover-more/showcase/), let us know by opening a PR. Also for those of you building UI components, we'd be happy to give you a shout out in the [related projects](/material-ui/discover-more/related-projects/)
section.

### 16. What "delivery mechanism" are you using?

<img src="/static/blog/2020-survey/16.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Bar chart: 68.37% Single page app (Create React App, etc), 18.24% Server-side rendered website (Next.js, Gatsby, etc), 6.22% Desktop app (Electron, etc), 4.65% Native mobile app (Cordova, etc), 0.10% React Native, 2.40% Other" />

### 17. Who are you building it for?

<img src="/static/blog/2020-survey/17.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Pie chart: 55.17% For my company
22.86% For a client, 16.94% Side project, 5.03% More than one of these." />

### 18. Which JavaScript framework are you using, if any?

<img src="/static/blog/2020-survey/18.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Pie chart: 57.34% Create React App, 16.40% Custom webpack, 12.35% Next.js, 5.40% Gatsby, 8.51% Other." />

### 19. What styling system are you using?

<img src="/static/blog/2020-survey/19.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Pie chart: 53.84% Material UI styles (JSS), 20.41% Styled components, 13.01% Good plain CSS, 8.31% CSS Modules, 1.96% Emotion, 0.59% scss, 0.59% sass, 0.09% less, 1.19% Other" />

The response seems to be similar to the one from the last year's survey, so we will push with better support for styled components.

### 20. Has your organization ever paid for UI components?

<img src="/static/blog/2020-survey/20.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Pie chart: 89.90% No, 10.10% Yes" />

### 21. What type system are you using?

<img src="/static/blog/2020-survey/21.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Bar chart: 54.08% None
30.87% TypeScript 3.8, 7.31% TypeScript 3.7, 1.90% Flow, 1.55% TypeScript 3.6, 0.98% TypeScript 3.5, 3.31% Other" />

Almost half of the community is using TypeScript. Next year, it might even become more popular than JavaScript.

## Conclusion

This data is **incredibly valuable** for our team.
Thank you again for participating!
We want to work on the problems that resonate the most with our users.
[It's clear](#5-how-can-we-improve-material-ui-for-you) that we should:

1. Provide more flexibility on the components, unstyled components (pure hooks?).
1. Make the customization easier and implement custom themes with Material UI. Maybe provide a theme builder.
1. Provide a second theme, update the current components to better match Material Design, provide more simple components and features (for example dropzone, carousel) as well as provide a better DX (there are good ideas from other UI libraries to apply to Material UI v5).
1. Improve upon the paid advanced versions of the components (for example complex data grid, date range picker, tree view drag & drop, virtualization, etc).

**We will update [our ROADMAP](/material-ui/discover-more/roadmap/) in the coming days**.
We will run a similar survey next year to keep track of our progress.

If you want to continue to influence our roadmap, please upvote 👍 the issues you are the most interested in on GitHub.

<video autoplay muted loop playsinline width="2914" height="1440">
  <source src="/static/blog/2019-developer-survey-results/vote.mp4" type="video/mp4" />
</video>

<p class="blog-description">Help us prioritize by upvoting.</p>
