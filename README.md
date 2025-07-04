# TaskMaster - Personal Todo Application

A beautiful, interactive todo application with user authentication and advanced features.

## Features

### 🔐 User Authentication
- **Login/Register System**: Secure user authentication with username/password
- **User Sessions**: Persistent login sessions using localStorage
- **Data Privacy**: Each user has their own private todo list

### ✨ Task Management
- **Add Tasks**: Create new tasks with title, description, category, priority, and due date
- **Edit Tasks**: Modify existing tasks with a user-friendly modal interface
- **Complete Tasks**: Mark tasks as completed with visual feedback
- **Delete Tasks**: Remove tasks with confirmation dialog
- **Duplicate Tasks**: Quickly create copies of existing tasks

### 🎨 Beautiful UI/UX
- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between dark and light themes
- **Interactive Elements**: Hover effects, smooth transitions, and visual feedback
- **Professional Typography**: Uses Inter font family for excellent readability

### 🔍 Advanced Features
- **Search Functionality**: Search tasks by title or description
- **Smart Filters**: Filter by category, priority, and completion status
- **Task Categories**: Organize tasks into Work, Personal, Shopping, Health, and Other
- **Priority Levels**: Set High, Medium, or Low priority for tasks
- **Due Dates**: Set and track due dates with overdue notifications
- **Statistics Dashboard**: View total, completed, and pending tasks

### 📱 User Experience
- **Keyboard Shortcuts**: 
  - `Ctrl/Cmd + N`: Add new task
  - `Escape`: Close modals
- **Auto-save**: Tasks are automatically saved every 30 seconds
- **Notifications**: Toast notifications for all user actions
- **Empty State**: Helpful message when no tasks are available
- **Smart Sorting**: Tasks are sorted by completion status, priority, and due date

## How to Use

### Getting Started
1. **Open the Application**: Open `index.html` in your web browser
2. **Create Account**: Click "Register here" to create a new account
3. **Login**: Use your credentials to access your personal todo list

### Managing Tasks
1. **Add New Task**: Click the "Add Task" button
2. **Fill Details**: Enter task title, description, category, priority, and due date
3. **Save**: Click "Save Task" to add it to your list
4. **Edit**: Click the edit icon on any task to modify it
5. **Complete**: Click the check icon to mark tasks as completed
6. **Delete**: Click the trash icon to remove tasks

### Using Filters
- Use the search bar to find specific tasks
- Filter by category, priority, or completion status
- Combine multiple filters for precise results

### Customization
- Toggle between dark and light themes using the theme button
- View your task statistics in the sidebar
- Organize tasks using categories and priorities

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **Vanilla JavaScript**: No external frameworks, pure JavaScript
- **Local Storage**: Client-side data persistence
- **Font Awesome**: Icons for enhanced UI
- **Google Fonts**: Inter font family for typography

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Data Storage
- All data is stored locally in the browser's localStorage
- Each user's data is isolated and secure
- No server or database required

### File Structure
```
taskmaster/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── README.md          # Documentation
```

## Features in Detail

### Authentication System
- Secure user registration and login
- Password validation for registration
- Username and email uniqueness checking
- Session persistence across browser sessions

### Task Categories
- **Work**: Professional tasks and projects
- **Personal**: Personal goals and activities
- **Shopping**: Shopping lists and purchases
- **Health**: Health and fitness related tasks
- **Other**: Miscellaneous tasks

### Priority System
- **High Priority**: Urgent and important tasks (red indicator)
- **Medium Priority**: Important but not urgent (yellow indicator)
- **Low Priority**: Nice to have tasks (green indicator)

### Smart Features
- **Overdue Detection**: Visual indicators for overdue tasks
- **Completion Tracking**: Statistics for productivity monitoring
- **Search & Filter**: Powerful search and filtering capabilities
- **Responsive Design**: Optimized for all screen sizes

## Keyboard Shortcuts

- `Ctrl/Cmd + N`: Add new task
- `Escape`: Close any open modal
- `Enter`: Submit forms
- `Tab`: Navigate through form fields

## Installation

1. Download or clone the files
2. Open `index.html` in any modern web browser
3. No additional setup required!

## Demo Account

For testing purposes, you can create any account. The app comes with demo tasks for new users to help them get started.

## Contributing

This is a personal project, but suggestions and improvements are welcome!

## License

This project is open source and available under the MIT License.

---

**TaskMaster** - Your personal productivity companion! 🚀
