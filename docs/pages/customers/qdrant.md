---
title: Qdrant
description: Accelerating feature delivery as a rising vector database provider.
image: '/static/branding/companies/qdrant_spotlight.svg'
tags: ['MUI X']
rank: '1'
manualCard: true
---

<style>
  #blog-responsive-image {
    height: 230px;
    @media (max-width: 600px) {
      height: 167px;
    }
  }
  blockquote::before {
    content: none;
  }
</style>

# Qdrant | Accelerating feature delivery as a rising vector database provider

<img
  id="blog-responsive-image"
  src="/static/branding/companies/headers/qdrant-header.png"
  alt="Qdrant logo"
  style="width: 100%; height: auto; object-fit: cover; object-position: top left; border: 0px; margin-left: 0; margin-bottom: 20px; display: block; text-align: left;"
/>

## Overview

[Qdrant](https://qdrant.tech/) is an open-source vector database provider with over 25k GitHub stars. Thousands of companies use Qdrant to make sense of their unstructured data through advanced search, recommendation, and other AI capabilities. After a $30M Series-A funding, Qdrant needed to transition into a sustainable business.

Their frontend team uses Material UI across all of their products, websites, and dashboards.
After starting with MUI's open-source components, Qdrant upgraded to a perpetual Pro license for the Date Range Picker, with further plans to explore Data Grid and Charts.

<span class="only-light-mode">
<blockquote style="margin: 32px 0; padding: 24px 32px; background: #f5f5f7; border-left: 6px solid var(--muidocs-palette-primary-main); border-radius: 8px; font-size: 1.15rem; font-style: italic;">
  Having built a date range picker from scratch before, I know firsthand how challenging and time-consuming it can be—it's truly a nightmare. I decided to use the MUI X date range picker. I simply read the documentation, plugged it in, and it worked seamlessly. Honestly, it was a delight.
  <br>
  <span style="display: block; margin-top: 12px; font-size: 1rem; font-style: normal; color: #555; font-weight: 500;">
    – <a href="https://www.linkedin.com/in/josep-fornies-escola/" target="_blank">Josep Fornies</a>, Senior Frontend Developer
  </span>
</blockquote>
</span>

<span class="only-dark-mode">
<blockquote style="margin: 32px 0; padding: 24px 32px; background: var(--muidocs-palette-background-default); border-left: 6px solid var(--muidocs-palette-primary-main); color: #f5f5f7; border-radius: 8px; font-size: 1.15rem; font-style: italic;">
  Having built a date range picker from scratch before, I know firsthand how challenging and time-consuming it can be—it's truly a nightmare. I decided to use the MUI X date range picker. I simply read the documentation, plugged it in, and it worked seamlessly. Honestly, it was a delight.
  <br>
  <span style="display: block; margin-top: 12px; font-size: 1rem; font-style: normal; color: #bbb; font-weight: 500;">
    – <a href="https://www.linkedin.com/in/josep-fornies-escola/" target="_blank">Josep Fornies</a>, Senior Frontend Developer
  </span>
</blockquote>
</span>

## Challenge

As a startup in the competitive vector database space, Qdrant faced several critical challenges:

- Speed-to-market pressure – The team needed to "move fast and break things" while building their core product. Fast prototyping and rapid development cycles were essential to stay competitive and meet growing customer demands.

- Limited date selection functionality – Their existing date selection interface was restrictive, offering only presets for periods like a month, a week, or a day. This limitation prevented users from performing granular, custom date-based queries on their vector data—a critical requirement for enterprise customers.

- JavaScript date complexity – Joseph, a frontend developer at Qdrant, described implementing custom date pickers from scratch as "a nightmare" due to the inherent complexity of JavaScript date handling. The team needed a robust, battle-tested solution rather than building on their own.

- Design consistency – With a small team of developers and limited design resources, maintaining a cohesive, professional interface across multiple products was challenging.

## Solution

Qdrant adopted Material UI as their primary frontend component library, leveraging both open-source and Pro components:

- Comprehensive component usage – The team had prior experience with Material UI from their previous projects and choosing it again was a no-brainer. They implemented MUI components extensively across their entire product suite, using everything from primitive elements like appbars and menus to advanced components.

- Pro license upgrade – After recognizing the value of MUI's advanced components through the community plan, Qdrant purchased a perpetual Pro license specifically for the Date Range Picker, with plans to integrate Data Grid and Charts. The buying process was smooth and the team was able to get started quickly.

- Design system integration – The team utilized MUI's Figma design kit and theme extractor to streamline their design-to-development workflow. This allowed their limited design team to create consistent interfaces using pre-built components.

<img
  id="qdrant-ui"
  src="/static/branding/companies/qdrant_ui.png"
  alt=""
  style="width: 100%; height: auto; object-fit: cover; object-position: top left; border: 0px; margin-left: 0; margin-bottom: 20px; display: block; text-align: left;"
/>

In the image above from MUI's Qdrant dashboard (yes, we're their customer, too!), the MUI X Date Time Picker has been used to enable the date-time range selection functionality.

## Results

Qdrant achieved significant improvements in both development velocity and UX after adopting MUI.
The implementation of the Date Range Picker was quick and elevated their date selection interface from simple presets to a robust system with options like "last 5 minutes," "last 1 hour," "today," and fully custom date ranges.

The plug-and-play nature of MUI components greatly accelerated development by removing the pain and complexity of building custom solutions.
As Joseph noted, implementing date pickers from scratch would have been challenging, but with MUI, it was a matter of straightforward configuration and integration.

## Developer experience

Qdrant's development team consistently praised MUI's developer experience.
The team highlighted MUI's comprehensive documentation, well-documented APIs, and clear migration guides as standout features that accelerated their implementation process. They liked how the components work immediately with minimal configuration.

The team also appreciated the official MCP server from MUI, and said that it had enhanced agent–driven development. They were also introduced to MUI Chat, the latest AI product from MUI, which enables developers to build with MUI components using natural language prompts. The team agreed that this would accelerate their development speed even more.
The team appreciated having multiple support channels available, including GitHub for technical issues, Zendesk for billing support, and comprehensive online resources for general inquiries.

The success of MUI at Qdrant shows how the right component library can enable startups to focus on their core product innovation while maintaining professional, scalable user interfaces.
