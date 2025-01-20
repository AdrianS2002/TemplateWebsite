# Language Switcher & Configurable Sidebar

A dynamic Angular app with a menu, footer, language switcher, and sidebar, fully configurable via JSON.

## Deploy Link
[Live Demo](https://template-website-navy.vercel.app/home) <!-- Replace # with your deployed app link -->

## Features

### 1. **Top Menu**
- Responsive design.
- Configurable menu items (e.g., Home, About Us) with the following properties:
  - **Enabled**: Controls visibility of individual menu items.
  - **Sticky**: Enables a fixed position at the top of the screen.
  - **Transparent**: Allows a transparent background.

### 2. **Footer**
- Configurable properties for:
  - **Enabled**: Controls whether the footer is displayed.
  - **Sticky**: Fixes the footer at the bottom of the screen.

### 3. **Sidebar**
- Configurable property for enabling/disabling the sidebar.
- Includes a toggle button to expand/collapse the sidebar.
- Dynamically displays submenus based on the current page, as defined in the JSON configuration.

### 4. **Language Switcher**
- Dropdown menu for selecting a language.
- Configurable list of languages with properties (`label`, `code`) defined in the JSON file.
- Automatically loads and updates the app’s language based on the selection.

## JSON Configuration

The app is fully driven by a configuration file (`template-config.json`). Below is a sample structure:

[JSON] (https://template-website-navy.vercel.app/template-config.json)
