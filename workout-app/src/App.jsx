import React, { useState, useEffect } from "react";

// Workout data
const WARMUP_EXERCISES = [
  "Jumping jacks - 30 seconds",
  "Arm circles - 20 each way",
  "Leg swings - 10 each leg",
  "Squats - 10 reps",
  "Cat-cow - 10 reps",
];

const EXERCISES_W1_W4 = [
  {
    name: "PUSH-UPS",
    sets: 3,
    reps: "5-8",
    rest: 90,
    notes: "On knees if needed. Chest to floor, elbows 45°",
  },
  {
    name: "SQUATS",
    sets: 3,
    reps: "10-12",
    rest: 60,
    notes: "Thighs parallel, chest up",
  },
  {
    name: "INVERTED ROWS",
    sets: 3,
    reps: "5-8",
    rest: 90,
    notes: "Under table, pull chest to edge",
  },
  {
    name: "GLUTE BRIDGES",
    sets: 3,
    reps: "12-15",
    rest: 60,
    notes: "Squeeze glutes for 2 seconds at top",
  },
  {
    name: "PLANK",
    sets: 2,
    reps: "75s or more/less",
    rest: 60,
    notes: "Straight line, don't sag",
  },
  {
    name: "WALL SLIDES",
    sets: 2,
    reps: "10",
    rest: 45,
    notes: "Back flat against wall",
  },
];

const EXERCISES_W5_W8 = [
  {
    name: "PUSH-UPS",
    sets: 3,
    reps: "8-12",
    rest: 90,
    notes: "Do regular push-ups if you can, not on knees",
  },
  {
    name: "GOBLET SQUATS",
    sets: 3,
    rest: 75,
    reps: "10-12",
    notes: "Fill up backpack, 2-5kg load, chest up",
  },
  {
    name: "INVERTED ROWS",
    sets: 3,
    reps: "8-12",
    rest: 90,
    notes: "feet elevated on chair if too ez",
  },
  {
    name: "SINGLE-LEG GLUTES BRIDGES",
    sets: 3,
    reps: "8-10",
    rest: 60,
    notes: "Harder variation for glutes/hamstrings",
  },
  {
    name: "SIDE PLANK",
    sets: 3,
    reps: "20-30s per side",
    rest: 60,
    notes: "Build oblique strength",
  },
  {
    name: "SUPERMAN HOLDS",
    sets: 3,
    reps: "15-20s",
    rest: 60,
    notes: "Lower back/posture strength",
  },
  {
    name: "DEAD HANGS",
    sets: 2,
    reps: "20-30s",
    rest: 60,
    notes: "Grip + shoulder health",
  },
];

const EXERCISES_W9_W12 = {
  A: [
    {
      name: "PUSH-UPS (tempo 3-0-1)",
      sets: 4,
      reps: "10-15",
      rest: 90,
      notes: "3 seconds down, explode up fast",
    },
    {
      name: "PIKE PUSH-UPS",
      sets: 3,
      reps: "6-10",
      rest: 90,
      notes: "Hips high, focus on shoulders",
    },
    {
      name: "BULGARIAN SPLIT SQUATS",
      sets: 3,
      reps: "8-10 each leg",
      rest: 90,
      notes: "Back foot elevated on chair",
    },
    {
      name: "LOADED SQUATS",
      sets: 3,
      reps: "12-15",
      rest: 75,
      notes: "5-8kg in backpack, full depth",
    },
    {
      name: "CALF RAISES",
      sets: 3,
      reps: "15-20",
      rest: 60,
      notes: "On step edge for full range",
    },
    {
      name: "PLANK TO DOWN-DOG",
      sets: 3,
      reps: "10",
      rest: 60,
      notes: "Core strength + shoulder mobility",
    },
  ],
  B: [
    {
      name: "INVERTED ROWS",
      sets: 4,
      reps: "10-15",
      rest: 90,
      notes: "Squeeze shoulder blades hard at top",
    },
    {
      name: "BACKPACK ROWS",
      sets: 3,
      reps: "12-15",
      rest: 75,
      notes: "Bent over, 5-8kg load, row to hip",
    },
    {
      name: "REVERSE SNOW ANGELS",
      sets: 3,
      reps: "12-15",
      rest: 60,
      notes: "Face down, arms make angel pattern",
    },
    {
      name: "SINGLE-LEG RDLs",
      sets: 3,
      reps: "8-10 each leg",
      rest: 75,
      notes: "Balance work + hamstring strength",
    },
    {
      name: "DEAD HANGS",
      sets: 3,
      reps: "30-45s",
      rest: 90,
      notes: "If you have a bar. Builds grip strength",
    },
    {
      name: "BICYCLE CRUNCHES",
      sets: 3,
      reps: "20-30",
      rest: 60,
      notes: "Slow and controlled, full rotation",
    },
    {
      name: "BIRD DOGS",
      sets: 3,
      reps: "10 per side",
      rest: 45,
      notes: "Core stability, posture",
    },
  ],
};

