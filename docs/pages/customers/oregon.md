---
title: Oregon State University
description: How Oregon State University transformed course planning with the MUI X Data Grid.
image: '/static/branding/companies/oregon.svg'
tags: ['MUI X']
rank: '10'
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

<img
    id="blog-responsive-image"
    src="/static/branding/companies/oregon.svg"
    alt="Oregon logo"
    style="width: 40%; height: auto; object-fit: cover; object-position: top left; border: 0px; margin-left: 0; margin-bottom: 20px; display: block; text-align: left;"
  />

**Partner Since: 2021**

## Overview

[Oregon State University](https://oregonstate.edu/) is a premier public land-grant research university located in Corvallis, Oregon, recognized for innovation, world-class research, and a diverse academic environment with strong community engagement and global impact.
To improve their course planning and faculty assignment, they developed Resource Insights, an application for managing course sections, faculty availability, and student demand.
It replaced outdated Excel-based methods with a modern online system.
The tool integrates with existing university systems to provide real-time enrollment data, eliminating manual data entry.

<span class="only-light-mode">
<blockquote style="margin: 32px 0; padding: 24px 32px; background: #f5f5f7; border-left: 6px solid var(--muidocs-palette-primary-main); border-radius: 8px; font-size: 1.15rem; font-style: italic;">
  MUI X provides the right balance of performance, customization, and React integration. If you need a scalable, spreadsheet-like experience in your web app, it's definitely worth considering.
  <br>
  <span style="display: block; margin-top: 12px; font-size: 1rem; font-style: normal; color: #555; font-weight: 500;">
    – Mark Clements, Manager, Software Development & Quality
  </span>
</blockquote>
</span>
<span class="only-dark-mode">
<blockquote style="margin: 32px 0; padding: 24px 32px; background: var(--muidocs-palette-background-default); border-left: 6px solid var(--muidocs-palette-primary-main); color: #f5f5f7; border-radius: 8px; font-size: 1.15rem; font-style: italic;">
  MUI X provides the right balance of performance, customization, and React integration. If you need a scalable, spreadsheet-like experience in your web app, it's definitely worth considering.
  <br>
  <span style="display: block; margin-top: 12px; font-size: 1rem; font-style: normal; color: #bbb; font-weight: 500;">
    – Mark Clements, Manager, Software Development & Quality
  </span>
</blockquote>
</span>

## Challenge

The university needed a robust solution to handle tabular data efficiently.
Planners and administrators required a system that could provide spreadsheet-like interactions, allowing them to filter, sort, and manipulate data dynamically.
Key challenges included:

- Lack of real-time data integration in current processes.
- The need for an Excel-like experience in a web-based tool.
- Finding a library that was well-supported, actively maintained, and built specifically for React.
- Ensuring high performance and customization while keeping the UI intuitive.
  While alternatives like AG Grid were considered, MUI X was preferred because it's deeply integrated with React, whereas AG Grid's approach spans multiple frontend frameworks, leading to inconsistencies in React implementations.

## Solution

The team adopted the Data Grid as the core component for handling tabular data.
This choice was driven by its extensive feature set, including:

- Column manipulation – Moving, sorting, filtering, and grouping columns for enhanced usability.
- Row grouping – Organizing complex datasets for better visualization.
- Built-in editing – Allowing users to modify data directly within the grid.
- Custom components – Integration of an autocomplete feature within cells to handle thousands of course options efficiently.

The Data Grid's customization capabilities allowed the team to build an interface tailored to the university's needs, providing a seamless transition from Excel while leveraging MUI's robust React foundation.

## Results

- Faster and more intuitive workflows – Replacing spreadsheets with an interactive grid improved efficiency in faculty and course planning.
- Custom editing interfaces – In-cell editing for simple data and modal-based forms for complex changes streamlined data management.
- Seamless system integration – Real-time enrollment data updates reduced manual input errors.
- Developer-friendly implementation – MUI X's well-structured documentation and conventions enabled smooth adoption.

The Resource Insights team sees the Data grid as an essential component for projects requiring complex tabular interactions.
