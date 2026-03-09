import React, { useState, useEffect, useRef } from "react";

// ------------------------------- WORKOUT DATA --------------
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
  "Weeks 1-4": ["Monday", "Wednesday", "Friday", "Sunday"],
  "Weeks 5-8": ["Monday", "Wednesday", "Friday"],
  "Weeks 9-12": ["Monday", "Wednesday", "Thursday", "Friday"],
};

// ------------------ HELPER STUFF! -------------------------
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

const STORAGE_KEY = "workout_sessions"; // to avoid typos or using different names for one thing :)
const loadInitialData = () => {
  // to avoid overwriting data
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (err) {
      console.error("Failed to parse:", err);
    }
  }
  return { startDate: "2026-02-23", workoutHistory: [] };
};

function App() {
  const initialData = loadInitialData();
  const [screen, setScreen] = useState("dashboard"); // different screens like: 'dashboard', 'warmup', 'exercise', 'ready',  'rest', 'exerciseDone', 'cool-down', 'done', 'start'
  const [viewDate, setViewDate] = useState(new Date()); // For month/year view on calendar

  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentSet, setCurrentSet] = useState(0);
  const [loggedReps, setLoggedReps] = useState(0);
  const [sessionData, setSessionData] = useState([]);
  const [timer, setTimer] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [startTime, setStartTime] = useState(null);

  const [showSessionLog, setShowSessionLog] = useState(false);
  const [sessionLogDate, setSessionLogDate] = useState("");

  // Initialize from loaded data
  const [startDate, setStartDate] = useState(initialData.startDate);
  const [workoutHistory, setWorkoutHistory] = useState(
    initialData.workoutHistory,
  );

  // Calculate current week based on startDate
  const currentWeek = () => {
    if (!initialData.startDate) return 1;
    const start = new Date(initialData.startDate);
    const today = new Date();
    const daysDiff = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    const weeksPassed = Math.floor(daysDiff / 7);
    return Math.min(weeksPassed + 1, 12);
  };
  const [haveTrainingToday, setHaveTrainingToday] = useState(true);
  const [workoutDoneToday, setWorkoutDoneToday] = useState(false);

  // Dashboard stats, taken from the workoutHistory
  const totalMinutes = workoutHistory.reduce(
    (acc, curr) => acc + (curr.duration || 0),
    0,
  );
  const totalSetsPushed = workoutHistory.reduce(
    (acc, curr) =>
      acc +
        curr.exercises?.reduce((sum, ex) => sum + ex.setsLogged.length, 0) || 0,
    0,
  );
  const completionRate = Math.round(
    (workoutHistory.length / (currentWeek() * 3)) * 100,
  );

  // return today's date as '2026-03-07'
  function getTodayDate() {
    return new Date().toISOString().split("T")[0];
  }

  // As this is progresssive, the weeks are divided in 4. I guess this is self-explanatory 🤷‍♂️
  const currentWeekSubType = () => {
    if (currentWeek() <= 4) return "Weeks 1-4";
    else if (currentWeek() <= 8) return "Weeks 5-8";
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

  // Prevent calling functions more than once
  const today = getToday();
  const weekType = currentWeekSubType();

  function getNextWorkoutDay() {
    // this logic is proudly written by meee 😤
    const workout_days = WORKOUT_DAYS[weekType];
    const next_days_in_order = [
      ...daysOfWeek.slice(daysOfWeek.indexOf(today), 7),
      ...daysOfWeek.slice(0, daysOfWeek.indexOf(today)),
    ];

    return next_days_in_order.filter((d) => workout_days.includes(d))[0] ===
      today
      ? next_days_in_order.filter((d) => workout_days.includes(d))[1]
      : next_days_in_order.filter((d) => workout_days.includes(d))[0];
  }

  function getCurrentExercises() {
    if (currentWeek() <= 4) return EXERCISES_W1_W4;
    else if (currentWeek() <= 8) return EXERCISES_W5_W8;
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

  // ------------------- EFFECTS SECTION -------------------

  // Determine if today is a workout day
  useEffect(() => {
    if (WORKOUT_DAYS[weekType].includes(today)) {
      setHaveTrainingToday(true);
    } else {
      setHaveTrainingToday(false);
    }
  }, [weekType, today]);

  // Timer effect for rest screen
  useEffect(() => {
    if (screen === "rest" && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
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
      const interval = setInterval(
        () => setCountdown((prev) => prev - 1),
        1000,
      );

      if (countdown <= 3) {
        const beep = new Audio(
          "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
        );
        beep.play().catch((e) => console.log("Failed to play audio", e));
      }

      return () => clearInterval(interval);
    } else if (screen === "ready" && countdown === 0) {
      setScreen("exercise");
    }
  }, [screen, countdown]);

  const isMounted = useRef(false);

  // Persist to localStorage on changes, skip first render
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ startDate, workoutHistory }),
    );
  }, [startDate, workoutHistory]);

  // Load workout history on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setStartDate(data.startDate || "2026-02-23");
        const cleanHistory = (data.workoutHistory || []).filter(
          (item) => item && item.date,
        );
        setWorkoutHistory(cleanHistory);
      } catch (err) {
        console.error(
          "Failed to parse workout_sessions from localStorage:",
          err,
        );
      }
    }
  }, []);

  // Determine if today's workout is already done
  useEffect(() => {
    const todayStr = new Date().toISOString().split("T")[0];
    const isDone = workoutHistory.some(
      (w) => w && w.date && w.date === todayStr,
    );
    setWorkoutDoneToday(isDone);
  }, [workoutHistory]);

  // ------------- HELPER FUNCTIONS ------------------
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
    setSessionData((prev) => [
      ...prev,
      { exerciseName: ex.name, setNumber: currentSet, reps: loggedReps },
    ]);
    if (currentSet < ex.sets - 1) {
      setTimer(ex.rest);
      setScreen("rest");
      setLoggedReps(0);
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

  const formatTime = (seconds) => {
    // e.g, turn 75s to 1:15
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const totalSets = exercises.reduce((sum, ex) => sum + ex.sets, 0);

  const finishCooldown = () => {
    setScreen("done");
  };

  const getDuration = () => {
    return startTime ? Math.round((Date.now() - startTime) / 60000) : 0;
  };

  const finishWorkout = () => {
    const completedExercises = exercises.map((ex) => {
      return {
        name: ex.name,
        setsLogged: sessionData
          .filter((e) => e.exerciseName == ex.name)
          .map((e) => e.reps), // to get the reps like [5, 8, 9]
      };
    });
    const newWorkout = {
      id: new Date().toISOString(),
      date: getTodayDate(),
      week: currentWeek(),
      program: weekType,
      duration: getDuration(),
      exercises: completedExercises,
    };

    setScreen("dashboard");
    setCurrentExercise(0);
    setCurrentSet(0);
    setTimer(0);
    setWorkoutHistory((prev) => [...prev, newWorkout]);
    setWorkoutDoneToday(true);
  };

  const getDaysInMonth = (year, month) => {
    // For rendering on calendar
    const date = new Date(year, month, 1);
    const days = [];

    for (let i = 0; i < date.getDay(); i++) {
      days.push(null);
    }

    while (date.getMonth() === month) {
      days.push(date.getDate());
      date.setDate(date.getDate() + 1);
    }

    return days;
  };

  const renderCalendar = () => {
    // yeah that's what I was talking about
    const viewYear = viewDate.getFullYear();
    const viewMonth = viewDate.getMonth();

    const monthDays = getDaysInMonth(viewYear, viewMonth);
    const monthName = viewDate.toLocaleString("default", { month: "long" });

    // Navigation
    const prevMonth = () => setViewDate(new Date(viewYear, viewMonth - 1, 1));
    const nextMonth = () => setViewDate(new Date(viewYear, viewMonth + 1, 1));

    const historyDates = workoutHistory.map((h) => h.date);

    return (
      <div style={styles.calendarContainer}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <button onClick={prevMonth} style={styles.navBtn}>
            &lt;
          </button>
          <h3 style={{ margin: 0, color: "#fff" }}>
            {monthName} {viewYear}
          </h3>
          <button onClick={nextMonth} style={styles.navBtn}>
            &gt;
          </button>
        </div>
        <div style={styles.calendarGrid}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} style={styles.dayHeader}>
              {day}
            </div>
          ))}
          {monthDays.map((date, i) => {
            const dateFormat = `${viewYear}-${(viewMonth + 1).toString().padStart(2, "0")}-${date.toString().padStart(2, "0")}`
            const isWorkoutDay =
              date &&
              historyDates.includes(
                dateFormat,
              );
            const isToday =
              dateFormat == new Date().toISOString().split("T")[0]

            return (
              <div
                key={i}
                style={{
                  ...styles.dayCell,
                  ...(isWorkoutDay ? styles.workoutDay : {}),
                  ...(isToday ? styles.todayCell : {}),
                }}
                title={
                  !isWorkoutDay
                    ? "no workout data for this day"
                    : "click for details"
                }
                onClick={() => {
                  setShowSessionLog((prev) => !prev);
                  setSessionLogDate(dateFormat);
                }}
              >
                {date}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const sessionLog = (date) => {
    const data = workoutHistory.filter((h) => h.date == date)[0].exercises;
    console.log(data);

    return (
      <>
        {data.map((e) => (
          <div>
            <h1>{e.name}</h1>
            <p>Set 1: {e.setsLogged[0]}</p>
          </div>
        ))}
      </>
    );
  };

  const exerciseConfig = {
    // --- REPS-BASED EXERCISES ---
    // Phase: Weeks 1-4
    "PUSH-UPS": { unit: "reps", min: 5, max: 8 },
    SQUATS: { unit: "reps", min: 10, max: 12 },
    "INVERTED ROWS": { unit: "reps", min: 5, max: 8 },
    "GLUTE BRIDGES": { unit: "reps", min: 12, max: 15 },
    "WALL SLIDES": { unit: "reps", min: 10, max: 10 },

    // Phase: Weeks 5-8
    "GOBLET SQUATS": { unit: "reps", min: 10, max: 12, weight: "2-5kg" },
    "SINGLE-LEG GLUTES BRIDGES": { unit: "reps", min: 8, max: 10 },

    // Phase: Weeks 9-12
    "PUSH-UPS (tempo 3-0-1)": { unit: "reps", min: 10, max: 15 },
    "PIKE PUSH-UPS": { unit: "reps", min: 6, max: 10 },
    "BULGARIAN SPLIT SQUATS": { unit: "reps", min: 8, max: 10, perSide: true },
    "LOADED SQUATS": { unit: "reps", min: 12, max: 15, weight: "5-8kg" },
    "CALF RAISES": { unit: "reps", min: 15, max: 20 },
    "PLANK TO DOWN-DOG": { unit: "reps", min: 10, max: 10 },
    "BACKPACK ROWS": { unit: "reps", min: 12, max: 15, weight: "5-8kg" },
    "REVERSE SNOW ANGELS": { unit: "reps", min: 12, max: 15 },
    "SINGLE-LEG RDLs": { unit: "reps", min: 8, max: 10, perSide: true },
    "BICYCLE CRUNCHES": { unit: "reps", min: 20, max: 30 },
    "BIRD DOGS": { unit: "reps", min: 10, max: 10, perSide: true },

    // --- TIME-BASED EXERCISES (Seconds) ---
    PLANK: { unit: "sec", min: 60, max: 75 },
    "SIDE PLANK": { unit: "sec", min: 20, max: 30, perSide: true },
    "SUPERMAN HOLDS": { unit: "sec", min: 15, max: 20 },
    "DEAD HANGS": { unit: "sec", min: 20, max: 45 },
  };

  return (
    <div style={styles.app}>
      {/* Render based on screen state */}
      {/* DASHBOARD SCREEN */}
      {screen === "dashboard" && (
        <div style={styles.screen}>
          <h1 style={styles.title}>WORKOUT COACH</h1>
          <div style={styles.info}>Week {currentWeek()} of 12</div>

          <div style={styles.statsRow}>
            <div style={styles.statItem}>
              <span style={styles.statLabel}>TOTAL TIME</span>
              <span style={styles.statValue}>{totalMinutes}m</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statLabel}>VOLUME</span>
              <span style={styles.statValue}>{totalSetsPushed} sets</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statLabel}>RELIABILITY</span>
              <span style={styles.statValue}>{completionRate}%</span>
            </div>
          </div>

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
              {!workoutDoneToday
                ? "⚠️ TIME TO TRAIN TODAY!"
                : "💪 YOU HAVE DONE TODAY'S WORKOUT!"}
            </div>
          )}

          {haveTrainingToday && !workoutDoneToday && (
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

          {renderCalendar()}
          {sessionLog("2026-02-23")}
        </div>
      )}

      {/* START SCREEN */}
      {screen === "start" && (
        <div style={styles.screen}>
          <span onClick={() => setScreen("dashboard")}>
            <CancelCross />
          </span>
          <h1 style={styles.title}>WORKOUT COACH</h1>
          <div style={styles.info}>Week {currentWeek()} of 12</div>
          <div style={styles.exerciseList}>
            <h2 style={styles.listTitle}>
              Week {currentWeek()} -{" "}
              {currentWeek() < 9 ? "Foundation" : "Building Strength"}
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "cetner",
                gap: "20px",
              }}
            >
              <div style={{ ...styles.info, margin: "0" }}>
                How{" "}
                {exerciseConfig[exercises[currentExercise].name].unit == "kg"
                  ? "much"
                  : "many"}{" "}
                {exerciseConfig[exercises[currentExercise].name].unit} was that?
              </div>
              <div style={{ ...styles.repsTarget, margin: "0" }}>
                {loggedReps > 0
                  ? loggedReps
                  : exerciseConfig[exercises[currentExercise].name].min}
              </div>
              <div
                style={{ display: "flex", gap: "4px", justifySelf: "center" }}
              >
                <p>{exerciseConfig[exercises[currentExercise].name].min}</p>
                <input
                  type="range"
                  value={exerciseConfig[exercises[currentExercise].name].min}
                  min={exerciseConfig[exercises[currentExercise].name].min}
                  max={exerciseConfig[exercises[currentExercise].name].max}
                  onChange={(e) => setLoggedReps(e.target.value)}
                />
                <p>{exerciseConfig[exercises[currentExercise].name].max}</p>
              </div>
            </div>

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
              {formatTime(timer)} {/* remember me? */}
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
      {screen === "cool-down" && COOLDOWNS[weekType] && (
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

// --------- STYLES (yeah, obvious...¯\_(ツ)_/¯) ---------------
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
  calendarContainer: {
    background: "#111",
    padding: "20px",
    borderRadius: "15px",
    marginTop: "30px",
    width: "100%",
    maxWidth: "400px",
  },
  calendarGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "8px",
    textAlign: "center",
  },
  dayHeader: {
    color: "#555",
    fontSize: "0.8em",
    fontWeight: "bold",
    paddingBottom: "10px",
  },
  dayCell: {
    aspectRatio: "1/1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.9em",
    borderRadius: "8px",
    color: "#444", // Dim inactive days
    cursor: "pointer",
  },
  workoutDay: {
    background: "#00ff88",
    color: "#000",
    fontWeight: "bold",
    boxShadow: "0 0 10px rgba(0, 255, 136, 0.3)",
  },
  todayCell: {
    border: "2px solid #00ff88",
    color: "#fff",
  },
  navBtn: {
    background: "#222",
    color: "#00ff88",
    border: "1px solid #333",
    borderRadius: "5px",
    padding: "5px 15px",
    cursor: "pointer",
    fontSize: "1.2em",
    fontWeight: "bold",
  },
  statsRow: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    margin: "20px 0",
    width: "100%",
    maxWidth: "450px",
  },
  statItem: {
    background: "#111",
    padding: "10px 15px",
    borderRadius: "4px",
    flex: 1,
    textAlign: "center",
    borderLeft: "2px solid #00ff88",
  },
  statLabel: {
    display: "block",
    fontSize: "9px",
    color: "#555",
    letterSpacing: "1px",
    marginBottom: "4px",
  },
  statValue: {
    fontSize: "1.2em",
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "monospace",
  },
};

export default App;
