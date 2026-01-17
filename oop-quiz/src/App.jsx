import React, { useState, useMemo, useEffect } from 'react';
import { questions } from './questions';

// Socrative-style colors
const COLORS = {
  primary: '#5C6BC0',      // Socrative purple-blue
  primaryDark: '#3F51B5',
  correct: '#4CAF50',      // Green
  incorrect: '#F44336',    // Red
  background: '#F5F5F5',
  white: '#FFFFFF',
  text: '#333333',
  textLight: '#666666',
  textMuted: '#999999',
  border: '#E0E0E0',
  hover: '#EEEEEE',
};

function App() {
  const [mode, setMode] = useState('menu');
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExp, setShowExp] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(new Set());
  const [userAns, setUserAns] = useState({});
  const [filter, setFilter] = useState('all');
  const [catFilter, setCatFilter] = useState('all');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizSize, setQuizSize] = useState(50);
  const [timeLeft, setTimeLeft] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('all');
  const [shuffledOptions, setShuffledOptions] = useState({});

  const categories = useMemo(() => {
    const cats = [...new Set(questions.map(q => q.cat))];
    return ['all', ...cats.sort()];
  }, []);

  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const diffMatch = filter === 'all' || q.diff === filter;
      const catMatch = catFilter === 'all' || q.cat === catFilter;
      return diffMatch && catMatch;
    });
  }, [filter, catFilter]);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const shuffleQuestionOptions = (question) => {
    const indices = question.opts.map((_, idx) => idx);
    const shuffledIndices = shuffleArray(indices);
    const shuffledOpts = shuffledIndices.map(idx => question.opts[idx]);
    const newCorrectIndex = shuffledIndices.indexOf(question.ans);
    
    return {
      ...question,
      opts: shuffledOpts,
      ans: newCorrectIndex,
      originalAns: question.ans,
      optionMapping: shuffledIndices
    };
  };

  const startQuiz = (size, timed = false) => {
    const shuffled = shuffleArray(filteredQuestions);
    const selected = shuffled.slice(0, Math.min(size, shuffled.length));
    const shuffledWithOptions = selected.map(q => shuffleQuestionOptions(q));
    setQuizQuestions(shuffledWithOptions);
    setQuizSize(size);
    setCurrentQ(0);
    setSelected(null);
    setShowExp(false);
    setScore(0);
    setAnswered(new Set());
    setUserAns({});
    setMode('quiz');
    
    if (timed) {
      setTimeLeft(size * 60);
      setTimerActive(true);
    } else {
      setTimeLeft(null);
      setTimerActive(false);
    }
  };

  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            setTimerActive(false);
            setMode('results');
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const currentQuestion = quizQuestions[currentQ];

  const handleAnswer = (optionIndex) => {
    if (answered.has(currentQ)) return;
    
    setSelected(optionIndex);
    setShowExp(true);
    setAnswered(prev => new Set([...prev, currentQ]));
    setUserAns(prev => ({ ...prev, [currentQ]: optionIndex }));
    
    if (optionIndex === currentQuestion.ans) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelected(userAns[currentQ + 1] ?? null);
      setShowExp(answered.has(currentQ + 1));
    }
  };

  const prevQuestion = () => {
    if (currentQ > 0) {
      setCurrentQ(prev => prev - 1);
      setSelected(userAns[currentQ - 1] ?? null);
      setShowExp(answered.has(currentQ - 1));
    }
  };

  const goToQuestion = (index) => {
    setCurrentQ(index);
    setSelected(userAns[index] ?? null);
    setShowExp(answered.has(index));
  };

  const finishQuiz = () => {
    setTimerActive(false);
    setMode('results');
  };

  const resetQuiz = () => {
    setMode('menu');
    setQuizQuestions([]);
    setCurrentQ(0);
    setSelected(null);
    setShowExp(false);
    setScore(0);
    setAnswered(new Set());
    setUserAns({});
    setTimeLeft(null);
    setTimerActive(false);
  };

  const getScoreColor = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 70) return COLORS.correct;
    if (percentage >= 50) return '#FF9800';
    return COLORS.incorrect;
  };

  const getGrade = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 90) return { grade: 'A', message: 'Excellent work!' };
    if (percentage >= 80) return { grade: 'B', message: 'Great job!' };
    if (percentage >= 70) return { grade: 'C', message: 'Good effort!' };
    if (percentage >= 60) return { grade: 'D', message: 'Keep practicing!' };
    return { grade: 'F', message: 'Review the material and try again.' };
  };

  // Menu Screen - Socrative Style
  if (mode === 'menu') {
    return (
      <div style={{
        minHeight: '100vh',
        background: COLORS.background,
        fontFamily: '"Roboto", "Helvetica Neue", Arial, sans-serif',
      }}>
        {/* Header Bar */}
        <div style={{
          background: COLORS.primary,
          padding: '16px 24px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1 style={{ color: COLORS.white, fontSize: '24px', fontWeight: '500', margin: 0 }}>
              OOP Quiz
            </h1>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
              250 Questions
            </span>
          </div>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 24px' }}>
          {/* Quiz Settings Card */}
          <div style={{
            background: COLORS.white,
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            padding: '32px',
            marginBottom: '24px',
          }}>
            <h2 style={{ color: COLORS.text, fontSize: '20px', fontWeight: '500', marginBottom: '24px' }}>
              Quiz Settings
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
              <div>
                <label style={{ display: 'block', color: COLORS.textLight, fontSize: '14px', marginBottom: '8px', fontWeight: '500' }}>
                  Difficulty
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '4px',
                    border: `1px solid ${COLORS.border}`,
                    background: COLORS.white,
                    color: COLORS.text,
                    fontSize: '14px',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', color: COLORS.textLight, fontSize: '14px', marginBottom: '8px', fontWeight: '500' }}>
                  Category
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '4px',
                    border: `1px solid ${COLORS.border}`,
                    background: COLORS.white,
                    color: COLORS.text,
                    fontSize: '14px',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                  value={catFilter}
                  onChange={(e) => setCatFilter(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{
              background: '#F8F9FA',
              padding: '16px',
              borderRadius: '4px',
              marginBottom: '32px',
              textAlign: 'center',
            }}>
              <span style={{ color: COLORS.textLight, fontSize: '14px' }}>
                {filteredQuestions.length} questions available
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              <button
                onClick={() => startQuiz(50)}
                style={{
                  padding: '16px 24px',
                  background: COLORS.primary,
                  color: COLORS.white,
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '15px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseOver={(e) => e.target.style.background = COLORS.primaryDark}
                onMouseOut={(e) => e.target.style.background = COLORS.primary}
              >
                Quick Quiz (50)
              </button>
              <button
                onClick={() => startQuiz(50, true)}
                style={{
                  padding: '16px 24px',
                  background: '#FF9800',
                  color: COLORS.white,
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '15px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseOver={(e) => e.target.style.background = '#F57C00'}
                onMouseOut={(e) => e.target.style.background = '#FF9800'}
              >
                Timed Quiz (50)
              </button>
              <button
                onClick={() => startQuiz(100)}
                style={{
                  padding: '16px 24px',
                  background: COLORS.white,
                  color: COLORS.primary,
                  border: `2px solid ${COLORS.primary}`,
                  borderRadius: '4px',
                  fontSize: '15px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => { e.target.style.background = COLORS.primary; e.target.style.color = COLORS.white; }}
                onMouseOut={(e) => { e.target.style.background = COLORS.white; e.target.style.color = COLORS.primary; }}
              >
                Standard (100)
              </button>
              <button
                onClick={() => startQuiz(filteredQuestions.length)}
                style={{
                  padding: '16px 24px',
                  background: COLORS.white,
                  color: COLORS.primary,
                  border: `2px solid ${COLORS.primary}`,
                  borderRadius: '4px',
                  fontSize: '15px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => { e.target.style.background = COLORS.primary; e.target.style.color = COLORS.white; }}
                onMouseOut={(e) => { e.target.style.background = COLORS.white; e.target.style.color = COLORS.primary; }}
              >
                Full Practice ({filteredQuestions.length})
              </button>
            </div>
          </div>

          {/* Category Distribution */}
          <div style={{
            background: COLORS.white,
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            padding: '24px',
          }}>
            <h3 style={{ color: COLORS.text, fontSize: '16px', fontWeight: '500', marginBottom: '16px' }}>
              Question Distribution
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {categories.filter(c => c !== 'all').map(cat => {
                const count = questions.filter(q => q.cat === cat).length;
                return (
                  <div key={cat} style={{
                    padding: '8px 16px',
                    background: '#F8F9FA',
                    borderRadius: '20px',
                    fontSize: '13px',
                  }}>
                    <span style={{ color: COLORS.textLight }}>{cat}: </span>
                    <span style={{ color: COLORS.text, fontWeight: '500' }}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Screen - Socrative Style
  if (mode === 'quiz') {
    const progress = ((currentQ + 1) / quizQuestions.length) * 100;
    const diffColors = { easy: COLORS.correct, medium: '#FF9800', hard: COLORS.incorrect };

    return (
      <div style={{
        minHeight: '100vh',
        background: COLORS.background,
        fontFamily: '"Roboto", "Helvetica Neue", Arial, sans-serif',
      }}>
        {/* Header Bar */}
        <div style={{
          background: COLORS.primary,
          padding: '12px 24px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: COLORS.white, fontSize: '16px', fontWeight: '500' }}>
              Question {currentQ + 1} of {quizQuestions.length}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {timeLeft !== null && (
                <span style={{
                  background: 'rgba(255,255,255,0.2)',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  color: COLORS.white,
                  fontSize: '14px',
                  fontWeight: '500',
                }}>
                  {formatTime(timeLeft)}
                </span>
              )}
              <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
                Score: {score}/{answered.size}
              </span>
              <button
                onClick={finishQuiz}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  color: COLORS.white,
                  border: 'none',
                  padding: '6px 16px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Finish
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ background: '#E8EAF6', height: '4px' }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: COLORS.primary,
            transition: 'width 0.3s ease',
          }} />
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px' }}>
          {/* Question Navigation Pills */}
          <div style={{
            background: COLORS.white,
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {quizQuestions.map((_, idx) => {
                let bgColor = COLORS.border;
                let textColor = COLORS.textMuted;
                
                if (answered.has(idx)) {
                  bgColor = userAns[idx] === quizQuestions[idx].ans ? COLORS.correct : COLORS.incorrect;
                  textColor = COLORS.white;
                }
                if (idx === currentQ) {
                  bgColor = answered.has(idx) ? bgColor : COLORS.primary;
                  textColor = COLORS.white;
                }
                
                return (
                  <button
                    key={idx}
                    onClick={() => goToQuestion(idx)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '4px',
                      border: 'none',
                      background: bgColor,
                      color: textColor,
                      fontSize: '13px',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Card */}
          <div style={{
            background: COLORS.white,
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            overflow: 'hidden',
          }}>
            {/* Category & Difficulty Badge */}
            <div style={{
              padding: '12px 24px',
              background: '#F8F9FA',
              borderBottom: `1px solid ${COLORS.border}`,
              display: 'flex',
              gap: '8px',
            }}>
              <span style={{
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '500',
                background: `${diffColors[currentQuestion.diff]}20`,
                color: diffColors[currentQuestion.diff],
              }}>
                {currentQuestion.diff.toUpperCase()}
              </span>
              <span style={{
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '500',
                background: `${COLORS.primary}15`,
                color: COLORS.primary,
              }}>
                {currentQuestion.cat}
              </span>
            </div>

            {/* Question Text */}
            <div style={{ padding: '24px' }}>
              <pre style={{
                color: COLORS.text,
                fontSize: '16px',
                lineHeight: '1.7',
                margin: '0 0 24px 0',
                whiteSpace: 'pre-wrap',
                fontFamily: 'inherit',
                background: '#F8F9FA',
                padding: '20px',
                borderRadius: '4px',
                border: `1px solid ${COLORS.border}`,
              }}>
                {currentQuestion.q}
              </pre>

              {/* Options */}
              <div>
                {currentQuestion.opts.map((opt, idx) => {
                  let bgColor = COLORS.white;
                  let borderColor = COLORS.border;
                  let textColor = COLORS.text;

                  if (showExp) {
                    if (idx === currentQuestion.ans) {
                      bgColor = '#E8F5E9';
                      borderColor = COLORS.correct;
                      textColor = '#2E7D32';
                    } else if (idx === selected && idx !== currentQuestion.ans) {
                      bgColor = '#FFEBEE';
                      borderColor = COLORS.incorrect;
                      textColor = '#C62828';
                    }
                  } else if (idx === selected) {
                    borderColor = COLORS.primary;
                    bgColor = '#E8EAF6';
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      style={{
                        padding: '16px 20px',
                        marginBottom: '10px',
                        borderRadius: '4px',
                        border: `2px solid ${borderColor}`,
                        background: bgColor,
                        cursor: answered.has(currentQ) ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        transition: 'all 0.15s ease',
                        opacity: showExp && idx !== currentQuestion.ans && idx !== selected ? 0.5 : 1,
                      }}
                      onMouseOver={(e) => {
                        if (!answered.has(currentQ)) {
                          e.currentTarget.style.borderColor = COLORS.primary;
                          e.currentTarget.style.background = '#F5F5F5';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!answered.has(currentQ) && idx !== selected) {
                          e.currentTarget.style.borderColor = COLORS.border;
                          e.currentTarget.style.background = COLORS.white;
                        }
                      }}
                    >
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: showExp && idx === currentQuestion.ans ? COLORS.correct :
                                   showExp && idx === selected ? COLORS.incorrect :
                                   idx === selected ? COLORS.primary : '#F5F5F5',
                        color: (showExp && (idx === currentQuestion.ans || idx === selected)) || idx === selected ? COLORS.white : COLORS.textMuted,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '600',
                        fontSize: '13px',
                        flexShrink: 0,
                      }}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span style={{ color: textColor, fontSize: '15px', flex: 1 }}>{opt}</span>
                      {showExp && idx === currentQuestion.ans && (
                        <span style={{ color: COLORS.correct, fontSize: '18px' }}>✓</span>
                      )}
                      {showExp && idx === selected && idx !== currentQuestion.ans && (
                        <span style={{ color: COLORS.incorrect, fontSize: '18px' }}>✗</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Explanation */}
              {showExp && (
                <div style={{
                  marginTop: '20px',
                  padding: '20px',
                  background: '#E3F2FD',
                  borderRadius: '4px',
                  borderLeft: `4px solid ${COLORS.primary}`,
                }}>
                  <div style={{ color: COLORS.primaryDark, fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>
                    Explanation
                  </div>
                  <p style={{ color: COLORS.text, lineHeight: '1.6', margin: 0, fontSize: '14px' }}>
                    {currentQuestion.exp}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '24px',
          }}>
            <button
              onClick={prevQuestion}
              disabled={currentQ === 0}
              style={{
                padding: '12px 24px',
                background: currentQ === 0 ? '#E0E0E0' : COLORS.white,
                color: currentQ === 0 ? COLORS.textMuted : COLORS.text,
                border: `1px solid ${COLORS.border}`,
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: currentQ === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              ← Previous
            </button>

            {answered.size === quizQuestions.length ? (
              <button
                onClick={finishQuiz}
                style={{
                  padding: '12px 32px',
                  background: COLORS.correct,
                  color: COLORS.white,
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                View Results
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                disabled={currentQ === quizQuestions.length - 1}
                style={{
                  padding: '12px 24px',
                  background: currentQ === quizQuestions.length - 1 ? '#E0E0E0' : COLORS.primary,
                  color: currentQ === quizQuestions.length - 1 ? COLORS.textMuted : COLORS.white,
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: currentQ === quizQuestions.length - 1 ? 'not-allowed' : 'pointer',
                }}
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Results Screen - Socrative Style
  if (mode === 'results') {
    const percentage = ((score / quizQuestions.length) * 100).toFixed(1);
    const { grade, message } = getGrade();

    const categoryStats = {};
    quizQuestions.forEach((q, idx) => {
      if (!categoryStats[q.cat]) {
        categoryStats[q.cat] = { correct: 0, total: 0 };
      }
      categoryStats[q.cat].total++;
      if (userAns[idx] === q.ans) {
        categoryStats[q.cat].correct++;
      }
    });

    const filteredReviewQuestions = quizQuestions.filter((q, idx) => {
      if (reviewFilter === 'all') return true;
      if (reviewFilter === 'correct') return userAns[idx] === q.ans;
      if (reviewFilter === 'wrong') return userAns[idx] !== q.ans;
      return true;
    });

    return (
      <div style={{
        minHeight: '100vh',
        background: COLORS.background,
        fontFamily: '"Roboto", "Helvetica Neue", Arial, sans-serif',
      }}>
        {/* Header Bar */}
        <div style={{
          background: COLORS.primary,
          padding: '16px 24px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h1 style={{ color: COLORS.white, fontSize: '20px', fontWeight: '500', margin: 0 }}>
              Quiz Results
            </h1>
          </div>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
          {/* Score Card */}
          <div style={{
            background: COLORS.white,
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            padding: '40px',
            textAlign: 'center',
            marginBottom: '24px',
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: `${getScoreColor()}15`,
              border: `4px solid ${getScoreColor()}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}>
              <span style={{
                fontSize: '36px',
                fontWeight: '700',
                color: getScoreColor(),
              }}>
                {percentage}%
              </span>
            </div>
            
            <div style={{
              fontSize: '48px',
              fontWeight: '700',
              color: getScoreColor(),
              marginBottom: '8px',
            }}>
              Grade: {grade}
            </div>
            
            <p style={{ color: COLORS.text, fontSize: '18px', marginBottom: '8px' }}>
              {score} out of {quizQuestions.length} correct
            </p>
            <p style={{ color: COLORS.textMuted, fontSize: '14px' }}>{message}</p>
          </div>

          {/* Category Breakdown */}
          <div style={{
            background: COLORS.white,
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            padding: '24px',
            marginBottom: '24px',
          }}>
            <h3 style={{ color: COLORS.text, fontSize: '16px', fontWeight: '500', marginBottom: '20px' }}>
              Performance by Category
            </h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              {Object.entries(categoryStats).map(([cat, { correct, total }]) => {
                const catPercent = ((correct / total) * 100).toFixed(0);
                const color = catPercent >= 70 ? COLORS.correct : catPercent >= 50 ? '#FF9800' : COLORS.incorrect;
                return (
                  <div key={cat}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ color: COLORS.text, fontSize: '14px' }}>{cat}</span>
                      <span style={{ color: COLORS.textMuted, fontSize: '14px' }}>{correct}/{total} ({catPercent}%)</span>
                    </div>
                    <div style={{ height: '8px', background: '#EEEEEE', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${catPercent}%`,
                        height: '100%',
                        background: color,
                        borderRadius: '4px',
                        transition: 'width 0.3s ease',
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Review Section */}
          <div style={{
            background: COLORS.white,
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            padding: '24px',
            marginBottom: '24px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: COLORS.text, fontSize: '16px', fontWeight: '500', margin: 0 }}>
                Review Questions
              </h3>
              <select
                value={reviewFilter}
                onChange={(e) => setReviewFilter(e.target.value)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: `1px solid ${COLORS.border}`,
                  background: COLORS.white,
                  color: COLORS.text,
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                <option value="all">All Questions</option>
                <option value="wrong">Incorrect Only</option>
                <option value="correct">Correct Only</option>
              </select>
            </div>

            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
              {filteredReviewQuestions.map((q) => {
                const originalIdx = quizQuestions.indexOf(q);
                const isCorrect = userAns[originalIdx] === q.ans;
                return (
                  <div key={q.id} style={{
                    padding: '20px',
                    marginBottom: '12px',
                    borderRadius: '4px',
                    background: isCorrect ? '#E8F5E9' : '#FFEBEE',
                    borderLeft: `4px solid ${isCorrect ? COLORS.correct : COLORS.incorrect}`,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <span style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: isCorrect ? COLORS.correct : COLORS.incorrect,
                        color: COLORS.white,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                      }}>
                        {isCorrect ? '✓' : '✗'}
                      </span>
                      <span style={{ color: COLORS.textMuted, fontSize: '13px' }}>
                        Q{originalIdx + 1} • {q.cat} • {q.diff}
                      </span>
                    </div>
                    <pre style={{
                      color: COLORS.text,
                      whiteSpace: 'pre-wrap',
                      fontFamily: 'inherit',
                      fontSize: '14px',
                      marginBottom: '12px',
                      lineHeight: '1.5',
                    }}>
                      {q.q}
                    </pre>
                    <div style={{ fontSize: '14px', color: COLORS.textLight }}>
                      <div style={{ marginBottom: '4px' }}>
                        <strong>Your answer:</strong> {q.opts[userAns[originalIdx]]}
                      </div>
                      {!isCorrect && (
                        <div style={{ color: '#2E7D32' }}>
                          <strong>Correct answer:</strong> {q.opts[q.ans]}
                        </div>
                      )}
                    </div>
                    <div style={{
                      marginTop: '12px',
                      padding: '12px',
                      background: 'rgba(255,255,255,0.7)',
                      borderRadius: '4px',
                      fontSize: '13px',
                      color: COLORS.textLight,
                      lineHeight: '1.5',
                    }}>
                      {q.exp}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              onClick={resetQuiz}
              style={{
                padding: '14px 32px',
                background: COLORS.primary,
                color: COLORS.white,
                border: 'none',
                borderRadius: '4px',
                fontSize: '15px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              New Quiz
            </button>
            <button
              onClick={() => startQuiz(quizSize)}
              style={{
                padding: '14px 32px',
                background: COLORS.white,
                color: COLORS.primary,
                border: `2px solid ${COLORS.primary}`,
                borderRadius: '4px',
                fontSize: '15px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              Retry Same Size
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default App;
