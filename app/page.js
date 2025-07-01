'use client';

import Image from "next/image";
import {useState, useEffect} from "react";

export default function Home() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen);
  }

useEffect(() => {
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.body.scrollHeight - window.innerHeight;

    // Show when scrolled near the bottom
    setShowBackToTop(scrollTop > scrollHeight - 200);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const cleanMarkdown = (str) =>
  str
    // bullet markers  * item  or  - item
    .replace(/^\s*[*-]\s+/gm, "• ")
    // bold or italics **text**  or  *text*
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    // headings ## Heading → Heading
    .replace(/^#{1,6}\s*/gm, "")
    .trim();

const sendMessage = async () => {
  if (!input.trim()) return;

  setMessages((prev) => [...prev, { sender: "user", text: input }]);
  setInput("");
  setLoading(true);

const res = await fetch("/api/chat", {
  method: "POST",
  body: JSON.stringify({ messages: [...messages, { sender: "user", text: input }] }),
});

  if (!res.ok || !res.body) {
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "Error: Failed to get a response." },
    ]);
    setLoading(false);
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder("utf-8");

  const { done, value } = await reader.read();
  const chunk = decoder.decode(value);

  let botText = "";

  try {
    const parsed = JSON.parse(chunk);
    botText = parsed.reply || chunk;
  } catch {
    botText = chunk;
  }

  botText = cleanMarkdown(botText);

  setMessages((prev) => [...prev, { sender: "bot", text: botText }]);
  setLoading(false);
};

  return (
    <>
      <header>
        <a href="#" className="logo-holder">
            <div className="logo"> HD </div>
            <div className="logo-text"> Hrishikesh's Portfolio </div>
        </a>
        <nav>
            <ul id="menu" className={menuOpen ? "active" : ""}>
                <li><a href="#about">About Me</a></li>
                <li><a href="#work">Professional Experience</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="mailto:hrishikeshdhole0@gmail.com" className="button">Contact</a></li>
            </ul>
            <a href="#" className="mobile-toggle" onClick={toggleMobileMenu}>
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h10"/>
                </svg>
            </a>
        </nav>
    </header>
    <main>
        <section id="Home" className="hero container">
            <div className="hero-beige">
                <div>
                    <h1><small> Hi, I am </small>
                        Hrishikesh Dhole
                    </h1>
                        <p>
                            I am a Data Scientist passionate about cloud-scale data engineering, machine learning, and real-time analytics. I design data pipelines, build AI models, and create visual dashboards to help organizations make data-driven decisions.
                        </p>
                    <div className="call-to-action">
                        <a href="./resume_hrishikesh_dhole_DS.pdf" className="button black">
                            View Resume
                        </a>
                        <a href="mailto:hrishikeshdhole0@gmail.com" className="button white">
                            Contact Me
                        </a>
                    </div>
                    <div className="social-links">
                        <a href="https://github.com/Hrish52">
                            <img src="./imgs/github.png" alt="GitHub" width="48" />
                        </a>
                        <a href="https://www.linkedin.com/in/hrishikesh-dhole-43b150159/">
                            <img src="./imgs/linkedin.png" alt="LinkedIn" width="48" />
                        </a>    
                    </div>        
                </div>
            </div>
            <div className="hero-red">
                <img src="./imgs/portfolio.png" alt="Hrishikesh Dhole" width="100%" />
            </div>
        </section>

        <section className="logos container">
            <div className="marquee">
                <div className="track">
                    <img src="./imgs/amazon-web-services-aws-seeklogo.png" alt="AWS" width="128" />
                    <img src="./imgs/Google-Cloud-Emblem.png" alt="Google Cloud" width="128" />
                    <img src="./imgs/azure.png" alt="Azure" width="128" />

                    <img src="./imgs/google-bigquery-logo-png.png" alt="Google BigQuery" width="128" />
                    <img src="./imgs/azure-synapse.jpg" alt="Azure Synapse" width="128" />
                    <img src="./imgs/hadoop.png" alt="Hadoop" width="128" />
                    <img src="./imgs/PySpark-logo.jpeg" alt="PySpark" width="300" />
                    <img src="./imgs/Spark Streaming.png" alt="Spark Streaming" width="128" />
                    <img src="./imgs/Apache_Cassandra-Logo.wine.png" alt="Apache Cassandra" width="128" />
                    <img src="./imgs/aws-dynamodb-logo.png" alt="AWS DynamoDB" width="128" />
                    <img src="./imgs/apache_hive_logo_icon_167868.png" alt="Apache Hive" width="128" />

                    <img src="./imgs/python.png" alt="Python" width="128" />
                    <img src="./imgs/MySql.png" alt="SQL" width="128" />
                    <img src="./imgs/r-project-seeklogo.png" alt="R" width="128" />
                    <img src="./imgs/html.png" alt="HTML" width="128" />
                    <img src="./imgs/css.png" alt="CSS" width="128" />
                    <img src="./imgs/javascript.png" alt="JavaScript" width="128" />
                    <img src="./imgs/react.png" alt="React" width="128" />

                    <img src="./imgs/TensorFlow.jpeg" alt="TensorFlow" width="128" />
                    <img src="./imgs/Keras.jpeg" alt="Keras" width="128" />
                    <img src="./imgs/pytorch-seeklogo.png" alt="PyTorch" width="200" />
                    <img src="./imgs/Scikit-learn.png" alt="Scikit-learn" width="128" />
                    <img src="./imgs/flask-logo-png_seeklogo-273085.png" alt="Flask" width="128" />
                    
                    <img src="./imgs/tableau-software-seeklogo.png" alt="Tableau" width="500" />
                    <img src="./imgs/PowerBI.jpeg" alt="Power BI" width="128" />

                    <img src="./imgs/gemini.jpeg" alt="Gemini" width="128" />
                    <img src="./imgs/openai.jpeg" alt="OpenAI" width="128" />
                    <img src="./imgs/llama.png" alt="Llama" width="128" />

                    <img src="./imgs/nextjs.png" alt="Next.js" width="128" />
                    <img src="./imgs/azure-synapse.jpg" alt="Azure Synapse" width="128" />

                    <img src="./imgs/amazon-web-services-aws-seeklogo.png" alt="AWS" width="128" />
                    <img src="./imgs/Google-Cloud-Emblem.png" alt="Google Cloud" width="128" />
                    <img src="./imgs/azure.png" alt="Azure" width="128" />

                    <img src="./imgs/google-bigquery-logo-png.png" alt="Google BigQuery" width="128" />
                    <img src="./imgs/azure-synapse.jpg" alt="Azure Synapse" width="128" />
                    <img src="./imgs/hadoop.png" alt="Hadoop" width="128" />
                    <img src="./imgs/PySpark-logo.jpeg" alt="PySpark" width="300" />
                    <img src="./imgs/Spark Streaming.png" alt="Spark Streaming" width="128" />
                    <img src="./imgs/Apache_Cassandra-Logo.wine.png" alt="Apache Cassandra" width="128" />
                    <img src="./imgs/aws-dynamodb-logo.png" alt="AWS DynamoDB" width="128" />
                    <img src="./imgs/apache_hive_logo_icon_167868.png" alt="Apache Hive" width="128" />

                    <img src="./imgs/python.png" alt="Python" width="128" />
                    <img src="./imgs/MySql.png" alt="SQL" width="128" />
                    <img src="./imgs/r-project-seeklogo.png" alt="R" width="128" />
                    <img src="./imgs/html.png" alt="HTML" width="128" />
                    <img src="./imgs/css.png" alt="CSS" width="128" />
                    <img src="./imgs/javascript.png" alt="JavaScript" width="128" />
                    <img src="./imgs/React.png" alt="React" width="128" />

                    <img src="./imgs/TensorFlow.jpeg" alt="TensorFlow" width="128" />
                    <img src="./imgs/Keras.jpeg" alt="Keras" width="128" />
                    <img src="./imgs/pytorch-seeklogo.png" alt="PyTorch" width="200" />
                    <img src="./imgs/Scikit-learn.png" alt="Scikit-learn" width="128" />
                    <img src="./imgs/flask-logo-png_seeklogo-273085.png" alt="Flask" width="128" />
                    
                    <img src="./imgs/tableau-software-seeklogo.png" alt="Tableau" width="500" />
                    <img src="./imgs/PowerBI.jpeg" alt="Power BI" width="128" />

                    <img src="./imgs/gemini.jpeg" alt="Gemini" width="128" />
                    <img src="./imgs/openai.jpeg" alt="OpenAI" width="128" />
                    <img src="./imgs/llama.png" alt="Llama" width="128" />

                    <img src="./imgs/nextjs.png" alt="Next.js" width="128" />
                    <img src="./imgs/azure-synapse.jpg" alt="Azure Synapse" width="128" />
                </div>
            </div>

        </section>

        <section id="about" className="skills container">
            <h2>
                <small> About Me </small>
                Skills
            </h2>
            <div className="holder-blue">
                <div className = "left-column">
                   <h3> Core Data Science Skills </h3>
                   <ul>
                    <li><strong>Languages & Tools:</strong> Python, SQL, R, C++, Bash, Git, Docker, Jupyter, Google Colab</li>
                    
                    <li><strong>Libraries & Frameworks:</strong> Pandas, NumPy, Scikit-learn, TensorFlow, Keras, PyTorch, SpaCy, NLTK</li>
                    
                    <li><strong>Machine Learning & AI:</strong> Regression, classNameification, Clustering, CNN, RNN, Transformers (BERT, GPT, RoBERTa), Recommendation Systems, Hyperparameter Tuning</li>
                    
                    <li><strong>NLP:</strong> BERT, VADER, DistilBERT, BERTopic, NER, Text Summarization, Topic Modeling (LDA), Tokenization (WordPiece, BPE)</li>
                    
                    <li><strong>Generative AI:</strong> Hugging Face Transformers, OpenAI API, Google AI Studio, Prompt Engineering, Fine-tuning, Retrieval-Augmented Generation (RAG), DALL·E, Midjourney</li>
                    
                    <li><strong>Big Data & Cloud:</strong> PySpark, BigQuery, Hadoop, Spark Streaming, AWS (S3, EC2, Lambda, SageMaker), GCP (Vertex AI), Azure (Synapse, ML Studio)</li>
                    
                    <li><strong>Visualization & BI:</strong> Tableau, Power BI, D3.js, Plotly, Matplotlib, Seaborn</li>
                    
                    <li><strong>Deployment & MLOps:</strong> Flask, FastAPI, Streamlit, API Deployment, GitHub Actions, CI/CD Pipelines, Experiment Tracking (Weights & Biases)</li>
                    
                    <li><strong>Databases:</strong> PostgreSQL, MySQL, MongoDB, DynamoDB, Apache Cassandra</li>
                </ul>
                </div>
                <div className = "right-column">
                    <h3>A bit about me</h3>
                    <p>Hi, I'm Hrishikesh Dhole — a passionate Data Scientist and Software Engineer with a strong foundation in computer engineering, statistical modeling, and cloud-based analytics. I hold a Master’s degree in Data Science from Seattle University, where I led a capstone project analyzing over 350K+ social media comments for Costco using NLP, Azure OpenAI, and Power BI to deliver real-time voice-of-market insights. My bachelor’s in Computer Engineering was equally impactful, where I earned distinction and led a research-backed project on gesture-based automation systems, culminating in a peer-reviewed publication in IJARIIT.</p>
                    <p>Skilled in Python, SQL, and PySpark, I’ve built CNN models for audio classNameification, automated multi-platform data pipelines, and created predictive models using SVMs and deep learning. My toolset spans cloud platforms like AWS, GCP, and Azure, along with visualization tools such as Tableau, Power BI, and D3.js. I’ve been fortunate to contribute to diverse domains — from retail analytics to computer vision — blending technical depth with real-world impact.</p>
                    <p> Beyond code, I value adaptability, being a quick learner and strong team collaborator with leadership experience as ACM Vice-Chairperson and project lead. My strengths lie in flexibility, active listening, and a drive to continuously improve. When I’m not solving data problems, you’ll find me hiking scenic trails, playing badminton, volleyball, or pool, enjoying a game of darts, or cooking something new. I’m currently exploring full-time roles where I can apply my skills to solve meaningful, data-driven challenges and make a positive impact through technology.</p>
                </div>
            </div>
        </section>

        <section id= "work" className="work-experience container">
            <h2>
                <small> Work Experience </small>
                Companies I have worked for so far!!!
            </h2>
            <div className="jobs">
                <article>
                    <figure>
                        <div>
                            <img src="./imgs/costco-wholesale-logo-png_seeklogo-35878.png" alt="Costco" width="100%" />
                            <figcaption>
                                Costco Wholesale
                            </figcaption>  
                        </div>
                    </figure>
                        <h3>Data Scientist - AI/ML Apprenticeship</h3>
                        <div>Jan 2025 - June 2025</div>
                        <p>Led a 5-person team to ingest 350 K+ social-media comments, built an Azure AI chatbot, NLP data pipelines and Power BI dashboard, cutting manual data prep 80 % and merchandiser insight time 30 %.</p>
                </article>
                <article>
                        <figure>
                        <div>
                            <img src="./imgs/Seattle-University.png" alt="Student Engagement Ambassador" width="100%" />
                            <figcaption>
                                Seattle-University Annual Giving Department
                            </figcaption>  
                        </div>
                    </figure>
                        <h3>Student Engagement Ambassador</h3>
                        <div>Oct 2022 - Dec 2022</div>
                        <p>Managed and cleaned the alumni database systems while executing targeted outreach and event campaigns, boosting alumni engagement and network growth.</p>
                </article>
                <article>
                        <figure>
                        <div>
                            <img src="./imgs/Tan.png" alt="Tantransh Solutions" width="100%" />
                            <figcaption>
                                Tantransh Solutions Pvt. Ltd.
                            </figcaption>  
                        </div>
                    </figure>
                        <h3>Web Developer Intern</h3>
                        <div>May 2020 - Aug 2020</div>
                        <p>Developed a responsive Rails blogging platform, tuned database queries for 30 % faster load times, and integrated Google Analytics to steer feature priorities.</p>
                </article>
            </div>
        </section>

        <section id="projects" className="bento container">
            <h2>
                <small> Project Experience </small>
                Completed and Upcoming Projects
            </h2>
            <div className="bento-grid">
                <a href="https://github.com/Hrish52/Impact-of-Student-and-Staff-Diversity-on-Student-6-year-Graduation-Rates" className="bento-item">
                    <img src="./imgs/impact.jpg" alt="Impact Student" width="100%" />
                    <figcaption>
                        Impact Of Student and Staff Diversity on Student 6 year Graduation Rates
                    </figcaption>  
                </a>
                  <a href="https://github.com/Hrish52/Library-Management-System" className="bento-item">
                    <img src="./imgs/library.jpg" alt="Library Management" width="100%" />
                    <figcaption>
                        Library Management System
                    </figcaption>  
                  </a>
                  <a href="https://github.com/Hrish52/House-Tenure-Prediction-Analysis" className="bento-item">
                    <img src="./imgs/House.jpg" alt="House Tenure Project" width="100%" />
                    <figcaption>
                        House Tenure Prediction 
                    </figcaption>  
                  </a>
                  <a href="https://github.com/Hrish52/Seattle-Bird-Call-Classification" className="bento-item">
                    <img src="./imgs/Bird.jpeg" alt="Seattle Bird" width="100%" />
                    <figcaption>
                        Seattle Bird Sound Prediction
                    </figcaption>  
                  </a>
                  <a href="https://github.com/Hrish52/Gesture-Automation-System-For-Various-Applications" className="bento-item">
                    <img src="./imgs/gesture.jpg" alt="Gesture Recognition" width="100%" />
                    <figcaption>
                        Gesture Recognition System
                    </figcaption>  
                  </a>
                <div className="bento-item">
                    upcoming projects
                    <figcaption>
                        Soon to be updated for more projects !!
                    </figcaption>  
                </div>
            </div>
        </section>
        
        <section className="chatbot container">
        <h2>
            <small>Talk to me</small>
            Chatbot
        </h2>
        <div className="chatbot-blue">
            <div className="chat-info">
                <h3>Google Gemini flash AI Chatbot</h3>
                    <p>I've put together a chatbot here that knows all my skills, work experience, and has access to my CV/Resume. You can use it to ask questions and get a better idea of who I am and what I’ve worked on. </p>
                    <p>You can also download my resume below if you'd like to explore my background further. I’m currently open to new full-time opportunities where I can apply my expertise in data science, machine learning, and AI to create meaningful impact. If you think I’d be a good fit for your team or project, let’s connect!!</p>
                    <a href="./resume_hrishikesh_dhole_DS.pdf" className="button black">Download Resume</a>
            </div>
            <div className="chat-box">
                <div className="scroll-area">
                   <ul id="chat-log">
                      {messages.map((msg, i) => (
                        <li key={i} className={msg.sender}>
                          <span className={`avatar ${msg.sender}`}>{msg.sender === "bot" ? "AI" : "User"}</span>
                          <div className="message">{msg.text}</div>
                        </li>
                      ))}
                  </ul>
              </div>
            <div className="chat-message">
                <input
                    type="text"
                    placeholder="Hey Hrishikesh, what skills are you best at ?"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <button className="button black" onClick={sendMessage} disabled={loading}>
                    {loading ? "..." : "Send"}
                  </button>
            </div>
            </div>
        </div>
        </section>

        {showBackToTop && (
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          padding: "0.75rem 1.25rem",
          fontSize: "1rem",
          backgroundColor: "#111",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          zIndex: 9999,
        }}
      >
        ↑ Back to Top
      </button>
    )}
    
    </main>
    </>
  );
  
}
