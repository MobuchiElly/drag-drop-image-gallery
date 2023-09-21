#Project Created By Eleazer Mobuchi Ugwu
Software Developer Intern

# Drag and Drop Image Gallery

The Drag and Drop Image Gallery is a web application that allows users to create and organize their image collections by simply dragging and dropping images. This application is built using React and Firebase.

  Table of Contents
- [Components](#components)
- [How It Works](#how-it-works)
- [Getting Started](#getting-started)

## Components

My application consists of the following components:

- **Home**: The Home component displays the user's image gallery, which they can reorder by dragging and dropping images.

- **Search**: The Search component allows users to search for images by category and view the search results. Images in the search results can also be dragged and dropped.

-**Login**: The Login component allows users to Login or Signup on the platform


## How It Works

- **Home Component**:
  - On the home page, you'll find your image gallery.
  - Images in the gallery can be reordered by clicking and dragging them.
  - You can drag images from the gallery and drop them onto other images to swap their positions.
  - To populate the gallery, images are fetched from Firebase Firestore.
  
- **Search Component**:
  - Go to the "Search" page.
  - Enter a search query to find images by category (e.g., food, housing, nature).
  - Search results are displayed as cards, and you can drag and drop these cards to rearrange them.
  - Images in the search results are filtered based on their tags.

  **Login**:
  -Upon opening visiting the site you can choose to signup as a new user or Login as an existing user. 
  
## Getting Started

To run the application:
Go to https://image-gallery-three-azure.vercel.app/


Source Code to this project can be found at https://github.com/MobuchiElly/drag-drop-image-gallery. Feel free to star the project repository.