const COOLDOWNS = {
  "Weeks 1-4": false,
  "Weeks 5-8": [
    "Child's pose - 30 seconds",
    "Chest doorway stretch - 30 seconds each side",
    "Hip flexor stretch - 30 seconds each leg",
    "Seated hamstring stretch - 45 seconds",
  ],
  "Weeks 9-12": [
    "Brisk walking - 20–30 minutes",
    "Casual cycling - 20–30 minutes",
    "Light jogging - 15–20 minutes (only if comfortable)",
    "Jump rope - 5–10 minutes (build up gradually)",
  ],
};

const WORKOUT_DAYS = {
  "Weeks 1-4": ["Monday", "Wednesday", "Friday"],
  "Weeks 5-8": ["Monday", "Wednesday", "Friday"],
  "Weeks 9-12": ["Monday", "Wednesday", "Thursday", "Friday"],
};

function CancelCross() {
  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
      }}
    >
      <button
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          border: "none",
          background: "#111",
          color: "#fff",
          fontSize: "20px",
          fontWeight: "600",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#e53935";
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#111";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        ✕
      </button>
    </div>
  );
}

function App() {
  const [screen, setScreen] = useState(""); // start, warmup, exercise, rest, ready, exerciseDone, done
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentSet, setCurrentSet] = useState(0);
  const [timer, setTimer] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [startTime, setStartTime] = useState(null);

  const [startDate, setStartDate] = useState(null);
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(1); // default
  const [haveTrainingToday, setHaveTrainingToday] = useState(true);

  function getTodayDate() {
    return new Date().toISOString().split("T")[0];
  }

  function getDateDaysAgo(days) {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split("T")[0];
  }

  function calculateCurrentWeek() {
    if (!startDate) return 1;

    const start = new Date(startDate);
    const today = new Date();
    const daysDiff = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    const weeksPassed = Math.floor(daysDiff / 7);

    const theoreticalWeek = Math.min(weeksPassed + 1, 12);

    return theoreticalWeek;
  }

  const currentWeekSubType = () => {
    if (currentWeek <= 4) return "Weeks 1-4";
    else if (currentWeek <= 8) return "Weeks 5-8";
    else return "Weeks 9-12";
  };

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function getToday() {
    const today = new Date();
    const dayOfWeekName = daysOfWeek[today.getDay()];
    return dayOfWeekName;
  }
  
  const today = getToday();
  const weekType = currentWeekSubType();

  function getNextWorkoutDay() {
    const workout_days = WORKOUT_DAYS[weekType];
    const next_days_in_order = [
      ...daysOfWeek.slice(daysOfWeek.indexOf(today), 7),
      ...daysOfWeek.slice(0, daysOfWeek.indexOf(today)),
    ];

    console.log("The week in order from today", next_days_in_order);
    return next_days_in_order.filter((d) => workout_days.includes(d))[0] ===
      today
      ? next_days_in_order.filter((d) => workout_days.includes(d))[1]
      : next_days_in_order.filter((d) => workout_days.includes(d))[0];
  }

  console.log("Next workout on", getNextWorkoutDay());

  function getCurrentExercises() {
    if (currentWeek <= 4) return EXERCISES_W1_W4;
    else if (currentWeek <= 8) return EXERCISES_W5_W8;
    else {
      const day = new Date().getDay();
      if (day === 1 || day === 4) {
        // Monday or Thursday
        return EXERCISES_W9_W12["A"];
      } else {
        // Wednesday or Saturday
        return EXERCISES_W9_W12["B"];
      }
    }
  }


  // Have workout today or not effect
  useEffect(() => {
    if (WORKOUT_DAYS[weekType].includes(today)) {
      console.log("Today is in workout_days for this week sub type");
      setHaveTrainingToday(true);
    } else setHaveTrainingToday(false);
  }, [weekType, today]);

  // Timer effect for rest
  useEffect(() => {
    if (screen === "rest" && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (screen === "rest" && timer === 0) {
      setCurrentSet((prev) => prev + 1);
      setScreen("ready");
      setCountdown(3);
    }
  }, [screen, timer]);

  // Countdown effect for ready screen
  useEffect(() => {
    if (screen === "ready" && countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (screen === "ready" && countdown === 0) {
      setScreen("exercise");
    }
  }, [screen, countdown]);

  useEffect(() => {
    if (startDate) {
      setCurrentWeek(calculateCurrentWeek());
      setScreen("dashboard");
    } else {
      setScreen("setup");
    }
  }, [startDate]);

  // Load data on mount
  useEffect(() => {
    const saved = localStorage.getItem("workoutData");
    if (saved) {
      const data = JSON.parse(saved);
      setStartDate(data.startDate);
      setWorkoutHistory(data.workoutHistory);
    }
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    if (startDate) {
      const data = {
        startDate,
        workoutHistory,
      };
      localStorage.setItem("workoutData", JSON.stringify(data));
    }
  }, [startDate, workoutHistory]);

  const startWorkout = () => {
    setStartTime(Date.now());
    setScreen("warmup");
  };

  const finishWarmup = () => {
    setCurrentExercise(0);
    setCurrentSet(0);
    setScreen("exercise");
  };

  const exercises = getCurrentExercises();
  const completeSet = () => {
    const ex = exercises[currentExercise];
    if (currentSet < ex.sets - 1) {
      setTimer(ex.rest);
      setScreen("rest");
    } else {
      setScreen("exerciseDone");
    }
  };

  const skipRest = () => {
    setCurrentSet((prev) => prev + 1);
    setScreen("ready");
    setCountdown(3);
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise((prev) => prev + 1);
      setCurrentSet(0);
      setScreen("ready");
      setCountdown(3);
    } else {
      if (COOLDOWNS[weekType]) {
        setScreen("cool-down");
      } else setScreen("done");
    }
  };

  const restart = () => {
    setScreen("dashboard");
    setCurrentExercise(0);
    setCurrentSet(0);
    setTimer(0);
  };

  const exitWorkout = () => {
    if (window.confirm("Exit workout? Progress will not be saved.")) {
      restart();
    }
  };

  const getDuration = () => {
    if (!startTime) return 0;
    return Math.round((Date.now() - startTime) / 60000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const totalSets = exercises.reduce((sum, ex) => sum + ex.sets, 0);

  const finishCooldown = () => {
    setScreen("done");
  };

  const finishWorkout = () => {
    const newWorkout = {
      date: new Date().toISOString().split("T")[0],
      completed: true,
      week: currentWeek,
      exercisesDone: exercises.length,
      duration: getDuration(),
    };
    setWorkoutHistory([...workoutHistory, newWorkout]);
    setScreen("dashboard");
    setCurrentExercise(0);
    setCurrentSet(0);
    setTimer(0);
  };

  return (
    <div style={styles.app}>
      {screen === "setup" && (
        <div style={styles.screen}>
          <h1 style={styles.title}>SETUP</h1>
          <p style={styles.info}>When did you start training?</p>

          <input
            type="date"
            style={styles.datePicker}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => {
              const selectedDate = e.target.value;
              const dayOfWeek = new Date(selectedDate).getDay();

              // Check if Mon (1), Wed (3), or Fri (5)
              if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) {
                setStartDate(selectedDate);
              } else {
                alert(
                  "This program starts on Monday, Wednesday, or Friday only. Please pick one of those days.",
                );
                e.target.value = ""; // Clear the input
              }
            }}
          />

          <button
            style={styles.btn}
            onClick={() => {
              if (startDate) {
                setScreen("dashboard");
              } else {
                alert("Please select a date first!");
              }
            }}
            disabled={!startDate}
          >
            START PROGRAM
          </button>
        </div>
      )}

      {/* DASHBOARD SCREEN */}
      {screen === "dashboard" && (
        <div style={styles.screen}>
          <h1 style={styles.title}>WORKOUT COACH</h1>
          <div style={styles.info}>Week {currentWeek} of 12</div>

          {haveTrainingToday && (
            <div
              style={{
                background: "#00ff88",
                color: "#000",
                padding: "20px 40px",
                borderRadius: "15px",
                margin: "20px 0",
                fontWeight: "700",
                fontSize: "1.5em",
              }}
            >
              ⚠️ TIME TO TRAIN TODAY!
            </div>
          )}

          {haveTrainingToday && (
            <button style={styles.btn} onClick={() => setScreen("start")}>
              🔥 START TODAY'S WORKOUT
            </button>
          )}

          {!haveTrainingToday && (
            <div
              style={{
                background: "#333",
                padding: "20px 40px",
                borderRadius: "15px",
                margin: "20px 0",
                fontSize: "1.3em",
              }}
            >
              😌 Rest Day - Recover and eat well!
            </div>
          )}

          <div style={styles.info}>
            Next workout:{" "}
            <strong style={{ color: "#00ff88" }}>{getNextWorkoutDay()}</strong>
          </div>

          {/* TODO: Add calendar here */}
          {/* TODO: Add streak counter here */}
        </div>
      )}

      {/* START SCREEN */}
      {screen === "start" && (
        <div style={styles.screen}>
          <span onClick={() => setScreen("dashboard")}>
            <CancelCross />
          </span>
          <h1 style={styles.title}>WORKOUT COACH</h1>
          <div style={styles.info}>Week {currentWeek} of 12</div>
          <div style={styles.exerciseList}>
            <h2 style={styles.listTitle}>
              Week {currentWeek} -{" "}
              {currentWeek < 9 ? "Foundation" : "Building Strength"}
            </h2>
            {exercises.map((ex, i) => (
              <div key={i} style={styles.exerciseItem}>
                {i + 1}. {ex.name} - {ex.sets}×{ex.reps}
              </div>
            ))}
          </div>
          <button style={styles.btn} onClick={startWorkout}>
            START WORKOUT
          </button>
        </div>
      )}

      {/* WARMUP SCREEN */}
      {screen === "warmup" && (
        <div style={styles.screen}>
          <h1 style={styles.title}>WARM UP</h1>
          <div style={styles.exerciseList}>
            {WARMUP_EXERCISES.map((ex, i) => (
              <div key={i} style={styles.exerciseItem}>
                {ex}
              </div>
            ))}
          </div>
          <button style={styles.btn} onClick={finishWarmup}>
            DONE - START EXERCISES
          </button>
        </div>
      )}

      {/* EXERCISE SCREEN */}
      {screen === "exercise" && (
        <div style={styles.screen}>
          <div style={styles.progress}>
            Exercise {currentExercise + 1}/{exercises.length} | Set{" "}
            {currentSet + 1}/{exercises[currentExercise].sets}
          </div>
          <button style={styles.exitBtn} onClick={exitWorkout}>
            EXIT
          </button>

          <div style={styles.contentWithHeader}>
            <h1 style={styles.exerciseName}>
              {exercises[currentExercise].name}
            </h1>
            <h2 style={styles.setInfo}>
              Set {currentSet + 1} of {exercises[currentExercise].sets}
            </h2>
            <div style={styles.repsTarget}>
              {exercises[currentExercise].reps} reps
            </div>
            <div style={styles.info}>{exercises[currentExercise].notes}</div>
            <button style={styles.btn} onClick={completeSet}>
              SET COMPLETE
            </button>
          </div>
        </div>
      )}

      {/* REST SCREEN */}
      {screen === "rest" && (
        <div style={styles.screen}>
          <div style={styles.progress}>
            Exercise {currentExercise + 1}/{exercises.length} | Set{" "}
            {currentSet + 1}/{exercises[currentExercise].sets}
          </div>
          <button style={styles.exitBtn} onClick={exitWorkout}>
            EXIT
          </button>

          <div style={styles.contentWithHeader}>
            <h2 style={styles.setInfo}>REST</h2>
            <div
              style={{
                ...styles.timer,
                ...(timer <= 10 ? styles.timerWarning : {}),
              }}
            >
              {formatTime(timer)}
            </div>
            <div style={styles.info}>Next: Set {currentSet + 2}</div>
            <button style={styles.btnSecondary} onClick={skipRest}>
              SKIP REST
            </button>
          </div>
        </div>
      )}

      {/* GET READY SCREEN */}
      {screen === "ready" && (
        <div style={styles.screen}>
          <h2 style={styles.setInfo}>GET READY</h2>
          <h1 style={styles.exerciseName}>{exercises[currentExercise].name}</h1>
          <div style={styles.setInfo}>Set {currentSet + 1}</div>
          <div style={styles.countdown}>{countdown}</div>
        </div>
      )}

      {/* EXERCISE DONE SCREEN */}
      {screen === "exerciseDone" && (
        <div style={styles.screen}>
          <div style={styles.completionIcon}>✅</div>
          <h1 style={styles.exerciseName}>
            {exercises[currentExercise].name} COMPLETE!
          </h1>
          <div style={styles.info}>All sets finished!</div>
          <button style={styles.btn} onClick={nextExercise}>
            NEXT EXERCISE
          </button>
        </div>
      )}

      {/* COOL DOWN TIME */}
      {screen == "cool-down" && COOLDOWNS[weekType] && (
        <div style={styles.screen}>
          <h1 style={styles.title}>COOL DOWN</h1>
          <div style={styles.exerciseList}>
            {COOLDOWNS[weekType].map((ex, i) => (
              <div key={i} style={styles.exerciseItem}>
                {ex}
              </div>
            ))}
          </div>
          <button style={styles.btn} onClick={finishCooldown}>
            DONE
          </button>
        </div>
      )}

      {/* WORKOUT DONE SCREEN */}
      {screen === "done" && (
        <div style={styles.screen}>
          <div style={styles.completionIcon}>🏆</div>
          <h1 style={styles.title}>WORKOUT COMPLETE!</h1>
          <div style={styles.exerciseList}>
            <div style={styles.exerciseItem}>Duration: {getDuration()} min</div>
            <div style={styles.exerciseItem}>Exercises: {exercises.length}</div>
            <div style={{ ...styles.exerciseItem, borderBottom: "none" }}>
              Total Sets: {totalSets}
            </div>
          </div>
          <button style={styles.btn} onClick={finishWorkout}>
            FINISH
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    backgroundColor: "#000",
    color: "#fff",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  screen: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
  },
  title: {
    fontSize: "4em",
    marginBottom: "30px",
    color: "#00ff88",
  },
  exerciseName: {
    fontSize: "4em",
    fontWeight: "800",
    marginBottom: "20px",
    color: "#00ff88",
  },
  setInfo: {
    fontSize: "2em",
    color: "#888",
    marginBottom: "20px",
  },
  repsTarget: {
    fontSize: "5em",
    fontWeight: "800",
    margin: "40px 0",
  },
  info: {
    fontSize: "1.5em",
    color: "#aaa",
    marginBottom: "40px",
    maxWidth: "700px",
    lineHeight: "1.6",
  },
  exerciseList: {
    background: "#111",
    padding: "30px",
    borderRadius: "10px",
    maxWidth: "600px",
    margin: "30px 0",
  },
  listTitle: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "2em",
  },
  exerciseItem: {
    padding: "15px",
    borderBottom: "1px solid #333",
    fontSize: "1.2em",
  },
  btn: {
    background: "#00ff88",
    color: "#000",
    border: "none",
    padding: "25px 60px",
    fontSize: "1.5em",
    fontWeight: "700",
    borderRadius: "10px",
    cursor: "pointer",
    margin: "20px",
  },
  btnSecondary: {
    background: "#333",
    color: "#fff",
    border: "none",
    padding: "25px 60px",
    fontSize: "1.5em",
    fontWeight: "700",
    borderRadius: "10px",
    cursor: "pointer",
    margin: "20px",
  },
  timer: {
    fontSize: "8em",
    fontWeight: "900",
    color: "#00ff88",
    margin: "40px 0",
    fontFamily: "monospace",
  },
  timerWarning: {
    color: "#ff4444",
  },
  countdown: {
    fontSize: "10em",
    fontWeight: "900",
    color: "#00ff88",
    margin: "40px 0",
  },
  completionIcon: {
    fontSize: "8em",
    marginBottom: "30px",
  },
  progress: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    background: "#111",
    padding: "20px",
    borderBottom: "3px solid #00ff88",
    fontSize: "1.2em",
    textAlign: "center",
  },
  exitBtn: {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "#333",
    color: "#fff",
    border: "2px solid #555",
    padding: "12px 30px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
  contentWithHeader: {
    marginTop: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  datePicker: {
    padding: "15px 20px",
    fontSize: "1.2em",
    borderRadius: "8px",
    border: "2px solid #333",
    background: "#111",
    color: "#fff",
    marginBottom: "20px",
    cursor: "pointer",
  },
};

export default App;
