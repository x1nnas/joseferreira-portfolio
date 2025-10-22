// Contact form controller
export async function submitContact(req, res) {
  const { name, email, message } = req.body;

  try {
    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Here you would typically save to database or send email
    // For now, just log the contact form submission
    console.log('Contact form submission:', { name, email, message });

    res.status(200).json({ 
      message: "Thank you for your message! We'll get back to you soon." 
    });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ message: "Failed to submit contact form" });
  }
}
