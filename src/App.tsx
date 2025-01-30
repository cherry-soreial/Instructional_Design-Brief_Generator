import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  ClipboardList,
  BookOpen,
  ListOrdered,
  HelpCircle,
  DollarSign,
} from "lucide-react";

// -------------- Existing Data --------------
const TOPICS = [
  "Compliance Training",
  "Sales Enablement",
  "Customer Service Basics",
  "Software Onboarding",
  "Leadership Development",
  "Diversity & Inclusion",
  "Project Management Essentials",
  "Conflict Resolution",
  "Health & Safety",
  "Data Privacy & Security",
];

const AUDIENCES = [
  "Retail staff",
  "Remote tech employees",
  "Corporate managers",
  "HR teams",
  "Call center representatives",
  "Manufacturing line workers",
  "Healthcare professionals",
  "Financial advisors",
];

const CONSTRAINTS = [
  "Limited budget",
  "Tight timeline",
  "Must be SCORM 1.2 compliant",
  "Must be xAPI compliant",
  "Needs a fully mobile-friendly approach",
  "Requires translation for multilingual audience",
];

const FORMATS = [
  "Micro-learning",
  "Scenario-based eLearning",
  "ILT + eLearning blend",
  "Gamified approach",
  "Video-based modules",
  "Self-paced modules with quizzes",
];

// -------------- Updated Learning Styles --------------
const LEARNING_STYLES = [
  "Visual",
  "Auditory",
  "Kinesthetic",
  "Reading/Writing",
  "Social",
  "Solo",
];

// -------------- Theories & Models --------------
const LEARNING_THEORIES = [
  "Behaviorism",
  "Cognitivism",
  "Constructivism",
  "Humanism",
  "Social Learning",
  "Connectivism",
];

const ID_MODELS = [
  "ADDIE",
  "SAM (Successive Approximation Model)",
  "Dick & Carey",
  "Gagné’s Nine Events",
  "Kemp Design Model",
  "Rapid Prototyping",
];

// -------------- 10-Question Quiz (with 6 style options) --------------
const QUIZ_QUESTIONS = [
  {
    question: "1. When learning a new concept, you tend to:",
    answers: [
      {
        text: "Watch a demonstration or visualize diagrams (Visual)",
        style: "Visual",
      },
      {
        text: "Listen to a lecture or discussion (Auditory)",
        style: "Auditory",
      },
      {
        text: "Perform a hands-on activity (Kinesthetic)",
        style: "Kinesthetic",
      },
      {
        text: "Read detailed instructions or an article (Reading/Writing)",
        style: "Reading/Writing",
      },
      { text: "Discuss it with a group or partner (Social)", style: "Social" },
      { text: "Study quietly on your own (Solo)", style: "Solo" },
    ],
  },
  // ... plus the other 9 questions
  {
    question: "10. Which situation helps you learn best?",
    answers: [
      { text: "Seeing examples or demonstrations (Visual)", style: "Visual" },
      {
        text: "Having discussions or listening to explanations (Auditory)",
        style: "Auditory",
      },
      {
        text: "Doing a physical activity or practice (Kinesthetic)",
        style: "Kinesthetic",
      },
      {
        text: "Reading and taking notes thoroughly (Reading/Writing)",
        style: "Reading/Writing",
      },
      { text: "Collaborating with a group (Social)", style: "Social" },
      { text: "Working on your own in a quiet space (Solo)", style: "Solo" },
    ],
  },
];

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// ======== NEW UTILITY: Estimate Budget & Time Based on Brief ========
// (You can expand or tweak these rules as you see fit.)
function estimateBudgetAndTime(format, constraint) {
  // Start with some base cost/time
  let cost = 2000; // in USD
  let timeline = 4; // in weeks (base)

  // Adjust for format
  switch (format) {
    case "Video-based modules":
      cost += 3000; // higher cost for video production
      timeline += 2; // takes longer to record/edit
      break;
    case "Gamified approach":
      cost += 2000; // more dev/design effort
      timeline += 1;
      break;
    case "ILT + eLearning blend":
      cost += 1000;
      timeline += 2;
      break;
    case "Micro-learning":
      cost += 500; // shorter modules
      timeline -= 1; // quicker to produce
      break;
    default:
      // scenario-based eLearning, self-paced, etc. minor variations
      cost += 1000;
      timeline += 1;
      break;
  }

  // Adjust for constraint
  // e.g., 'Tight timeline' => shorter timeline but higher cost
  // e.g., 'Limited budget' => reduce cost, but might add timeline
  if (constraint === "Tight timeline") {
    cost += 1000; // rush cost
    timeline = Math.max(1, timeline - 1); // cut 1 week, not below 1
  } else if (constraint === "Limited budget") {
    cost = Math.max(1000, cost - 1000); // reduce cost by 1k, not < 1000
    timeline += 1; // might add extra time to offset cost
  }

  return {
    cost,
    timeline,
  };
}

