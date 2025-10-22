import db from "../db/dbconn.js"; // Import the database connection

// Function to seed the blogs table with initial data
async function seedBlogs() {
  const blogs = [
    {
      title: "First Blog Post",
      content:
        "This is the full content of the first blog post. Lots of interesting stuff here!",
    },
    {
      title: "Second Blog Post",
      content:
        "Here is the full content of the second blog post. It is also very insightful.",
    },
    {
      title: "Third Blog Post",
      content:
        "And this is the third blog post's full content. Enjoy reading it!",
    },
  ];

  // Insert each blog into the database
  for (const blog of blogs) {
    await db.query(`INSERT INTO blogs (title, content) VALUES ($1, $2)`, [
      blog.title,
      blog.content,
    ]);
  }

  console.log("Seeded blogs data."); // Log success message
}

// Execute the seeding function and handle errors
seedBlogs()
  .then(() => process.exit()) // Exit the process on success
  .catch((err) => {
    console.error(err); // Log any errors
    process.exit(1); // Exit the process with an error code
  });
