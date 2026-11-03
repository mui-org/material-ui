---
title: "The 2021 MUI Developer Survey: here's what we discovered"
description: Your feedback helps us to build better products. Here's what we learned about your needs in our annual survey.
date: 2022-03-15T00:00:00.000Z
authors: ['danilo-leal', 'samuelsycamore', 'oliviertassinari']
tags: ['Developer Survey']
manualCard: true
---

Keeping up with tradition, a few months ago we opened the 2021 MUI Developer Survey.
Your feedback helps us to build better products, and we can't thank you enough for being a part of our community.
1,591 of you responded to this year's survey, and we take your input very seriously.
Here's what we've learned about your needs after poring over the results.

As with the previous iterations, the survey was divided into three sections: ["Your needs"](#your-needs), ["Your product"](#your-product), and ["About you"](#about-you).

## Your needs

### How would you feel if you could no longer use MUI?

Over 93% of you would be disappointed if you could no longer use MUI (a sum of "Very disappointed" and "Somewhat disappointed"). That's in keeping with 94% of you who felt the same way when we asked this question in 2019 and 2020.

<img src="/static/blog/2021-developer-survey-results/1.png" width="2400" height="1256" loading="lazy" alt="Bar chart: 62.7% Very disappointed, 30.4% Somewhat disappointed, 6.9% Not disappointed." />

<p class="blog-description">1567 out of 1589 answered.</p>

Notably, 2021 saw a 10% loss in the "Very disappointed" category, and a comparable gain in those who would only be "Somewhat disappointed." This suggests that some of you may be less enthusiastic about MUI's products when compared with previous years, and that's something we need to evaluate moving forward.

Those who would be "Not disappointed"—a group that grew by 1%—were asked to explain why. Here's what they said:

**The number of available alternatives**

Lately, with each new day a new UI component library appears.
Because they aim to solve the same problems, these libraries often arrive at solutions that are very similar to one another.
The establishment of common industry-wide patterns makes it that much more difficult to stand out from the crowd.
Meanwhile, we're working hard to expand beyond our core products to provide you with experiences that other libraries can't match.

**The introduction of a paid product**

A big challenge with open-source is that maintainers capture very little value.
The MIT licensed model has enabled the growth of a large community of contributors as well as the MUI team itself, but it does have its limitations.
To push the products as forward as we believe it's possible, we needed a way to invest more in them.
[Open-core](https://en.wikipedia.org/wiki/Open-core_model) allows us to still offer an MIT licensed (free) version of the MUI X components while charging for additional features that require more attention (including support).

It's still early days for MUI X, though.
We introduced it at the end of 2020 and have been iterating not only on the components but on the model itself.

We still have a lot more ground to cover — only ~0.1% of our developer community has been convinced to upgrade to the paid Pro plan so far.
Whether or not you've taken the plunge, we'd love to hear your thoughts about this.
And if you want to understand more about our view of the open-source/commercial balance, check our [Stewardship page](https://mui-org.notion.site/Stewardship-542a2226043d4f4a96dfb429d16cf5bd).

**The breaking changes made in v5**

Our most recent release, MUI Core v5, introduced some important breaking changes.
The main problem we wanted to tackle was customizability: unlocking more styling options without compromising on performance.

This new styling solution still has a ways to go in terms of maturity, and there's no denying that it requires a considerable amount of work to migrate from v4.
For our part, we still have a lot of work to do to help you make the most of the new features in v5, and we welcome your feedback.

What can we do to help you succeed? If you have any ideas or suggestions, you're always welcome to share your thoughts by opening an issue on GitHub.

### How likely is it that you would recommend MUI to a friend or colleague?

This year we observed a decrease in Net Promoter Score (NPS): from 62 in 2020 to 46 in 2021.
56.4% of you were Promoters this year, down almost 6 percentage points from last year (62.2%).
We're still in a good place — an NPS score between 30 and 70 is considered great.
But we have much more to do to achieve an excellent score.

<img src="/static/blog/2021-developer-survey-results/2.png" width="2400" height="1256" loading="lazy" alt="Detractors: 10.88%, Neutrals: 32.69%, Promoters: 56.43%, Overall NPS: 46.
Scale: -100 to 0 needs improvements, 0 to 30 is good, 30 to 70 is great, and 70 to 100 is excellent." />

<p class="blog-description">1563 out of 1589 answered.</p>

### What is the main benefit you get from using MUI?

<img src="/static/blog/2021-developer-survey-results/3.png" width="2400" height="1256" loading="lazy" alt="This question results in 2019 - Design: 248; Time: 193; DX: 128; Components: 89; Customizability: 53; Documentation: 25; Accessibility: 5; TypeScript: 5; Community support: 4; This question results in 2021 - Time: 597; Design: 407; Components: 309; DX: 306; Customizability: 181; Documentation: 57; Community support: 26; Accessibility: 24; Performance: 17" />

<p class="blog-description">1422 out of 1589 answered this question in 2021.</p>

Here's what you liked the most about the product in 2021, compared to 2019:

- **Community (2.9x):** While the community itself doubled in size, appreciation for the community grew by 190% over that same time frame.
  It looks like we're witnessing a network effect: with twice as many users, developers got three times more value from the community.
- **Accessibility (2.2x):** The community has definitely noticed the work we have put in to make our components more accessible.
  Special thanks to Sebastian Silbermann [(@eps1lon)](https://github.com/eps1lon) for his continued help!
- **Customizability (1.6x):** Developers seem to be appreciating the new capabilities introduced in v5.
  That said, we recognize that there is still more work to be done here, given the number of requests we've received to better solve this problem.
- **Components (1.6x):** We'll keep adding new components to the library as long as you continue to appreciate them this much!
  - Component quality (no change): You know that we set the bar very high for the quality of our components.
    This can be challenging as we continue to grow, because we expect nothing but the best from our team.
    Thankfully, this result shows that our team of maintainers has done an excellent job, aiming for high standards.
- **Time (1.4x):** Mostly referring to saved time during UI development. This is an interesting one because it's not an issue that we specifically addressed.
  Could this just be a result of the growing pressure in the market to build faster? Or because we somehow made this value proposition more noticeable? It could also be related to the next item.
- **Developer experience (1.1x):**
  - Consistency (1.75x): We didn't work on this dimension, and yet it grew.
    It's reasonable to assume that because we have more components than ever before, developers have started to notice how much more consistent their work is when they use MUI.
  - Ease of use (no change): Could it be because ease of use is mostly defined by the React API (hooks), or is it because we haven't made any major API changes to optimize for ease of use? There could be a lot of work here for our new Developer Experience team.

And what has decreased:

- **Design (x0.75):** Material Design hasn't evolved with changing tastes, and our work on a second design system to address this hasn't progressed as quickly we anticipated.
  - Material Design (x0.4): Its selling power is clearly fading.
  - Look & feel (x1.17): This is surprising.
    It seems to be a transfer effect: people who previously cared more about Material Design now care more about the outcome than the specification itself.
    <br/>

<!-- vale MUI.CorrectReferenceAllCases = NO -->

<details>
  <summary>Click to see the breakdown of categories.</summary>

<table>
  <tr><th style="width: 40px;">597</th><th style="width: 700px;">time</th></tr>
  <tr><th>407</th><th>design</th></tr>
  <tr><td>148</td><td>design - look & feel</td></tr>
  <tr><td>122</td><td>design - look & feel+</td></tr>
  <tr><td>73</td><td>design - consistency</td></tr>
  <tr><td>73</td><td>design - Material Design</td></tr>
  <tr><td>6</td><td>design - ?</td></tr>
  <tr><td>4</td><td>design - easy</td></tr>
  <tr><td>2</td><td>design - responsiveness</td></tr>
  <tr><td>1</td><td>design - time</td></tr>
  <tr><th>309</th><th>components</th></tr>
  <tr><td>173</td><td>components - quantity</td></tr>
  <tr><td>124</td><td>components - quality</td></tr>
  <tr><td>5</td><td>components - advanced</td></tr>
  <tr><td>3</td><td>components - data grid</td></tr>
  <tr><td>2</td><td>components - ?</td></tr>
  <tr><td>1</td><td>components - autocomplete</td></tr>
  <tr><td>1</td><td>components - base/unstyled</td></tr>
  <tr><th>306</th><th>DX</th></tr>
  <tr><td>221</td><td>DX - easy to use</td></tr>
  <tr><td>49</td><td>DX - consistency</td></tr>
  <tr><td>32</td><td>DX - API</td></tr>
  <tr><td>4</td><td>DX - ?</td></tr>
  <tr><th>181</th><th>customizability</th></tr>
  <tr><th>57</th><th>docs</th></tr>
  <tr><td>39</td><td>docs - ?</td></tr>
  <tr><td>17</td><td>docs - quality</td></tr>
  <tr><td>1</td><td>docs - quantity</td></tr>
  <tr><th>26</th><th>community</th></tr>
  <tr><th>24</th><th>accessibility</th></tr>
  <tr><th>17</th><th>performance</th></tr>
  <tr><td>15</td><td>performance - runtime</td></tr>
  <tr><td>1</td><td>performance - bundle size</td></tr>
  <tr><td>1</td><td>performance - ?</td></tr>
  <tr><th>9</th><th>community support</th></tr>
  <tr><th>5</th><th>icons</th></tr>
  <tr><th>3</th><th>typescript</th></tr>
  <tr><th>2</th><th>animations</th></tr>
</table>
</details>

### Please rate how much you agree or disagree with the following statements

<img src="/static/blog/2021-developer-survey-results/4.png" width="2400" height="1256" loading="lazy" alt="I can find most of the components I need (Strongly agree: 45.5%, Agree: 45.9%, Neutral: 6.2%, Disagree: 1.5%, Strongly Disagree 0.8%); I can easily customize the components to match the desired design (Strongly agree: 23.4%, Agree: 46.1%, Neutral: 18.6%, Disagree: 9%, Strongly Disagree 2.9%); I can find the answers to most of my questions in the documentation (Strongly agree: 24.1%, Agree: 50.1%, Neutral: 16.3%, Disagree: 7.6%, Strongly Disagree 1.9%); I find the library's performance to be great (Strongly agree: 26.4%, Agree: 44.3%, Neutral: 22.6%, Disagree: 4.7%, Strongly Disagree 2%); Whenever I needed to get help, I received helpful responses, Stack Overflow or GitHub (Strongly agree: 20.9%, Agree: 36.7%, Neutral: 36%, Disagree: 4.6%, Strongly Disagree 1.8%)" />

<p class="blog-description">1534 out of 1589 answered.</p>

It's a good thing to have a general sense of agreement with most of the statements, however, there's a considerably big gap between "Strongly agree" and "Agree" for all but the first statement. This highlights the need to continue pushing for even more quality in each of these dimensions (customizability, performance, and community support).

### What are your most important criteria for choosing a UI library?

<img src="/static/blog/2021-developer-survey-results/5.png" width="2400" height="1256" loading="lazy" alt="Ranked list: 1. The design - look and feel; 2. Customizability; 3. Documentation quality; 4. Comprehensiveness; 5. Performance; 6. Popularity; 7. Accessibility; 8. Offered support and help; 9. Bundle size" />

<p class="blog-description">1500 out of 1589 answered - Check <a href="https://help.typeform.com/hc/en-us/articles/360052767651-Ranking-question">Typeform's documentation</a> to understand ranking average calculations.</p>

This year we experimented with using Typeform to run the survey, which allows respondents to rank their choices.
This might have given us a richer perspective than we've been able to capture in the past, but in the end the results weren't too different from last year.

Design (look and feel) remains the most important criterion for choosing a UI library, and customization and documentation quality are still there in the top 3.
The notable difference this year seems to be performance climbing its way up, as it has been ranked as the fifth most important aspect.

### What else can we do to improve MUI for you?

<img src="/static/blog/2021-developer-survey-results/6.png" width="2400" height="1256" loading="lazy" alt="Word cloud of what we can do to improve MUI" />

<p class="blog-description">1007 out of 1589 answered this question in 2021.</p>

Here are the most recurring topics for improvement this year:

- **More components:** We continue to see requests for more advanced components such as charts, forms, and calendars, to name a few.
- **More examples:** Many of the existing learning resources are now outdated following the v5 upgrade, so we have a lot of work to do to show you how to make the most of our products.
- **Provide more themes:** Even with the launch of Material v3, Material Design is seen as outdated by many.
  That's why we're working on a second design system that will offer the same high standard of quality as Material Design, but with an alternative design direction.
- **Fewer breaking changes:** MUI Core v5 introduced some important breaking changes, especially because of the new styling solution.
  Rest assured that we don't expect to release any major updates this year—in fact, we aim to keep majors at least 12 months apart from each other.
- **Improve customization:** Common requests include making customization easier, providing more examples of common use-cases (like font-family and primary/secondary colors), and improving the theme capabilities.
  Even with the popularity of Emotion and styled-components, there continues to be an enormous need to facilitate customization.

If you are interested in an analysis of the growing and decreasing pain, you can [head to the appendix](https://mui-org.notion.site/Raw-data-aa374141dcb3453dbfea301dcc437126#30728bf1bc8d4f70a1739fa20f11459a).

<details>
  <summary>Click to see the breakdown of categories.</summary>
  <table>
    <tr><th style="width: 40px;">329</th><th style="width: 700px;">docs</th></tr>
    <tr><th>72</th><th>docs - ?</th></tr>
    <tr><td>62</td><td>docs - more examples</td></tr>
    <tr><td>29</td><td>docs - more templates</td></tr>
    <tr><td>28</td><td>docs - beginner friendly</td></tr>
    <tr><td>28</td><td>docs - tutorials</td></tr>
    <tr><td>19</td><td>docs - API</td></tr>
    <tr><td>19</td><td>docs - custom design system</td></tr>
    <tr><td>16</td><td>docs - more comprehensive</td></tr>
    <tr><td>15</td><td>docs - content quality</td></tr>
    <tr><td>9</td><td>docs - organization</td></tr>
    <tr><td>8</td><td>docs - smaller demos</td></tr>
    <tr><td>6</td><td>docs - content translation</td></tr>
    <tr><td>5</td><td>docs - search</td></tr>
    <tr><td>4</td><td>docs - slow to navigate</td></tr>
    <tr><td>3</td><td>docs - link to source</td></tr>
    <tr><td>3</td><td>docs - starter example</td></tr>
    <tr><td>3</td><td>docs - integration with third-parties</td></tr>
    <tr><td>1</td><td>docs - visual component discovery</td></tr>
    <tr><th>300</th><th>more components</th></tr>
    <tr><td>145</td><td>more components - ?</td></tr>
    <tr><td>26</td><td>more components - form</td></tr>
    <tr><td>21</td><td>more components - charts</td></tr>
    <tr><td>17</td><td>more components - carousel</td></tr>
    <tr><td>12</td><td>more components - lab to core</td></tr>
    <tr><td>9</td><td>more components - enterprise apps</td></tr>
    <tr><td>8</td><td>more components - upload</td></tr>
    <tr><td>7</td><td>more components - big calendar</td></tr>
    <tr><td>7</td><td>more components - drag and drop</td></tr>
    <tr><td>6</td><td>more components - MUI X Pro</td></tr>
    <tr><td>5</td><td>more components - navbar</td></tr>
    <tr><td>5</td><td>more components - image</td></tr>
    <tr><td>4</td><td>more components - inputs</td></tr>
    <tr><td>4</td><td>more components - rich text editor</td></tr>
    <tr><td>3</td><td>more components - MUI X</td></tr>
    <tr><td>2</td><td>more components - layout</td></tr>
    <tr><td>2</td><td>more components - number input</td></tr>
    <tr><td>2</td><td>more components - speed to release it</td></tr>
    <tr><td>2</td><td>more components - virtualization</td></tr>
    <tr><td>1</td><td>more components - color picker</td></tr>
    <tr><td>1</td><td>more components - data display</td></tr>
    <tr><td>1</td><td>more components - link</td></tr>
    <tr><td>1</td><td>more components - loading button</td></tr>
    <tr><td>1</td><td>more components - maps</td></tr>
    <tr><td>1</td><td>more components - mobile</td></tr>
    <tr><td>1</td><td>more components - nested menu</td></tr>
    <tr><td>1</td><td>more components - OTP</td></tr>
    <tr><td>1</td><td>more components - photo viewer</td></tr>
    <tr><td>1</td><td>more components - scrollspy</td></tr>
    <tr><td>1</td><td>more components - slider</td></tr>
    <tr><td>1</td><td>more components - time picker</td></tr>
    <tr><td>1</td><td>more components - tree select</td></tr>
    <tr><th>265</th><th>customization</th></tr>
    <tr><td>71</td><td>customization - ?</td></tr>
    <tr><td>69</td><td>customization - easier</td></tr>
    <tr><td>44</td><td>customization - docs</td></tr>
    <tr><td>27</td><td>customization - improve custom themes</td></tr>
    <tr><td>26</td><td>customization - color</td></tr>
    <tr><td>25</td><td>customization - theming</td></tr>
    <tr><td>3</td><td>customization - theme gallery (coming from the community)</td></tr>
    <tr><th>212</th><th>system</th></tr>
    <tr><td>37</td><td>system - ?</td></tr>
    <tr><td>36</td><td>system - makeStyles back</td></tr>
    <tr><td>20</td><td>system - docs</td></tr>
    <tr><td>15</td><td>system - SASS</td></tr>
    <tr><td>11</td><td>system - interoperability with Tailwind CSS</td></tr>
    <tr><td>14</td><td>system - simplify</td></tr>
    <tr><td>8</td><td>system - CSS variables</td></tr>
    <tr><td>7</td><td>system - interoperability</td></tr>
    <tr><td>7</td><td>system - no CSS-in-JS runtime</td></tr>
    <tr><td>6</td><td>system - CSS modules</td></tr>
    <tr><td>6</td><td>system - dark mode</td></tr>
    <tr><td>6</td><td>system - utility class names</td></tr>
    <tr><td>5</td><td>system - verbosity</td></tr>
    <tr><td>5</td><td>system - performance</td></tr>
    <tr><td>4</td><td>system - CSS API</td></tr>
    <tr><td>4</td><td>system - styled-components</td></tr>
    <tr><td>3</td><td>system - generated classes</td></tr>
    <tr><td>3</td><td>system - variant</td></tr>
    <tr><td>3</td><td>system - CSS that can be shared outside of React</td></tr>
    <tr><td>3</td><td>system - state customization</td></tr>
    <tr><td>3</td><td>system - theme</td></tr>
    <tr><td>1</td><td>system - inline styling</td></tr>
    <tr><td>1</td><td>system - decide on styling solution</td></tr>
    <tr><td>1</td><td>system - duplicate CSS properties</td></tr>
    <tr><td>1</td><td>system - transient props</td></tr>
    <tr><td>1</td><td>system - typescript intellisense</td></tr>
    <tr><td>1</td><td>system - use more sx oversyled</td></tr>
    <tr><th>172</th><th>design</th></tr>
    <tr><td>51</td><td>design - provide more themes (not just Material Design)</td></tr>
    <tr><td>28</td><td>design - make the default theme look & feel better</td></tr>
    <tr><td>27</td><td>design - push @mui/base more</td></tr>
    <tr><td>24</td><td>design - Material Design v3</td></tr>
    <tr><td>13</td><td>design - drop Material Design</td></tr>
    <tr><td>10</td><td>design - ?</td></tr>
    <tr><td>7</td><td>design - denser UI for enterprise apps</td></tr>
    <tr><td>6</td><td>design - block templates</td></tr>
    <tr><td>3</td><td>design - responsiveness</td></tr>
    <tr><td>2</td><td>design - mobile</td></tr>
    <tr><td>1</td><td>design - color gradients</td></tr>
    <tr><th>109</th><th>performance</th></tr>
    <tr><td>46</td><td>performance - bundle size</td></tr>
    <tr><td>36</td><td>performance - ?</td></tr>
    <tr><td>16</td><td>performance - runtime</td></tr>
    <tr><td>4</td><td>performance - fewer DOM node/React components</td></tr>
    <tr><td>2</td><td>performance</td></tr>
    <tr><td>2</td><td>performance - docs</td></tr>
    <tr><td>1</td><td>performance - animations</td></tr>
    <tr><td>1</td><td>performance - in dev mode</td></tr>
    <tr><td>1</td><td>performance - unecesseary prefixes</td></tr>
    <tr><th>97</th><th>DX</th></tr>
    <tr><td>27</td><td>DX - simpler</td></tr>
    <tr><td>20</td><td>DX - API</td></tr>
    <tr><td>17</td><td>DX - higher-level component API</td></tr>
    <tr><td>6</td><td>DX - lower-level component API</td></tr>
    <tr><td>5</td><td>DX - import</td></tr>
    <tr><td>5</td><td>DX - lightweight</td></tr>
    <tr><td>3</td><td>DX - debugging</td></tr>
    <tr><td>2</td><td>DX - boilerplate</td></tr>
    <tr><td>2</td><td>DX - fewer packages</td></tr>
    <tr><td>2</td><td>DX - expose hooks</td></tr>
    <tr><td>1</td><td>DX - class names</td></tr>
    <tr><td>1</td><td>DX - ?</td></tr>
    <tr><td>1</td><td>DX - composability</td></tr>
    <tr><td>1</td><td>DX - faster releases</td></tr>
    <tr><td>1</td><td>DX - fewer releases</td></tr>
    <tr><td>1</td><td>DX - helper functions</td></tr>
    <tr><td>1</td><td>DX - versioning</td></tr>
    <tr><td>1</td><td>DX - vscode plugin</td></tr>
    <tr><th>75</th><th>data grid</th></tr>
    <tr><td>62</td><td>data grid - ?</td></tr>
    <tr><td>3</td><td>data grid - docs</td></tr>
    <tr><td>2</td><td>data grid - excel</td></tr>
    <tr><td>1</td><td>data grid - bundle size</td></tr>
    <tr><td>1</td><td>data grid - column pinning</td></tr>
    <tr><td>1</td><td>data grid - filtering</td></tr>
    <tr><td>1</td><td>data grid - full screen</td></tr>
    <tr><td>1</td><td>data grid - grouping</td></tr>
    <tr><td>1</td><td>data grid - large dataset</td></tr>
    <tr><td>1</td><td>data grid - master panel</td></tr>
    <tr><td>1</td><td>data grid - nesting - export options</td></tr>
    <tr><th>61</th><th>free vs. paid</th></tr>
    <tr><td>18</td><td>free vs. paid - all MIT</td></tr>
    <tr><td>8</td><td>free vs. paid - cheaper Pro plan</td></tr>
    <tr><td>8</td><td>free vs. paid - no existing features going paid</td></tr>
    <tr><td>7</td><td>free vs. paid - more MIT</td></tr>
    <tr><td>6</td><td>free vs. paid - data grid more MIT</td></tr>
    <tr><td>5</td><td>free vs. paid - no Pro plan (premium can stay)</td></tr>
    <tr><td>4</td><td>free vs. paid - date picker more MIT</td></tr>
    <tr><td>2</td><td>free vs. paid - remove docs ads</td></tr>
    <tr><td>1</td><td>free vs. paid - cheaper Premium plan</td></tr>
    <tr><td>1</td><td>free vs. paid - design kit more MIT</td></tr>
    <tr><td>1</td><td>free vs. paid - use donations</td></tr>
    <tr><th>61</th><th>fewer breaking changes</th></tr>
    <tr><th>47</th><th>typescript</th></tr>
    <tr><td>28</td><td>typescript - ?</td></tr>
    <tr><td>11</td><td>typescript - faster check</td></tr>
    <tr><td>5</td><td>typescript - docs</td></tr>
    <tr><td>2</td><td>typescript - more support</td></tr>
    <tr><td>1</td><td>typescript - converter</td></tr>
    <tr><td>1</td><td>typescript - intellisense</td></tr>
    <tr><th>41</th><th>date picker</th></tr>
    <tr><td>18</td><td>date picker - ?</td></tr>
    <tr><td>5</td><td>date picker - make stable</td></tr>
    <tr><td>3</td><td>date picker - range selection</td></tr>
    <tr><td>2</td><td>date picker - bugs</td></tr>
    <tr><td>2</td><td>date picker - single range input</td></tr>
    <tr><td>2</td><td>date picker - time clock is hideous</td></tr>
    <tr><td>2</td><td>date picker - customizability</td></tr>
    <tr><td>1</td><td>date picker - dayjs</td></tr>
    <tr><td>1</td><td>date picker - add range</td></tr>
    <tr><td>1</td><td>date picker - design</td></tr>
    <tr><td>1</td><td>date picker - docs</td></tr>
    <tr><td>1</td><td>date picker - keyboard</td></tr>
    <tr><td>1</td><td>date picker - locales</td></tr>
    <tr><td>1</td><td>date picker - rewrite</td></tr>
    <tr><th>26</th><th>community</th></tr>
    <tr><td>14</td><td>community - nurture</td></tr>
    <tr><td>9</td><td>community - support</td></tr>
    <tr><td>2</td><td>community - release communication</td></tr>
    <tr><td>1</td><td>community - v4 support</td></tr>
    <tr><th>20</th><th>icons</th></tr>
    <tr><td>12</td><td>icons - more</td></tr>
    <tr><td>3</td><td>icons - ?</td></tr>
    <tr><td>1</td><td>icons - animation</td></tr>
    <tr><td>1</td><td>icons - built-in</td></tr>
    <tr><td>1</td><td>icons - dynamic loading</td></tr>
    <tr><td>1</td><td>icons - fontawesome</td></tr>
    <tr><td>1</td><td>icons - other libraries</td></tr>
    <tr><th>19</th><th>accessibility</th></tr>
    <tr><td>9</td><td>accessibility - implementation</td></tr>
    <tr><td>6</td><td>accessibility - docs</td></tr>
    <tr><td>2</td><td>accessibility - ?</td></tr>
    <tr><td>2</td><td>accessibility - full audit</td></tr>
    <tr><th>15</th><th>react native</th></tr>
    <tr><th>10</th><th>low-code</th></tr>
    <tr><td>7</td><td>low-code - design system creator</td></tr>
    <tr><td>2</td><td>low-code - generate code from design files</td></tr>
    <tr><td>1</td><td>low-code - UI builder</td></tr>
    <tr><th>10</th><th>more opinionated</th></tr>
    <tr><th>9</th><th>animations</th></tr>
    <tr><td>6</td><td>animations - new API</td></tr>
    <tr><td>1</td><td>animations - Framer Motion</td></tr>
    <tr><td>1</td><td>animations - on existing components</td></tr>
    <tr><td>1</td><td>animations - performance</td></tr>
    <tr><th>7</th><th>fix more bugs</th></tr>
    <tr><th>7</th><th>support other frameworkds (for example Vue)</th></tr>
    <tr><th>5</th><th>autocomplete</th></tr>
    <tr><td>3</td><td>autocomplete - ?</td></tr>
    <tr><td>1</td><td>autocomplete - abbreviation</td></tr>
    <tr><td>1</td><td>autocomplete - consistency with text field</td></tr>
    <tr><th>4</th><th>legacy browser support</th></tr>
    <tr><th>3</th><th>components consistency</th></tr>
    <tr><th>2</th><th>less opinionanted</th></tr>
    <tr><th>2</th><th>fix RTL</th></tr>
    <tr><th>2</th><th>class components</th></tr>
  </table>
</details>

<!-- vale MUI.CorrectReferenceAllCases = YES -->

Have ideas for improvements? Please share them with us! Here's how to make sure that your requests get top priority:

- When you create an issue to request features or components in the MUI Core or MUI X repositories, we'll label it as `Waiting for upvotes`.
  The more votes your issue receives, the higher a priority it will become—so make sure to structure, research, and justify your request so it resonates with other community members.
- When requesting a new component, make sure to benchmark existing implementations of it in the wild so we can see what works and what we could improve on.
- Try to explain the problem you're having as clearly as possible — it's often the case that we already have a component to solve it.
- If you're requesting easier customization, make sure to demonstrate the desired outcome, and explain where you're having trouble in as much detail as you can.
  These requests often highlight opportunities for us to improve our documentation.

## Your product

### What were you primarily using before MUI?

<img src="/static/blog/2021-developer-survey-results/7.png" width="2400" height="1256" loading="lazy" alt="Bootstrap: 40.6%; Started with MUI: 37.4%; Tailwind:: 4.8%; Ant Design: 4.8%; Angular Material: 4%; Semantic-UI: 4%; Other: 3.8%; Chakra UI: 0.7%" />

<p class="blog-description">1389 of 1589 answered.</p>

These results are not too different from last year, with the exception that far more developers reported starting with MUI (13% in 2020, and 37% in 2021).
It's very encouraging to know that so many of you are building your products with MUI right from the start!

### Are you using any of these in addition to MUI?

<img src="/static/blog/2021-developer-survey-results/8.png" width="2400" height="1256" loading="lazy" alt="Nope, just MUI: 70.7%; Tailwind: 10.3%; Bootstrap: 9.8%; Ant Design: 4%; Semantic-UI: 1.7%; Other: 1.6%; Chakra UI: 1.2%; Angular Material: 0.8%" />

<p class="blog-description">1468 out of 1589 answered.</p>

We're glad to see that MUI largely covers all of your needs for a component UI library—this is a major priority for us.

### Who are you building for?

<img src="/static/blog/2021-developer-survey-results/9.png" width="2400" height="1256" loading="lazy" alt="For the company I work at: 65.6%; For my personal side project: 20.8%; For a client: 12.9%; Other: 0.7%" />

<p class="blog-description">1523 out of 1589 answered.</p>

When compared with last year's results, client work and personal projects have swapped places this year.
Maybe v5 got developers interested enough to try it on their own sites and apps? It's interesting to see, in any case.

### Who do you collaborate most with?

<img src="/static/blog/2021-developer-survey-results/10.png" width="2400" height="1256" loading="lazy" alt="Other developers: 67.2%; Designers: 34.3%; Product managers: 29.2%; No one, it's just me: 28.9%; Other: 0.9%" />

<p class="blog-description">1527 out of 1589 answered.</p>

This is a new question in our annual survey, and the results highlight the fact that our documentation is not just for developers.
It's crucial for our docs—and even the code itself—to be easily understood by designers, product managers, and other less technical team members who may be stakeholders in engineering projects.

### How many web applications did you or your team deliver using MUI this year?

<img src="/static/blog/2021-developer-survey-results/11.png" width="2400" height="1256" loading="lazy" alt="0-1: 494; 2-3: 381; 4-5: 122; 6-10: 26; 10+: 28" />

<p class="blog-description">1051 out of 1589 answered.</p>

Roughly half (47%) of those who responded to this question shipped one app or simply maintained an existing app.
Impressively, 5% of respondents delivered six or more apps, and more than half of those surpassed 10!

### Which MUI products do you use in your application?

<img src="/static/blog/2021-developer-survey-results/12.png" width="2400" height="1256" loading="lazy" alt="MUI Core: MIT licensed foundational components, right now available with Material Design: 96.6%; MUI X: collection of advanced components available under MIT and commercial licenses: 14.7%; MIT License: 126 responses; Commercial licenses: 99 responses" />

<p class="blog-description">1551 out of 1589 answered.</p>

It's not surprising to find out that most of our user base is here for MUI Core.
But it is very encouraging for us to see such a high proportion of MUI X users operating with commercial licenses, and we are excited to continue expanding on our paid products for these users.

There are a lot of opportunities in the MUI X space to unpack.
Let's explore a little bit further below.

### Did you know what MUI X was prior to this survey?

<img src="/static/blog/2021-developer-survey-results/13.png" width="2400" height="1256" loading="lazy" alt="Yes: 54.5%; No: 45.5%" />

<p class="blog-description">1312 out of 1589 answered.</p>

A large chunk of you didn't know what MUI X is prior to the survey, which makes it clear that we still have a lot to do to expand its reach.

### Are you currently using any paid UI component library?

<img src="/static/blog/2021-developer-survey-results/14.png" width="2400" height="1256" loading="lazy" alt="Yes: 11.8%; No: 88.2%" />

<p class="blog-description">1584 out of 1589 answered.</p>

The results are not very different from last year, aside from a slight increase of respondents saying yes.
The majority of respondents don't use any paid libraries, but those who do are mostly using MUI X. This demonstrates that some of our assumptions and execution might be correct! Developers' needs appears to not be completely fulfilled by the OSS ecosystem.

### How can we improve the Data Grid for you?

<img src="/static/blog/2021-developer-survey-results/15.png" width="2400" height="1256" loading="lazy" alt="Customizability: 21.9%; Cheaper Pro plan: 17.2%; More features: 12.5%; Fix features: 9.4%; Improve docs: 6.3%; Look & feel: 6.3%; Maintain it: 4.7%; Bugs: 3.1%; DX: MUI Core consistency: 3.1%; Performance: 3.1%; Transition: 3.1%; SSR: 1.6%" />

<p class="blog-description">64 out of 1589 answered.</p>

- **Customizability:** This is a common topic for us, and it comes up often when discussing MUI X.
  Your feedback tells us that we need to double down on our efforts to make customization easier.
  We also recognize that we are still lacking some important documentation around theming, and headless APIs.
- **Cheaper Pro plan:** We know it can be out of range for a lot of developers, and that's why the free version is already packed with many features.
  MUI mainly develops open-source software, and we deeply value the OSS ethos of freely sharing what we build so that others can use it and improve upon it.
  - The price of our Pro plan positions it as a product intended for use by teams at professional organizations.
    That said, many who left feedback on the price are individuals, so there might be an opportunity to expand our offerings for those not backed by their company.
- **More features & feature fixes:** Collapsible rows, column resizing, and features for ERP apps were some of the features requested.
  And regarding features to fix, the most common requests were pagination with REST APIs, backend filtering, and cell editor.
- **Improvements to the documentation:** The data grid docs could certainly use a major overhaul—we're working on it.
- **Improvements to the look and feel:** Data grid builders want more default design options beyond Material.
  In terms of UX improvements, many developers mention the filtering experience specifically.

<details>
  <summary>Click to see the breakdown of categories.</summary>
  <table>
    <tr><th style="width: 40px;">14</th><th style="width: 700px;">customizability</th></tr>
    <tr><td>9</td><td>customizability - style</td></tr>
    <tr><td>3</td><td>customizability - ?</td></tr>
    <tr><td>2</td><td>customizability - docs</td></tr>
    <tr><th>11</th><th>cheaper Pro plan</th></tr>
    <tr><th>8</th><th>more features</th></tr>
    <tr><td>3</td><td>more features - ?</td></tr>
    <tr><td>2</td><td>more features - master detail</td></tr>
    <tr><td>1</td><td>more features - row editing</td></tr>
    <tr><td>1</td><td>more features - column pinning</td></tr>
    <tr><td>1</td><td>more features - column resizing</td></tr>
    <tr><th>6</th><th>fix features</th></tr>
    <tr><td>3</td><td>fix features - filtering</td></tr>
    <tr><td>1</td><td>fix features - editing</td></tr>
    <tr><td>1</td><td>fix features - pagination</td></tr>
    <tr><td>1</td><td>fix features - server-side</td></tr>
    <tr><th>5</th><th>docs</th></tr>
    <tr><td>4</td><td>docs - ?</td></tr>
    <tr><td>1</td><td>docs - more examples</td></tr>
    <tr><th>4</th><th>look and feel</th></tr>
    <tr><th>3</th><th>maintain it</th></tr>
    <tr><th>2</th><th>bugs</th></tr>
    <tr><th>2</th><th>DX - MUI Core consistency</th></tr>
    <tr><th>2</th><th>performance</th></tr>
    <tr><th>2</th><th>translation</th></tr>
    <tr><th>1</th><th>a11y</th></tr>
    <tr><th>1</th><th>easier installation</th></tr>
    <tr><th>1</th><th>fewer breaking changes</th></tr>
    <tr><th>1</th><th>hook-only API</th></tr>
    <tr><th>1</th><th>SSR</th></tr>
  </table>
</details>

### How can we improve Data Grid Pro for you?

<img src="/static/blog/2021-developer-survey-results/16.png" width="2400" height="1256" loading="lazy" alt="More features: 39.8%; Customizability: 20.4%; Fix features: 15.1%; Performance: 5.4%; Cheaper Premium plan: 3.2%; Improve docs: 3.2%; DX - API: 2.2%; LGPL license: 2.2%; More components: 2.2%" />

<p class="blog-description">75 out of 1589 answered.</p>

- **More features:** [Grouping](/x/react-data-grid/row-grouping/) was the most requested feature for the Data Grid Pro, followed by [master detail](/x/react-data-grid/master-detail/), aggregation, search, [tree data](/x/react-data-grid/tree-data/), and [column pinning](/x/react-data-grid/column-pinning/).
  We've already released some of these in the time it took us to analyze the survey results.
  Check the links to see their docs and demos.
  Alternatively, you can follow [the public roadmap](https://github.com/orgs/mui/projects/35) to see when the others will land.
- **Customizability:** The majority of requests about customizability were asking for possibilities to tweak data grid interactions, which we need to delve into more deeply to better understand.
  Following next were requests for more style customizability, and more documentation on customization.
- **Fix features:** Filtering got first place as the most requested feature to fix on Data Grid Pro.
  Following next were lazy loading and server-side rendering support.
- **Performance:** Requests about performance were mostly spread out between runtime and bundle size.
  We must admit that we have put almost no effort into optimizing the bundle size so far.
  There is likely some low-hanging fruit there.

<details>
  <summary>Click to see the breakdown of categories.</summary>
  <table>
    <tr><th style="width: 40px;">37</th><th style="width: 700px;">more features</th></tr>
    <tr><td>6</td><td>more features - grouping</td></tr>
    <tr><td>6</td><td>more features - master detail</td></tr>
    <tr><td>6</td><td>more features - roadmap</td></tr>
    <tr><td>4</td><td>more features - ?</td></tr>
    <tr><td>3</td><td>more features - aggregation</td></tr>
    <tr><td>3</td><td>more features - search</td></tr>
    <tr><td>3</td><td>more features - tree data</td></tr>
    <tr><td>2</td><td>more features - column pinning</td></tr>
    <tr><td>2</td><td>more features - pivot</td></tr>
    <tr><td>1</td><td>more features - excel</td></tr>
    <tr><td>1</td><td>more features - row reordering</td></tr>
    <tr><th>19</th><th>customizability</th></tr>
    <tr><td>7</td><td>customizability - behavior</td></tr>
    <tr><td>5</td><td>customizability - style</td></tr>
    <tr><td>4</td><td>customizability - docs</td></tr>
    <tr><td>2</td><td>customizability - ?</td></tr>
    <tr><td>1</td><td>customizability - charts in cells</td></tr>
    <tr><th>14</th><th>fix features</th></tr>
    <tr><td>10</td><td>fix features - filtering</td></tr>
    <tr><td>2</td><td>fix features - lazy loading</td></tr>
    <tr><td>2</td><td>fix features - server-side</td></tr>
    <tr><th>5</th><th>performance</th></tr>
    <tr><td>3</td><td>performance - ?</td></tr>
    <tr><td>1</td><td>performance - bundle size</td></tr>
    <tr><td>1</td><td>performance - runtime</td></tr>
    <tr><th>4</th><th>docs</th></tr>
    <tr><td>3</td><td>docs - ?</td></tr>
    <tr><td>1</td><td>docs - more examples</td></tr>
    <tr><th>3</th><th>cheaper premium plan</th></tr>
    <tr><th>2</th><th>bugs</th></tr>
    <tr><th>2</th><th>DX - API</th></tr>
    <tr><th>2</th><th>LGPL License</th></tr>
    <tr><th>2</th><th>more components - treeview</th></tr>
    <tr><th>2</th><th>overflow text</th></tr>
    <tr><th>1</th><th>DX - MUI Core consistency</th></tr>
    <tr><th>1</th><th>UX</th></tr>
  </table>
</details>

### What were you using before the data grid?

<img src="/static/blog/2021-developer-survey-results/17.png" width="2400" height="1256" loading="lazy" alt="In house: 29.9%; MUI Table: 17.9%; Nothing: 7.5%; material-table: 6%; material-datatables: 6%; Sencha: 6%; Kendo UI: 4.5%; react-table: 4.5%; Bootstrap Table: 3%; AG Grid: 3%; datatables.net: 3%; JSP: 1.5%" />

<p class="blog-description">149 out of 1589 answered.</p>

It's interesting to see that a lot of you are building your own in-house data grids.
We'd love to know more about why your team made this choice, especially because we know exactly how much work it can be.
Also, it's refreshing to see that the standard MUI table components are adequate for many of you.

### What are you building?

<img src="/static/blog/2021-developer-survey-results/18.png" width="2400" height="1256" loading="lazy" alt="Dashboard admin applications: 26.3%; Enterprise applications: 25.9%; A custom design system: 9.7%; Landing page: 8.1%; E-commerce application: 7.8%; Personal website/portfolio: 6.9%; CMS: 6.1%; Just playing with tech: 4.6%; Blog: 2.8%; Other: 1.4%" />

Enterprise, dashboard applications, and design systems continue to be in the top 3, similar to last year.
What's changed is that developers are now using MUI more to build e-commerce apps and portfolios, which is pretty cool.
We'd love to see them! Feel free to share in the ["Who's using Material UI?" issue](https://github.com/mui/material-ui/issues/22426).

### What delivery mechanisms are you using?

<img src="/static/blog/2021-developer-survey-results/19.png" width="2400" height="1256" loading="lazy" alt="Single-page app (Create React App, etc): 74.7%; Server-side rendered website (Next.js, Gastby, etc): 20.8%; Desktop app (Electron, etc): 3.5%; Native mobile app (Cordova, etc): 0.6%; Other: 0.4%" />

<p class="blog-description">1509 out of 1589 answered.</p>

### What type system are you using?

<img src="/static/blog/2021-developer-survey-results/20.png" width="2400" height="1256" loading="lazy" alt="TypeScript: 63.8%; None: 18%; prop-types: 16.6%; Flow: 1.4%; Other: 0.2%" />

<p class="blog-description">1501 out of 1589 answered.</p>

These results are very different from last year—TypeScript took off, and it's now the primary type system used out there.

### Which framework are you using, if any?

<img src="/static/blog/2021-developer-survey-results/21.png" width="2400" height="1256" loading="lazy" alt="Create React App: 62.4%; Next.js: 21.9%; Custom webpack: 10.7%; None: 2.6%; Gatsby: 0.9%; Other: 1.5%" />

<p class="blog-description">1497 out of 1589 answered.</p>

This year we saw a considerable bump the use of Next.js (compared with 12.4% in 2020), which is not surprising due to its increasing popularity and the advancements it gained in 2021.

### What styling solution are you using?

<img src="/static/blog/2021-developer-survey-results/22.png" width="2400" height="1256" loading="lazy" alt="MUI Core v4 (JSS): 45%; Styled components: 37.9%; Emotion: 30.2%; SASS: 20.8%; CSS Modules: 18.9%; Vanilla CSS: 17.6%; Tailwind CSS: 9.1%; Stitches: 0.4%; Other: 1.2%" />

<p class="blog-description">1492 out of 1589 answered.</p>

As the MUI Core v5 release is relatively recent, we expect to see many developers still using JSS, and there will probably always be some of you who prefer it.

But the growth of Emotion and styled-components here is noteworthy, because they are what our new styling solution is based on.
This year we'll be focusing on expanding and refining [MUI System](/system/getting-started/the-sx-prop/) to further improve upon this new styling solution.

### Did you recently migrate to MUI Core v5?

<img src="/static/blog/2021-developer-survey-results/23.png" width="2400" height="1256" loading="lazy" alt="Yes: 63.3%; No: 36.7%" />

<p class="blog-description">1546 out of 1589 answered.</p>

Though many of you who answered the survey have already migrated, we still have many more to convince to come along with us.
For the year ahead we'll focus strongly on refining the documentation, and improving automation tools.

### What's the statement that most defines your migration experience?

<img src="/static/blog/2021-developer-survey-results/24.png" width="2400" height="1256" loading="lazy" alt="It was tricky but MUI's documentation and resources helped me to get it right: 43%; It was smooth and it is now working fine: 38.5%; It wasn't good, I had many problems and it took me a long time to finish: 14.3%; It was bad and I ended up regretting it: 2.8%; Other: 1.4%" />

<p class="blog-description">930 out of 1589 answered.</p>

### What could MUI do to improve the migration experience?

<img src="/static/blog/2021-developer-survey-results/25.png" width="2400" height="1256" loading="lazy" alt="General documentation improvements: 43.2%; Automation: 20.7%: Fewer breaking changes: 15.6%; Fewer styling solution breaking changes: 8.5%; More tutorials: 5.4%; More styling solution migration tutorial: 4.4%; Migrate Core and X together: 1%" />

<p class="blog-description">472 out of 1589 answered.</p>

- **General documentation improvement:** Documentation plays a huge part in defining the developer experience.
  We definitely need to refine our writing, provide more examples, and offer more beginner-friendly resources.
- **Automation:** We prepared codemods to help with the v5 migration, given the number of changes.
  This has been met with positive feedback, which is encouraging since it's our first time providing comprehensive tools to automate the migration process.
  However, it is becoming clear how and when the codemods weren't too effective, so we'll make sure to refine it more.

### Could you share the reason why you haven't migrated yet?

<img src="/static/blog/2021-developer-survey-results/26.png" width="2400" height="1256" loading="lazy" alt="No bandwidth: 28.4%; Started in v5: 14.6%; Afraid of amount of breaking changes: 12.3%; Already planned but haven't started: 9.5%; Missing incentive: 8.5%; Not a priority: 7.3%; Don't like new styling solution: 4%; Blocked by 3rd party dependencies: 3.3%; Didn't know about it: 3.3%; Migration is in process: 3.3%; Had regressions, therefore came back to v4: 1.3%; Waiting to become stable: 1.3%" />

<p class="blog-description">441 out of 1589 answered.</p>

- **No bandwidth / not a priority / blocked by third-party dependencies:** These reasons can all be lumped together as "forces beyond your control." That's to be expected, but we'll continue to do what we can to persuade your team to migrate, and to make the migration as smooth as possible when you're ready.
- **Afraid of the amount of breaking changes:** That fear is understandable, and we still have a great deal of work to do with documentation, automation, and other resources to help minimize the friction involved in migrating.
- **Don't like the new styling solution:** We believe that's totally fair.
  Not everyone will buy every move.
  However, as with any open-source project, you always have the opportunity to weigh in and leave your thoughts about any given endeavor we're considering.
  [The issue discussing the chosen styling solution](https://github.com/mui/material-ui/issues/22342) was a big one, and every contribution made a difference in the ultimate decision.
  Please don't hesitate to participate in these open discussions—especially if you see something you disagree with.
- **Didn't know about it:** That's something we really need to work on! We'll be exploring new ways to engage with our community in the coming months.
- **Regressions - had to go back to v4:** If this happens to you, please open an issue regarding the problems you're facing and we'll be happy to guide you.

### Have you, or anyone from your team, used any low-code tools for helping with the development of your product?

<img src="/static/blog/2021-developer-survey-results/27.png" width="2400" height="1256" loading="lazy" alt="Yes: 16.1%; No: 83.9%" />

<p class="blog-description">1542 out of 1589 answered.</p>

We see a lot of potential in low-code tools to reach a much wider audience beyond developers, for better collaboration and faster development.
Since our existing users are quite tech-literate people, it shouldn't be surprising that over 80% of you are not using low-code tools.
But for the 16% who said yes, we had the following questions.

### What did it help you build?

<img src="/static/blog/2021-developer-survey-results/28.png" width="2400" height="1256" loading="lazy" alt="An internal tool: 22.5%; Landing pages: 22.1%; Analytics dashboard: 17.6%; A design system: 15.6%; E-commerce storefront: 8.6%; A simple customer-facing mobile app: 6.6%; Other: 7%" />

<p class="blog-description">244 out of 1589 answered.</p>

MUI users are mainly working with low-code tools to build internal tools, landing pages, and analytics dashboards.
These findings align with what the rest of our users are building as well.
But it is great to see that there are low-code tools in the market that developers trust.

### If MUI considered building a low-code tool, what primary use case would match your needs?

<img src="/static/blog/2021-developer-survey-results/29.png" width="2400" height="1256" loading="lazy" alt="Deliver a React design system: 22.2%; Generate high-quality React codebase after visual building: 19.2%; Building dashboards for rapid data visualization: 18.3%; Higher fidelity prototyping and demoing for accurate design handoff: 13.6%; Building internal apps when pro-code is overkill: 11.4%; Shipping landing pages with my existing React design system: 7.3%; Shipping production simple apps before moving to pro-code: 6.2%; Other: 1.8%" />

<p class="blog-description">1200 out of 1589 answered.</p>

Developers are mostly interested in React design systems, codebase generators, tools for internal needs, data visualization, and prototyping.
These needs are both for internal and customer-facing use-cases.

## About you

### How did you first hear about MUI?

<img src="/static/blog/2021-developer-survey-results/30.png" width="2400" height="1256" loading="lazy" alt="Organic search: 57.8%; Word of mouth: 25.8%; Social media: 8.4%; Blog: 4.4%; Other: 3.5%" />

<p class="blog-description">1417 out of 1589 answered.</p>

### Which of the following best describes your current job role?

<img src="/static/blog/2021-developer-survey-results/31.png" width="2400" height="1256" loading="lazy" alt="Full-stack developer: 52.6%; Front-end developer: 30.5%; Entrepreneur (I do it all!): 7.5%; Beginner learning web development: 2.6%; Engineering Manager: 2.6%; Back-end developer: 1.1%; Designer: 1%; Product Manager: 0.7%; Other: 1.3%" />

<p class="blog-description">1497 out of 1589 answered.</p>

### How many total employees work at your current place of employment?

<img src="/static/blog/2021-developer-survey-results/32.png" width="2400" height="1256" loading="lazy" alt="0-1: 187; 2-10: 358; 11-20: 136; 21-50: 139; 51-100: 97; 100+: 305" />

<p class="blog-description">1222 out of 1589 answered.</p>

### How long have you been developing with JavaScript?

<img src="/static/blog/2021-developer-survey-results/33.png" width="2400" height="1256" loading="lazy" alt="Just getting started: 4.8%; 1 year +: 22.2%; 3 years +: 27.9%; 5 years +: 28.2%; 10 years +: 11.1%; 15 years +: 5.9%" />

<p class="blog-description">1520 out of 1589 answered.</p>

### How long have you been developing with React?

<img src="/static/blog/2021-developer-survey-results/34.png" width="2400" height="1256" loading="lazy" alt="Just getting started: 7%; 6 months +: 11%; 1 year +: 20.6%; 2 years +: 21.2%; 3 years +: 27.1%; 5 years +: 11.5%; Bleeding edge baby! 6 years +: 1.6%" />

<p class="blog-description">1523 out of 1589 answered.</p>

### How long have you been developing with MUI?

<img src="/static/blog/2021-developer-survey-results/35.png" width="2400" height="1256" loading="lazy" alt="Just getting started: 16.6%; 6 months +: 19.4%; 1 year +: 24.4%; 2 years +: 21.2%; 3 years +: 15.6%; I'm a pioneer! 5 years +: 2.8%" />

<p class="blog-description">1519 out of 1589 answered.</p>

## Conclusion

The annual survey is one of the most important resources we have for deciding on our next steps.
We appreciate all the time you invested in answering our questions, and we can't stress enough how much we value your input.

In 2021, we released the largest update that MUI has ever seen.
We also began investing in complementary products, such as [MUI X](/x/), our [design kits](/design-kits/), and [premium templates](/templates/).

Your feedback from this survey helped us to better understand the areas where we need to improve:

- **Documentation:** You've asked for more examples, more tutorials, more learning materials, and more comprehensive docs.
  Most third-party content about Material UI became outdated with the release of v5, so we have much work to do to pick up the slack.
- **Customization:** A new styling tool was an important step in the right direction for more customizability.
  We recognize that there are still many more opportunities to improve the experience of customizing MUI components.
- **Design quality:** Design continues to be the main driving aspect that guides a decision towards a given component library.
  A growing number of developers are moving away from MUI because of Material Design being the only design direction provided out-of-the-box, and that's a huge warning sign for us to explore other roads.
- **Breaking changes:** The need for fewer breaking changes does highlight one very positive point: numerous applications depend on MUI as their component library of choice.
  To continue supporting your products, we'll look for ways to minimize the number of breaking changes in future updates.
  We'll also continue exploring automation tools to ease the pain of any breaking changes that do come up.
- **Commercial vs.
  MIT balance:** MUI will always be an OSS project first and foremost, but we are getting a lot of positive feedback from our paid products and support services, which tells us that we're heading in the right direction.
  We are rapidly expanding our team to better address the needs of all of our users, and we look forward to making both our MIT-licensed and commercial offerings even more robust and compelling. If you want to understand more about our view of the MIT/open-source balance, check our [Stewardship page](https://mui-org.notion.site/Stewardship-542a2226043d4f4a96dfb429d16cf5bd).
- **Performance:** We're still looking for the most effective ways to optimize performance.
  TypeScript has potential, and MUI System's speed needs work.
  This is especially [important for mobile experiences](https://www.youtube.com/watch?v=mLjxXPHuIJo&t=76s).
  We welcome your suggestions!

If you want to continue to influence our roadmap, you can visit the [Material UI](https://github.com/mui/material-ui) and [MUI X](https://github.com/mui/mui-x) repositories, open issues, upvote the ones you're most interested in, or leave your thoughts about anything else you want to be improved. We'd love to hear from you.

<video autoplay muted loop playsinline width="2914" height="1440">
  <source src="/static/blog/2019-developer-survey-results/vote.mp4" type="video/mp4" />
</video>

<p class="blog-description">Help us prioritize by upvoting.</p>

Thanks again and until the next survey!

### Read more

Here is some additional content related to the topics covered throughout this post:

- [How to migrate from v4 to v5](/material-ui/migration/migration-v4/)
- [Style library interoperability](/material-ui/integrations/interoperability/)
- [Approaches to customizing Material UI components](/material-ui/customization/how-to-customize/)

Lastly, check out the last two iterations on the MUI Developer Survey:

- [2020 edition](/blog/2020-developer-survey-results/)
- [2019 edition](/blog/2019-developer-survey-results/)
