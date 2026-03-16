name: spline
description: Expert capability in building 3D web experiences using Spline. Use when you need to integrate Spline 3D assets, create interactive 3D UI, or build immersive 3D websites.
tags:
  - spline
  - 3d
  - interactive
  - web-experience
  - ui-design

# Spline Skill

This skill enables the AI agent to design and build interactive 3D web experiences using Spline.

## 💡 When to Use

Use this skill when you need to:
- Integrate Spline scenes into React or vanilla JavaScript projects.
- Create 3D interactive elements (buttons, hover effects, sliders).
- Build immersive 3D landing pages or product showcases.
- Prototyping 3D user interfaces.
- Manage Spline variables and events via the Spline Runtime.

## 🚀 Key Features

- **Spline Integration:** Proficiency in using `@splinetool/runtime` and `@splinetool/react-spline`.
- **Interactivity:** Expertise in triggering Spline events and responding to them in code.
- **State Management:** Using Spline variables to sync 3D states with application logic.
- **Performance:** Best practices for loading and rendering Spline scenes efficiently.
- **Design Alignment:** Ensuring 3D elements follow the overall design system and aesthetics.

## 🛠️ Implementation Steps

1. **Spline Scene Export:**
   - Use the "Export" feature in Spline to get a URL or download the source.
   - For web projects, using the Spline Viewer or Runtime is preferred.

2. **Setup Integration:**
   - Install dependencies: `npm install @splinetool/react-spline` (for React) or use the CDN.
   - Implement the `Spline` component or initialize the `Application` class.

3. **Event Handling:**
   - Set up event listeners for `onMouseDown`, `onMouseUp`, `onFollow`, etc.
   - Use `onLoad` to access the Spline application instance.

4. **Variable Manipulation:**
   - Use `app.setVariable('name', value)` to update 3D properties dynamically.
   - Subscribe to variable changes to update UI state.

5. **Optimization:**
   - Implement lazy loading for large 3D scenes.
   - Optimize textures and geometry within the Spline editor before export.

## 📚 Resources
- [Spline Official Documentation](https://docs.spline.design/)
- [Spline Runtime API](https://www.npmjs.com/package/@splinetool/runtime)
- [Spline React Component](https://www.npmjs.com/package/@splinetool/react-spline)
