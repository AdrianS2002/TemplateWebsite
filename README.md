# Website template

A dynamic Angular app with authentication, real-time API calls, and configurable UI elements such as a menu, footer, language switcher, and sidebar—all managed via JSON.

In the app, users can sign up, log in, reset their password, and securely authenticate. The system also integrates location-based API calls to dynamically fetch available countries and cities for enhanced user interaction.

## Deploy Link
[Live Demo](https://template-website-navy.vercel.app/home) <!-- Replace # with your deployed app link -->

## Features

### 1. **Authentication System**
  - Users can sign up, log in, and reset their password securely.
  - Error handling for authentication failures (e.g., incorrect credentials, email not found).
  - Uses Firebase Authentication for managing user sessions.

### 2. **Top Menu**
- Responsive design.
- Configurable menu items (e.g., Home, About Us) with the following properties:
  - **Enabled**: Controls visibility of individual menu items.
  - **Sticky**: Enables a fixed position at the top of the screen.
  - **Transparent**: Allows a transparent background.

### 3. **Footer**
- Configurable properties for:
  - **Enabled**: Controls whether the footer is displayed.
  - **Sticky**: Fixes the footer at the bottom of the screen.

### 4. **Sidebar**
- Configurable property for enabling/disabling the sidebar.
- Includes a toggle button to expand/collapse the sidebar.
- Dynamically displays submenus based on the current page, as defined in the JSON configuration.

### 5. **Language Switcher**
- Dropdown menu for selecting a language.
- Configurable list of languages with properties (`label`, `code`) defined in the JSON file.
- Automatically loads and updates the app’s language based on the selection.

## JSON Configuration

The app is fully driven by a configuration file (`template-config.json`). Below is a sample structure:

[JSON] (https://template-website-navy.vercel.app/template-config.json)
