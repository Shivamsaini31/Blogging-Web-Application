# Blog Web Application

A modern, responsive blog web application built with Node.js, Express, and EJS templating engine. Features an elegant design system with smooth animations and a user-friendly interface for creating and reading blog posts.

## 🚀 Features

### Core Functionality

- **Blog Management**: Create, read, and organize blog posts
- **Category System**: Organize blogs by categories (World, Technology, Design, Culture, Business, Politics)
- **User Interface**: Modern, responsive design with elegant card layouts
- **Image Support**: Thumbnail images for each blog post
- **Author Attribution**: Track and display blog authors

### Design & UX

- **Modern UI**: Clean, professional design with consistent theming
- **Responsive Layout**: Mobile-first approach with Bootstrap grid system
- **Smooth Animations**: Framer Motion (Motion One) powered card animations
- **Elegant Cards**: Hover effects, image scaling, and gradient accents
- **Typography**: Inter font family for excellent readability

### Technical Features

- **Server-Side Rendering**: EJS templates for dynamic content
- **RESTful API**: Clean API endpoints for blog operations
- **File Structure**: Organized submission system with category-based folders
- **Cross-Platform**: Works on Windows, macOS, and Linux

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Template Engine**: EJS (Embedded JavaScript)
- **Frontend**: HTML5, CSS3, JavaScript
- **Styling**: Bootstrap 5.3.7, Custom CSS
- **Animations**: Motion One (Framer Motion alternative)
- **Icons**: Feather Icons (SVG-based)
- **Fonts**: Inter (Google Fonts)

## 📁 Project Structure

```
Blog Web Application/
├── config/
│   └── db.js                 # Database configuration
├── controllers/
│   └── blogControllers.js    # Blog logic and operations
├── public/
│   ├── style.css            # Main stylesheet with design system
│   └── favicon.svg          # Application icon
├── routes/
│   └── blogRoutes.js        # API route definitions
├── views/
│   ├── index.ejs            # Homepage with blog grid
│   ├── CategoryWiseBlogs.ejs # Category-specific blog listings
│   ├── createBlog.ejs       # Blog creation form
│   ├── blogPage.ejs         # Individual blog post view
│   └── partials/
│       ├── navbar.ejs       # Navigation component
│       └── footer.ejs       # Footer component
├── index.js                 # Main application entry point
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## 🎨 Design System

### Color Palette

- **Primary**: Blue (#2563eb)
- **Secondary**: Purple (#7c3aed)
- **Accent**: Orange (#f59e0b)
- **Text**: Dark gray (#1f2937)
- **Background**: Light gray (#f9fafb)

### Components

- **Elegant Cards**: Rounded corners, shadows, hover effects
- **Category Badges**: Gradient backgrounds with uppercase text
- **Navigation**: Sticky positioning with active states
- **Buttons**: Consistent styling with hover animations
- **Forms**: Clean layouts with proper spacing

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd "Blog Web Application"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure database**

   - Update `config/db.js` with your database credentials
   - Ensure your database server is running

4. **Start the application**

   ```bash
   npm start
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The application should be running and accessible

## 📱 Usage

### Creating a Blog

1. Navigate to the homepage
2. Click "Start Blogging" or "Create Blog"
3. Fill in the required fields:
   - Title
   - Blog content
   - Thumbnail image URL
   - Author (optional)
   - Category
4. Click "Publish" to create your blog post

### Reading Blogs

- **Homepage**: View all blogs in a responsive grid
- **Category Pages**: Browse blogs by specific categories
- **Individual Posts**: Click "Continue reading" to view full blog content

### Navigation

- Use the top navigation bar to switch between categories
- Use breadcrumbs and back buttons for easy navigation
- Responsive design works on all device sizes

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database
```

### Database Setup

The application expects a database with the following structure:

- Blogs table with fields: title, content, image, author, category, created_at
- Categories table for organizing blog posts

## 🎯 API Endpoints

- `GET /` - Homepage with all blogs
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/category/:category` - Get blogs by category
- `GET /blog/:id` - Get individual blog post
- `POST /api/blogs/createBlog` - Create new blog post

## 🎨 Customization

### Styling

- Modify `public/style.css` to change the design system
- Update color variables in the `:root` selector
- Customize card animations and hover effects

### Layout

- Edit EJS templates in the `views/` directory
- Modify Bootstrap classes for layout changes
- Update navigation and footer components

### Animations

- Adjust Motion One animation parameters in the script tags
- Modify timing, easing, and animation properties
- Add new animation sequences as needed

## 📱 Responsive Design

The application is built with a mobile-first approach:

- **Mobile**: Single column layout with optimized spacing
- **Tablet**: Two-column grid for medium screens
- **Desktop**: Three-column grid with full feature set
- **Touch-friendly**: Proper touch targets and gestures

## 🔒 Security Features

- Input validation and sanitization
- CSRF protection (if implemented)
- Secure database connections
- File upload restrictions

## 🚀 Performance

- Optimized images with lazy loading
- Efficient database queries
- Minified CSS and JavaScript
- Responsive image handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Shivam Saini** - Developer and maintainer of this blog application.

## 🙏 Acknowledgments

- Bootstrap team for the responsive framework
- Motion One for smooth animations
- Inter font family for excellent typography
- Feather Icons for beautiful SVG icons

## 📞 Support

If you encounter any issues or have questions:

1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Contact the maintainer for direct support

## 🔮 Future Enhancements

- [ ] User authentication and authorization
- [ ] Comment system for blog posts
- [ ] Search and filtering capabilities
- [ ] Dark mode toggle
- [ ] Social media sharing
- [ ] Blog analytics and insights
- [ ] Rich text editor for blog creation
- [ ] Image upload and management
- [ ] RSS feeds for blog syndication
- [ ] SEO optimization features

---

**Happy Blogging! 🚀**
