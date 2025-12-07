
const axios = require('axios');

const BASE_URL = 'http://localhost:3001';
const LOGIN_URL = `${BASE_URL}/v1/auth/login`;
const POSTS_URL = `${BASE_URL}/v1/posts`;

const credentials = {
   email: 'ferdousr1992@gmail.com',
   password: 'Abcd1234!'
};

const posts = [
   {
      title: "The Future of GenAI in Legal Tech",
      content: "Generative AI is revolutionizing how we approach legal research and contract analysis. By automating routine tasks, lawyers can focus on high-value strategic work. Our platform integrates state-of-the-art LLMs to provide real-time insights.",
      published: true
   },
   {
      title: "Navigating Corporate Compliance in 2025",
      content: "With regulations tightening globally, staying compliant is more challenging than ever. We discuss the top 5 strategies for maintaining corporate governance in an evolving regulatory landscape.",
      published: true
   },
   {
      title: "Secure Data Storage for Sensitive Client Info",
      content: "Client confidentiality is paramount. Learn how our 'GenAI' object storage ensures bank-grade encryption and compliance with GDPR and CCPA standards.",
      published: true
   },
   {
      title: "Optimizing M&A Workflows with Smart Tools",
      content: "Mergers and acquisitions require meticulous due diligence. Discover how our digital deal rooms and automated checklists streamline the process, reducing time-to-close by 40%.",
      published: true
   },
   {
      title: "Understanding IP Rights in the AI Era",
      content: "As AI generates more content, intellectual property rights are becoming complex. This post explores recent court rulings and what they mean for content creators and businesses.",
      published: true
   },
   {
      title: "Client Portal: A New Way to Collaborate",
      content: "We are excited to launch our new Client Portal. Real-time updates, secure document sharing, and direct communication with your legal team—all in one place.",
      published: true
   }
];

async function seed() {
   try {
      console.log('Authenticating...');
      const loginRes = await axios.post(LOGIN_URL, credentials);
      const token = loginRes.data.data.accessToken;
      console.log('Login successful. Token received.');

      for (const post of posts) {
         console.log(`Creating post: "${post.title}"...`);
         try {
            await axios.post(POSTS_URL, post, {
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
               }
            });
            console.log(`Post "${post.title}" created successfully.`);
         } catch (postErr) {
            console.error(`Failed to create post "${post.title}":`, postErr.message);
         }
      }

      console.log('Seeding complete.');

   } catch (err) {
      console.error('Seeding failed:', err.message);
      if (err.response) {
         console.error('Response data:', err.response.data);
      }
   }
}

seed();