export default function InstructionalDesignBriefGenerator() {
  const [brief, setBrief] = useState(null);
  const [approach, setApproach] = useState(null);

  // NEW: store the budget/time estimate
  const [estimate, setEstimate] = useState(null);

  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [userStyleResult, setUserStyleResult] = useState(null);

  // Generate Brief => also Approach
  const generateBrief = () => {
    const topic = getRandomItem(TOPICS);
    const audience = getRandomItem(AUDIENCES);
    const constraint = getRandomItem(CONSTRAINTS);
    const format = getRandomItem(FORMATS);

    const objectives = [
      `Explain the basic principles of ${topic.toLowerCase()}.`,
      `Identify key challenges faced by ${audience}.`,
      `Implement best practices for ${topic.toLowerCase()} in the workplace.`,
    ];

    const newBrief = {
      clientName: `Client ${Math.floor(Math.random() * 1000)}`,
      projectTitle: `${topic} for ${audience}`,
      topic,
      audience,
      constraint,
      format,
      objectives,
    };
    setBrief(newBrief);

    // Clear any old estimate
    setEstimate(null);

    // Also generate approach
    generateApproach();
  };

  // Generate Approach alone
  const generateApproach = () => {
    const style = getRandomItem(LEARNING_STYLES);
    const theory = getRandomItem(LEARNING_THEORIES);
    const model = getRandomItem(ID_MODELS);

    const synergyExplanation = `
By incorporating the principles of ${theory}, the instruction can focus on how learners perceive and process information.
Emphasizing a ${style} learning style ensures that the content delivery matches the modality preferences of the target audience.
Structuring it all under ${model} provides a systematic approach that keeps development phases clear and iterative,
enabling adjustments to maintain learner engagement and alignment with outcomes.
    `;

    const howToApply = `
1. Analysis: Identify the learning context, audience needs, and constraints.
2. Design: Develop objectives and content flow based on ${theory}, accommodating ${style} preferences.
3. Development: Use ${model} steps to create modules that reinforce ${theory} and suit ${style} styles.
4. Implementation: Roll out your training iteratively, collecting feedback.
5. Evaluation: Leverage ${model}'s evaluation strategies to measure learner progress.
    `;

    setApproach({
      style,
      theory,
      model,
      synergyExplanation,
      howToApply,
    });
  };

  // === NEW: GENERATE BUDGET & TIMELINE ===
  // If there's no brief, we might show an alert or do nothing
  const generateEstimate = () => {
    if (!brief) {
      alert("Please generate a Brief first!");
      return;
    }
    // Use the brief's format & constraint
    const { format, constraint } = brief;
    const { cost, timeline } = estimateBudgetAndTime(format, constraint);

    setEstimate({ cost, timeline });
  };

  // Quiz Logic
  const startQuiz = () => {
    setShowQuiz(true);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setUserStyleResult(null);
  };

  const handleAnswer = (style) => {
    setUserAnswers([...userAnswers, style]);
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const finalAnswers = [...userAnswers, style];
      calculateStyleResult(finalAnswers);
    }
  };

  const calculateStyleResult = (answersArray) => {
    const tally = {
      Visual: 0,
      Auditory: 0,
      Kinesthetic: 0,
      "Reading/Writing": 0,
      Social: 0,
      Solo: 0,
    };
    answersArray.forEach((ans) => {
      tally[ans]++;
    });

    let maxStyle = null;
    let maxCount = 0;
    for (let styleKey in tally) {
      if (tally[styleKey] > maxCount) {
        maxStyle = styleKey;
        maxCount = tally[styleKey];
      }
    }
    setUserStyleResult(maxStyle);
  };

  const getApplySteps = (text) =>
    text ? text.split("\n").filter((line) => line.trim() !== "") : [];

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-teal-100 via-rose-50 to-cyan-100 flex flex-col items-center p-8">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h1 className="text-5xl font-black text-gray-800 mb-4 flex items-center justify-center gap-3">
          <Zap className="w-10 h-10 text-blue-600" />
          Instructional Design Brief Generator
        </h1>
        <p className="text-lg text-gray-700 max-w-lg mx-auto leading-relaxed">
          Generate a project brief & approach, discover your learning style, or
          get a budget & timeline estimate!
        </p>
      </motion.div>

      {/* BUTTONS */}
      <div className="flex flex-wrap gap-4 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateBrief}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-full shadow-xl"
        >
          Generate Brief
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateApproach}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-xl"
        >
          Generate Approach
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startQuiz}
          className="bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white font-bold py-3 px-6 rounded-full shadow-xl flex items-center gap-2"
        >
          <HelpCircle className="w-5 h-5" />
          Take Quiz
        </motion.button>

        {/* NEW BUTTON: Generate Budget & Timeline */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateEstimate}
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-6 rounded-full shadow-xl flex items-center gap-2"
        >
          <DollarSign className="w-5 h-5" />
          Generate Budget & Timeline
        </motion.button>
      </div>

      {/* QUIZ SECTION */}
      {showQuiz && !userStyleResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10 max-w-xl w-full bg-gradient-to-r from-orange-400 to-red-400
                     p-6 rounded-xl shadow-2xl text-white ring-1 ring-gray-200"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <HelpCircle className="w-6 h-6" />
            Know Your Learning Style
          </h2>

          <p className="mb-2 font-semibold">
            Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
          </p>
          <p className="mb-6 leading-relaxed">
            {QUIZ_QUESTIONS[currentQuestion].question}
          </p>

          <div className="space-y-4">
            {QUIZ_QUESTIONS[currentQuestion].answers.map((ans, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(ans.style)}
                className="block w-full text-left px-4 py-3
                           bg-white/20 border border-white/20 rounded-lg
                           shadow-sm hover:bg-white/30 text-white"
              >
                {ans.text}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* QUIZ RESULT */}
      {userStyleResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10 max-w-xl w-full bg-white p-6 ring-1 ring-gray-200 rounded-xl shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your Learning Style
          </h2>
          <p className="text-xl text-gray-700 mb-4">
            You got: <strong>{userStyleResult}</strong>
          </p>
          <p className="text-gray-700 leading-relaxed">
            Based on your responses, you may thrive with a{" "}
            <span className="font-semibold">{userStyleResult}</span> approach.
            Explore strategies, activities, and materials that align with this
            style for more effective learning!
          </p>
        </motion.div>
      )}

      {/* PROJECT BRIEF SECTION */}
      {brief && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10 max-w-2xl w-full bg-white/80 backdrop-blur-sm p-6 ring-1 ring-gray-200 rounded-xl shadow-2xl"
        >
          <div className="flex items-center mb-4 space-x-2">
            <ClipboardList className="w-7 h-7 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Project Brief</h2>
          </div>

          <div className="grid gap-2 text-gray-700 leading-relaxed">
            <p>
              <span className="font-semibold">Client:</span> {brief.clientName}
            </p>
            <p>
              <span className="font-semibold">Project Title:</span>{" "}
              {brief.projectTitle}
            </p>
            <p>
              <span className="font-semibold">Topic:</span> {brief.topic}
            </p>
            <p>
              <span className="font-semibold">Audience:</span> {brief.audience}
            </p>
            <p>
              <span className="font-semibold">Constraint:</span>{" "}
              {brief.constraint}
            </p>
            <p>
              <span className="font-semibold">Preferred Format:</span>{" "}
              {brief.format}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Sample Learning Objectives
            </h3>
            <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
              {brief.objectives.map((obj, idx) => (
                <li key={idx}>{obj}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* THEORETICAL APPROACH SECTION */}
      {approach && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10 max-w-2xl w-full bg-white/80 backdrop-blur-sm p-6 ring-1 ring-gray-200 rounded-xl shadow-2xl"
        >
          <div className="flex items-center mb-4 space-x-2">
            <BookOpen className="w-7 h-7 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              Theoretical Approach
            </h2>
          </div>

          <div className="grid gap-2 text-gray-700 leading-relaxed">
            <p>
              <span className="font-semibold">Learning Style:</span>{" "}
              {approach.style}
            </p>
            <p>
              <span className="font-semibold">Learning Theory:</span>{" "}
              {approach.theory}
            </p>
            <p>
              <span className="font-semibold">ID Model:</span> {approach.model}
            </p>
          </div>

          {/* Why They Work Together */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Why This Combination Works
            </h3>
            <p className="whitespace-pre-line text-gray-800">
              {approach.synergyExplanation}
            </p>
          </div>

          {/* HOW TO APPLY (Step Layout) */}
          {approach.howToApply && (
            <div className="mt-8">
              <div className="flex items-center mb-2 space-x-2">
                <ListOrdered className="w-5 h-5 text-pink-600" />
                <h3 className="text-xl font-semibold text-gray-800">
                  How to Structure a Training Using These Elements
                </h3>
              </div>
              <div className="space-y-3">
                {getApplySteps(approach.howToApply).map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-4 bg-pink-50 border-l-4 border-pink-300 rounded-r-lg shadow-sm"
                  >
                    <p className="text-pink-700 font-semibold">{`Step ${
                      index + 1
                    }`}</p>
                    <p className="text-gray-700 whitespace-pre-line">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* BUDGET & TIMELINE ESTIMATES */}
      {estimate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10 max-w-2xl w-full bg-white/80 backdrop-blur-sm p-6 ring-1 ring-gray-200 rounded-xl shadow-2xl"
        >
          <div className="flex items-center mb-4 space-x-2">
            <DollarSign className="w-7 h-7 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              Budget & Timeline
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            <strong>Estimated Budget:</strong> ${estimate.cost} <br />
            <strong>Estimated Timeline:</strong> {estimate.timeline} week
            {estimate.timeline > 1 ? "s" : ""}
          </p>
          <p className="mt-4 text-sm text-gray-500">
            (These are rough estimates based on format & constraints. Adjust as
            needed!)
          </p>
        </motion.div>
      )}
    </div>
  );
}
