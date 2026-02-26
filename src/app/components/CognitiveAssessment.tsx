import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Brain,
  Clock,
  Pause,
  Play,
  Save,
  ArrowRight,
  RotateCcw,
  CheckCircle,
  Lightbulb,
  Grid3X3,
  Zap,
  MessageSquare,
} from "lucide-react";

type TestModule = "memory" | "pattern" | "reaction" | "clock" | "language";

const modules: { id: TestModule; title: string; icon: any; description: string }[] = [
  { id: "memory", title: "Memory Recall", icon: Brain, description: "Remember and recall a list of words" },
  { id: "pattern", title: "Pattern Recognition", icon: Grid3X3, description: "Identify patterns in sequences" },
  { id: "reaction", title: "Reaction Time", icon: Zap, description: "Test your response speed" },
  { id: "clock", title: "Clock Drawing", icon: Clock, description: "Draw a clock face on canvas" },
  { id: "language", title: "Language Fluency", icon: MessageSquare, description: "Word generation task" },
];

const wordList = ["OCEAN", "GARDEN", "BICYCLE", "SUNSET", "LIBRARY", "MOUNTAIN", "CANDLE", "BRIDGE"];

export default function CognitiveAssessment() {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState<TestModule>("memory");
  const [completedModules, setCompletedModules] = useState<TestModule[]>([]);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Memory test state
  const [memoryPhase, setMemoryPhase] = useState<"study" | "recall" | "results">("study");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [recalledWords, setRecalledWords] = useState<string[]>([]);
  const [recallInput, setRecallInput] = useState("");

  // Pattern test state
  const [patternSequence, setPatternSequence] = useState<number[]>([]);
  const [patternAnswer, setPatternAnswer] = useState("");
  const [patternResult, setPatternResult] = useState<boolean | null>(null);

  // Reaction test state
  const [reactionState, setReactionState] = useState<"waiting" | "ready" | "go" | "done">("waiting");
  const [reactionTime, setReactionTime] = useState(0);
  const [reactionStart, setReactionStart] = useState(0);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);

  // Clock drawing state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [clockSubmitted, setClockSubmitted] = useState(false);

  // Language test state
  const [languageWords, setLanguageWords] = useState<string[]>([]);
  const [languageInput, setLanguageInput] = useState("");
  const [languageTimer, setLanguageTimer] = useState(60);

  const totalModules = modules.length;
  const progress = (completedModules.length / totalModules) * 100;

  useEffect(() => {
    let interval: any;
    if (isRunning && !isPaused) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  // Memory word display
  useEffect(() => {
    if (activeModule === "memory" && memoryPhase === "study" && isRunning) {
      if (currentWordIndex < wordList.length) {
        const timeout = setTimeout(() => {
          setCurrentWordIndex((i) => i + 1);
        }, 2000);
        return () => clearTimeout(timeout);
      } else {
        setMemoryPhase("recall");
      }
    }
  }, [activeModule, memoryPhase, currentWordIndex, isRunning]);

  // Pattern generation
  useEffect(() => {
    if (activeModule === "pattern" && patternSequence.length === 0) {
      const base = [2, 5, 8, 11, 14];
      setPatternSequence(base);
    }
  }, [activeModule]);

  // Language timer
  useEffect(() => {
    let interval: any;
    if (activeModule === "language" && isRunning && languageTimer > 0) {
      interval = setInterval(() => setLanguageTimer((t) => t - 1), 1000);
    }
    if (languageTimer === 0 && activeModule === "language") {
      completeModule("language");
    }
    return () => clearInterval(interval);
  }, [activeModule, isRunning, languageTimer]);

  const startModule = (module: TestModule) => {
    setActiveModule(module);
    setIsRunning(true);
    setIsPaused(false);
  };

  const completeModule = (module: TestModule) => {
    if (!completedModules.includes(module)) {
      setCompletedModules((prev) => [...prev, module]);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Canvas drawing
  const getCanvasPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const pos = getCanvasPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const pos = getCanvasPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = "#0891b2";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  const stopDraw = () => setIsDrawing(false);

  const clearCanvas = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !canvasRef.current) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    // Redraw circle guide
    drawClockGuide();
  };

  const drawClockGuide = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !canvasRef.current) return;
    const size = canvasRef.current.width;
    const center = size / 2;
    const radius = size / 2 - 20;
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, []);

  useEffect(() => {
    if (activeModule === "clock" && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 300;
      canvas.height = 300;
      drawClockGuide();
    }
  }, [activeModule, drawClockGuide]);

  // Reaction time game
  const startReactionTest = () => {
    setReactionState("ready");
    const delay = 1500 + Math.random() * 3000;
    setTimeout(() => {
      setReactionState("go");
      setReactionStart(Date.now());
    }, delay);
  };

  const handleReactionClick = () => {
    if (reactionState === "go") {
      const time = Date.now() - reactionStart;
      setReactionTime(time);
      setReactionTimes((prev) => [...prev, time]);
      setReactionState("done");
    } else if (reactionState === "ready") {
      setReactionState("waiting");
    }
  };

  const renderModule = () => {
    switch (activeModule) {
      case "memory":
        return (
          <div className="space-y-6">
            {memoryPhase === "study" && (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-6">Memorize each word as it appears</p>
                <AnimatePresence mode="wait">
                  {currentWordIndex < wordList.length ? (
                    <motion.div
                      key={currentWordIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-4xl text-primary py-12"
                    >
                      {wordList[currentWordIndex]}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
                <div className="flex justify-center gap-1.5 mt-4">
                  {wordList.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        i <= currentWordIndex ? "bg-primary" : "bg-border"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
            {memoryPhase === "recall" && (
              <div className="space-y-4">
                <p className="text-muted-foreground text-center">
                  Type each word you remember and press Enter
                </p>
                <div className="flex gap-2 max-w-md mx-auto">
                  <input
                    type="text"
                    value={recallInput}
                    onChange={(e) => setRecallInput(e.target.value.toUpperCase())}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && recallInput.trim()) {
                        setRecalledWords((prev) => [...prev, recallInput.trim()]);
                        setRecallInput("");
                      }
                    }}
                    className="flex-1 px-4 py-3 bg-input-background rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    placeholder="Type a word..."
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setMemoryPhase("results");
                      completeModule("memory");
                    }}
                    className="px-4 py-3 bg-primary text-primary-foreground rounded-xl"
                  >
                    Done
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 justify-center mt-4">
                  {recalledWords.map((w, i) => (
                    <span key={i} className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm">
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {memoryPhase === "results" && (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="text-foreground text-xl mb-2">
                  {recalledWords.filter((w) => wordList.includes(w)).length} / {wordList.length} words recalled
                </p>
                <p className="text-muted-foreground">Memory recall test completed</p>
              </div>
            )}
          </div>
        );

      case "pattern":
        return (
          <div className="space-y-6 text-center py-8">
            <p className="text-muted-foreground">What number comes next in the sequence?</p>
            <div className="flex justify-center gap-3 flex-wrap">
              {patternSequence.map((n, i) => (
                <div
                  key={i}
                  className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-xl"
                >
                  {n}
                </div>
              ))}
              <div className="w-14 h-14 rounded-xl border-2 border-dashed border-primary/30 flex items-center justify-center text-primary text-xl">
                ?
              </div>
            </div>
            <div className="flex gap-2 max-w-xs mx-auto">
              <input
                type="number"
                value={patternAnswer}
                onChange={(e) => setPatternAnswer(e.target.value)}
                className="flex-1 px-4 py-3 bg-input-background rounded-xl border border-border focus:border-primary text-center outline-none"
                placeholder="Your answer"
              />
              <button
                onClick={() => {
                  setPatternResult(parseInt(patternAnswer) === 17);
                  completeModule("pattern");
                }}
                className="px-4 py-3 bg-primary text-primary-foreground rounded-xl"
              >
                Submit
              </button>
            </div>
            {patternResult !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${
                  patternResult
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                }`}
              >
                {patternResult ? (
                  <>
                    <CheckCircle className="w-4 h-4" /> Correct! The pattern adds 3 each time.
                  </>
                ) : (
                  <>
                    <Lightbulb className="w-4 h-4" /> The answer is 17 (each number increases by 3)
                  </>
                )}
              </motion.div>
            )}
          </div>
        );

      case "reaction":
        return (
          <div className="text-center py-8">
            {reactionState === "waiting" && (
              <div className="space-y-4">
                <p className="text-muted-foreground">Click the button when it turns green. Be quick!</p>
                <button
                  onClick={startReactionTest}
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-xl mx-auto"
                >
                  Start Test
                </button>
                {reactionTimes.length > 0 && (
                  <div className="mt-4">
                    <p className="text-muted-foreground text-sm">
                      Average: {Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length)}ms
                      ({reactionTimes.length} attempts)
                    </p>
                    {reactionTimes.length >= 3 && (
                      <button
                        onClick={() => completeModule("reaction")}
                        className="mt-3 px-4 py-2 bg-green-500 text-white rounded-xl"
                      >
                        Complete Test
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
            {reactionState === "ready" && (
              <button
                onClick={handleReactionClick}
                className="w-48 h-48 rounded-full bg-red-500 text-white flex items-center justify-center mx-auto text-lg shadow-lg"
              >
                Wait...
              </button>
            )}
            {reactionState === "go" && (
              <motion.button
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                onClick={handleReactionClick}
                className="w-48 h-48 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto text-lg shadow-lg"
              >
                TAP NOW!
              </motion.button>
            )}
            {reactionState === "done" && (
              <div className="space-y-4">
                <div className="w-48 h-48 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto">
                  <div>
                    <p className="text-3xl text-primary">{reactionTime}ms</p>
                    <p className="text-muted-foreground text-sm">Reaction Time</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setReactionState("waiting");
                  }}
                  className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl"
                >
                  Try Again ({reactionTimes.length}/3)
                </button>
              </div>
            )}
          </div>
        );

      case "clock":
        return (
          <div className="space-y-4 text-center">
            <p className="text-muted-foreground">
              Draw a clock showing the time <strong className="text-foreground">10:10</strong>
            </p>
            <div className="flex justify-center">
              <canvas
                ref={canvasRef}
                className="border-2 border-border rounded-xl cursor-crosshair bg-white touch-none"
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={stopDraw}
                onMouseLeave={stopDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={stopDraw}
              />
            </div>
            <div className="flex justify-center gap-3">
              <button
                onClick={clearCanvas}
                className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-muted-foreground hover:bg-muted"
              >
                <RotateCcw className="w-4 h-4" /> Clear
              </button>
              <button
                onClick={() => {
                  setClockSubmitted(true);
                  completeModule("clock");
                }}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl"
              >
                <CheckCircle className="w-4 h-4" /> Submit Drawing
              </button>
            </div>
            {clockSubmitted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-600 dark:text-green-400"
              >
                Drawing submitted for AI analysis
              </motion.p>
            )}
          </div>
        );

      case "language":
        return (
          <div className="space-y-6 text-center py-4">
            <div>
              <p className="text-muted-foreground mb-2">
                Name as many <strong className="text-foreground">animals</strong> as you can in 60 seconds
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-xl">
                <Clock className="w-4 h-4 text-primary" />
                <span className={`text-xl ${languageTimer <= 10 ? "text-red-500" : "text-foreground"}`}>
                  {languageTimer}s
                </span>
              </div>
            </div>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="text"
                value={languageInput}
                onChange={(e) => setLanguageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && languageInput.trim()) {
                    setLanguageWords((prev) => [...prev, languageInput.trim()]);
                    setLanguageInput("");
                  }
                }}
                className="flex-1 px-4 py-3 bg-input-background rounded-xl border border-border focus:border-primary outline-none"
                placeholder="Type an animal name..."
                disabled={languageTimer === 0}
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {languageWords.map((w, i) => (
                <span key={i} className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm">
                  {w}
                </span>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">{languageWords.length} words entered</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl text-foreground mb-2">Cognitive Assessment</h1>
          <p className="text-muted-foreground">
            Complete each module at your own pace. You can pause and save progress anytime.
          </p>
        </motion.div>

        {/* Top bar */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-foreground">{formatTime(timer)}</span>
              </div>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground"
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                {isPaused ? "Resume" : "Pause"}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground">
                <Save className="w-4 h-4" /> Save
              </button>
              <div className="text-sm text-muted-foreground">
                {completedModules.length}/{totalModules} modules
              </div>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          {/* Module sidebar */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-4 h-fit">
            <h3 className="text-foreground mb-3 px-1">Test Modules</h3>
            <div className="space-y-1.5">
              {modules.map((mod) => {
                const Icon = mod.icon;
                const isCompleted = completedModules.includes(mod.id);
                const isActive = activeModule === mod.id;
                return (
                  <button
                    key={mod.id}
                    onClick={() => startModule(mod.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : isCompleted
                        ? "text-green-600 dark:text-green-400 hover:bg-muted"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    ) : (
                      <Icon className="w-4 h-4 flex-shrink-0" />
                    )}
                    <span className="text-sm">{mod.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active module */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6 sm:p-8 min-h-[400px]">
            <div className="flex items-center gap-3 mb-6">
              {(() => {
                const mod = modules.find((m) => m.id === activeModule);
                const Icon = mod?.icon || Brain;
                return (
                  <>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-foreground">{mod?.title}</h2>
                      <p className="text-muted-foreground text-sm">{mod?.description}</p>
                    </div>
                  </>
                );
              })()}
            </div>
            {renderModule()}
          </div>
        </div>

        {/* Complete assessment */}
        {completedModules.length === totalModules && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <button
              onClick={() => navigate("/results")}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-xl shadow-lg shadow-primary/20"
            >
              Proceed to Results
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Disclaimer */}
        <p className="text-muted-foreground text-xs text-center mt-8">
          This is a screening tool, not a medical diagnosis. Results should be reviewed by a qualified healthcare professional.
        </p>
      </div>
    </div>
  );
}