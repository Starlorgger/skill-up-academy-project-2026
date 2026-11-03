import React, { useState, useEffect } from 'react';
import { Course, Lesson, Quiz } from '../types';
import { useAuth } from '../context/AuthContext';
import { triggerHaptic } from '../utils/haptics';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  HelpCircle, 
  Play, 
  Code, 
  Lightbulb, 
  Award,
  Video,
  FileText,
  Bookmark
} from 'lucide-react';

interface LessonPlayerViewProps {
  course: Course;
  initialLessonId: string;
  onBackToCourse: () => void;
  onOpenAiAssistant: (topic?: string) => void;
  onOpenCertificateModal: () => void;
  onOpenHelp?: () => void;
}

export const LessonPlayerView: React.FC<LessonPlayerViewProps> = ({
  course,
  initialLessonId,
  onBackToCourse,
  onOpenAiAssistant,
  onOpenCertificateModal,
  onOpenHelp
}) => {
  const { user, progress, completeLesson, recordQuizScore, issueCertificate, toggleSaveLesson, addStudyTime } = useAuth();

  // Active study duration counter (adds 1 minute every 60s)
  useEffect(() => {
    const timer = setInterval(() => {
      addStudyTime(1);
    }, 60000);
    return () => clearInterval(timer);
  }, [addStudyTime]);

  // Find all lessons in a flat ordered array
  const allLessons: Lesson[] = course.modules.flatMap(m => m.lessons);
  const currentIdx = allLessons.findIndex(l => l.id === initialLessonId);
  const [activeLessonId, setActiveLessonId] = useState<string>(
    currentIdx !== -1 ? initialLessonId : (allLessons[0]?.id || '')
  );

  const activeLesson = allLessons.find(l => l.id === activeLessonId) || allLessons[0];
  const activeIndex = allLessons.findIndex(l => l.id === activeLessonId);

  const key = `${user.id}:${course.id}`;
  const userProg = progress[key];
  const completedLessonIds = userProg ? userProg.completedLessonIds : [];
  const isLessonCompleted = completedLessonIds.includes(activeLesson.id);

  // Exercise Scratchpad State
  const [userCode, setUserCode] = useState(activeLesson.exercise?.starterCode || '');
  const [showHint, setShowHint] = useState(false);
  const [exerciseFeedback, setExerciseFeedback] = useState<string | null>(null);

  // Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Overall calculated progress
  const totalLessons = allLessons.length;
  const percentComplete = totalLessons > 0 ? Math.round((completedLessonIds.length / totalLessons) * 100) : 0;
  const isEligibleForCert = percentComplete >= 80;

  const handleToggleComplete = async () => {
    triggerHaptic.medium();
    await completeLesson(course.id, activeLesson.id, !isLessonCompleted);
  };

  const handleNext = () => {
    triggerHaptic.light();
    if (activeIndex < allLessons.length - 1) {
      const nextLesson = allLessons[activeIndex + 1];
      setActiveLessonId(nextLesson.id);
      setUserCode(nextLesson.exercise?.starterCode || '');
      setShowHint(false);
      setExerciseFeedback(null);
      setSelectedAnswers({});
      setQuizSubmitted(false);
      setQuizScore(null);
    }
  };

  const handlePrev = () => {
    triggerHaptic.light();
    if (activeIndex > 0) {
      const prevLesson = allLessons[activeIndex - 1];
      setActiveLessonId(prevLesson.id);
      setUserCode(prevLesson.exercise?.starterCode || '');
      setShowHint(false);
      setExerciseFeedback(null);
      setSelectedAnswers({});
      setQuizSubmitted(false);
      setQuizScore(null);
    }
  };

  const handleQuizOptionSelect = (questionId: string, optionIdx: number) => {
    if (!quizSubmitted) {
      triggerHaptic.light();
      setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
    }
  };

  const handleSubmitQuiz = async (quiz: Quiz) => {
    let correctCount = 0;
    quiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / quiz.questions.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);

    if (score >= quiz.passingScorePercent) {
      triggerHaptic.success();
    } else {
      triggerHaptic.warning();
    }

    await recordQuizScore(course.id, quiz.id, score);

    // Auto-mark lesson complete if passed quiz
    if (score >= quiz.passingScorePercent) {
      await completeLesson(course.id, activeLesson.id, true);
    }
  };

  const handleClaimCertificate = async () => {
    triggerHaptic.success();
    await issueCertificate(course.id);
    onOpenCertificateModal();
  };

  return (
    <div className="space-y-6 py-4">
      {/* Top Navigation Bar with Course Title & Completion Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E8F0] dark:border-slate-800">
        <button
          onClick={onBackToCourse}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#737B90] hover:text-[#14213D] dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Course Overview</span>
        </button>

        {/* Real-time Progress Bar */}
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="w-40 sm:w-56">
            <div className="flex items-center justify-between text-[11px] text-[#737B90] dark:text-slate-400 mb-1">
              <span>{completedLessonIds.length} of {totalLessons} completed</span>
              <span className="font-bold text-[#35B8A0] tabular-nums">{percentComplete}%</span>
            </div>
            <div className="w-full h-2 bg-[#E5E8F0] dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#35B8A0] rounded-full transition-all duration-300"
                style={{ width: `${percentComplete}%` }}
              />
            </div>
          </div>

          {/* Certificate Claim Button if 80%+ */}
          {isEligibleForCert && (
            <button
              onClick={handleClaimCertificate}
              className="px-3 py-1.5 rounded-lg bg-[#35B8A0] text-white text-xs font-bold hover:bg-[#2fa38e] transition-colors flex items-center gap-1 shadow-sm shrink-0"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Claim Certificate</span>
            </button>
          )}
        </div>
      </div>

      {/* Main 2-Zone Classroom Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Main Stage: Video, Written Lesson, Exercises, Quizzes) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Lesson Header */}
          <div className="bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 p-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <span className="text-xs font-semibold text-[#7057D9] dark:text-[#a89af0] uppercase tracking-wider">
                Lesson {activeIndex + 1} of {totalLessons}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleSaveLesson(activeLesson.id)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                    user.savedLessons?.includes(activeLesson.id)
                      ? 'bg-[#35B8A0]/10 border-[#35B8A0]/30 text-[#35B8A0]'
                      : 'border-[#E5E8F0] dark:border-slate-700 text-[#737B90] hover:text-[#14213D] dark:hover:text-white'
                  }`}
                  title="Bookmark this lesson"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${user.savedLessons?.includes(activeLesson.id) ? 'fill-[#35B8A0]' : ''}`} />
                  <span>{user.savedLessons?.includes(activeLesson.id) ? 'Saved' : 'Save'}</span>
                </button>

                <button
                  onClick={() => onOpenAiAssistant(activeLesson.title)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#7057D9]/10 hover:bg-[#7057D9]/20 text-[#7057D9] dark:text-[#a89af0] rounded-lg text-xs font-medium transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#7057D9]" />
                  <span>Explain with AI</span>
                </button>

                {onOpenHelp && (
                  <button
                    onClick={onOpenHelp}
                    className="p-1 text-[#737B90] hover:text-[#7057D9] rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Get Help on this lesson"
                    aria-label="Lesson Help"
                  >
                    <HelpCircle className="w-4 h-4 text-[#7057D9]" />
                  </button>
                )}
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-[#14213D] dark:text-white tracking-tight">
              {activeLesson.title}
            </h1>

            <p className="text-xs sm:text-sm text-[#737B90] dark:text-slate-400 mt-1">
              <strong>Objective:</strong> {activeLesson.objective}
            </p>
          </div>

          {/* Video Player (if video available) */}
          {activeLesson.videoUrl && (
            <div className="bg-black rounded-2xl overflow-hidden aspect-video shadow-md border border-slate-800">
              <iframe
                src={activeLesson.videoUrl}
                title={activeLesson.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Written Lesson Content */}
          <div className="bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 p-6 sm:p-8 shadow-xs">
            <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-[#20263A] dark:text-slate-200 leading-relaxed whitespace-pre-line font-sans space-y-4">
              {activeLesson.writtenContent}
            </div>

            {/* Key Takeaways Box */}
            {activeLesson.keyTakeaways && activeLesson.keyTakeaways.length > 0 && (
              <div className="mt-8 p-5 rounded-xl bg-[#F8F9FC] dark:bg-slate-800/80 border border-[#E5E8F0] dark:border-slate-700">
                <h4 className="text-xs font-bold text-[#14213D] dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#35B8A0]" />
                  Key Takeaways
                </h4>
                <ul className="space-y-1.5 text-xs text-[#20263A] dark:text-slate-300">
                  {activeLesson.keyTakeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#35B8A0] font-bold">·</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Practical Exercise Playground */}
          {activeLesson.exercise && (
            <div className="bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#7057D9]/10 text-[#7057D9] flex items-center justify-center">
                    <Code className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#14213D] dark:text-white">
                      Practical Exercise: {activeLesson.exercise.title}
                    </h3>
                    <p className="text-xs text-[#737B90] dark:text-slate-400">
                      Write your code or answer in the workspace below.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowHint(!showHint)}
                  className="px-3 py-1.5 rounded-lg border border-[#E5E8F0] dark:border-slate-700 text-xs font-medium text-[#737B90] hover:text-[#7057D9] flex items-center gap-1.5 transition-colors"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
                </button>
              </div>

              <div className="p-3 bg-[#F8F9FC] dark:bg-slate-800 rounded-xl text-xs text-[#20263A] dark:text-slate-200 leading-relaxed border border-[#E5E8F0] dark:border-slate-700">
                {activeLesson.exercise.prompt}
              </div>

              {showHint && activeLesson.exercise.hint && (
                <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-xl text-xs text-amber-800 dark:text-amber-300">
                  <strong>Hint:</strong> {activeLesson.exercise.hint}
                </div>
              )}

              {/* Code / Scratchpad Area */}
              <div>
                <textarea
                  rows={5}
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  placeholder="Type your solution or prompt here..."
                  className="w-full p-4 font-mono text-xs bg-[#14213D] text-slate-100 rounded-xl border border-slate-700 focus:outline-none focus:border-[#7057D9]"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => {
                    setExerciseFeedback('Great implementation! Your solution adheres to the lesson requirements and structured output pattern.');
                  }}
                  className="px-4 py-2 bg-[#7057D9] hover:bg-[#5f46c6] text-white text-xs font-semibold rounded-xl transition-colors"
                >
                  Check Solution
                </button>
                <button
                  onClick={() => onOpenAiAssistant(`Can you check my code for "${activeLesson.exercise?.title}":\n\n${userCode}`)}
                  className="text-xs text-[#7057D9] hover:underline font-semibold flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ask AI to Review My Code</span>
                </button>
              </div>

              {exerciseFeedback && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 rounded-xl text-xs text-emerald-800 dark:text-emerald-300">
                  {exerciseFeedback}
                </div>
              )}
            </div>
          )}

          {/* Lesson Quiz / Assessment */}
          {activeLesson.quiz && (
            <div className="bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-[#E5E8F0] dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#35B8A0]/10 text-[#35B8A0] flex items-center justify-center">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#14213D] dark:text-white">
                      {activeLesson.quiz.title}
                    </h3>
                    <p className="text-xs text-[#737B90] dark:text-slate-400">
                      Passing grade: {activeLesson.quiz.passingScorePercent}%
                    </p>
                  </div>
                </div>

                {quizSubmitted && quizScore !== null && (
                  <div className="text-right">
                    <span className={`text-sm font-bold ${quizScore >= activeLesson.quiz.passingScorePercent ? 'text-[#35B8A0]' : 'text-rose-500'}`}>
                      Score: {quizScore}%
                    </span>
                    <p className="text-[11px] text-[#737B90]">
                      {quizScore >= activeLesson.quiz.passingScorePercent ? 'Passed!' : 'Try again'}
                    </p>
                  </div>
                )}
              </div>

              {/* Questions List */}
              <div className="space-y-6">
                {activeLesson.quiz.questions.map((q, qIndex) => {
                  const selected = selectedAnswers[q.id];
                  const isAnswered = selected !== undefined;
                  const isCorrect = isAnswered && selected === q.correctIndex;

                  return (
                    <div key={q.id} className="space-y-3">
                      <p className="text-xs sm:text-sm font-semibold text-[#14213D] dark:text-white">
                        {qIndex + 1}. {q.question}
                      </p>

                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          let optStyle = 'border-[#E5E8F0] dark:border-slate-700 bg-[#F8F9FC] dark:bg-slate-800 hover:border-[#7057D9]';

                          if (selected === optIdx) {
                            optStyle = 'border-[#7057D9] bg-[#7057D9]/10 text-[#7057D9] font-medium';
                          }

                          if (quizSubmitted) {
                            if (optIdx === q.correctIndex) {
                              optStyle = 'border-[#35B8A0] bg-[#35B8A0]/15 text-[#35B8A0] font-semibold';
                            } else if (selected === optIdx && optIdx !== q.correctIndex) {
                              optStyle = 'border-rose-400 bg-rose-50 text-rose-700 font-medium';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={quizSubmitted}
                              onClick={() => handleQuizOptionSelect(q.id, optIdx)}
                              className={`w-full p-3 rounded-xl border text-left text-xs transition-colors flex items-center justify-between ${optStyle}`}
                            >
                              <span>{opt}</span>
                              {quizSubmitted && optIdx === q.correctIndex && (
                                <CheckCircle2 className="w-4 h-4 text-[#35B8A0] shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div className="p-3 bg-[#F8F9FC] dark:bg-slate-800/80 rounded-xl text-xs text-[#737B90] dark:text-slate-300 border border-[#E5E8F0] dark:border-slate-700">
                          <strong>Explanation:</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!quizSubmitted ? (
                <button
                  onClick={() => handleSubmitQuiz(activeLesson.quiz!)}
                  disabled={Object.keys(selectedAnswers).length < activeLesson.quiz.questions.length}
                  className="px-5 py-2.5 bg-[#7057D9] hover:bg-[#5f46c6] disabled:opacity-50 text-white rounded-xl text-xs font-semibold transition-colors"
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  onClick={() => {
                    setQuizSubmitted(false);
                    setSelectedAnswers({});
                    setQuizScore(null);
                  }}
                  className="px-5 py-2.5 border border-[#E5E8F0] dark:border-slate-700 text-xs font-semibold rounded-xl text-[#20263A] dark:text-white hover:bg-[#F8F9FC] dark:hover:bg-slate-800 transition-colors"
                >
                  Retake Quiz
                </button>
              )}
            </div>
          )}

          {/* Lesson Footer Navigation Controls */}
          <div className="bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="px-4 py-2 rounded-xl border border-[#E5E8F0] dark:border-slate-700 text-xs font-semibold text-[#20263A] dark:text-white disabled:opacity-30 hover:bg-[#F8F9FC] dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous Lesson</span>
            </button>

            {/* Mark as Complete Toggle */}
            <button
              onClick={handleToggleComplete}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
                isLessonCompleted
                  ? 'bg-[#35B8A0]/15 text-[#35B8A0] border border-[#35B8A0]/30 hover:bg-[#35B8A0]/25'
                  : 'bg-[#7057D9] text-white hover:bg-[#5f46c6] shadow-xs'
              }`}
            >
              {isLessonCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#35B8A0]" />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4" />
                  <span>Mark as Complete</span>
                </>
              )}
            </button>

            <button
              onClick={handleNext}
              disabled={activeIndex === allLessons.length - 1}
              className="px-4 py-2 rounded-xl border border-[#E5E8F0] dark:border-slate-700 text-xs font-semibold text-[#20263A] dark:text-white disabled:opacity-30 hover:bg-[#F8F9FC] dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <span>Next Lesson</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Curriculum Navigation Drawer */}
        <div className="lg:col-span-4 bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 p-5 shadow-xs sticky top-20">
          <div className="pb-3 border-b border-[#E5E8F0] dark:border-slate-800 mb-4">
            <h3 className="text-sm font-bold text-[#14213D] dark:text-white">
              Course Curriculum
            </h3>
            <p className="text-xs text-[#737B90] dark:text-slate-400 mt-0.5">
              {course.title}
            </p>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {course.modules.map((mod, modIdx) => (
              <div key={mod.id} className="space-y-2">
                <p className="text-xs font-bold text-[#737B90] dark:text-slate-400 uppercase tracking-wider">
                  Module {modIdx + 1}: {mod.title.replace(/^Module \d+:?/, '')}
                </p>

                <div className="space-y-1">
                  {mod.lessons.map((les) => {
                    const isDone = completedLessonIds.includes(les.id);
                    const isCurrent = les.id === activeLessonId;

                    return (
                      <button
                        key={les.id}
                        onClick={() => {
                          setActiveLessonId(les.id);
                          setUserCode(les.exercise?.starterCode || '');
                          setShowHint(false);
                          setExerciseFeedback(null);
                          setSelectedAnswers({});
                          setQuizSubmitted(false);
                          setQuizScore(null);
                        }}
                        className={`w-full p-2.5 rounded-xl text-left text-xs transition-colors flex items-center justify-between ${
                          isCurrent
                            ? 'bg-[#7057D9]/15 text-[#7057D9] dark:text-[#a89af0] font-bold border border-[#7057D9]/30'
                            : 'hover:bg-[#F8F9FC] dark:hover:bg-slate-800 text-[#20263A] dark:text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate pr-2">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-[#35B8A0] shrink-0" />
                          ) : (
                            <Circle className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-[#7057D9]' : 'text-slate-300'}`} />
                          )}
                          <span className="truncate">{les.title}</span>
                        </div>
                        <span className="text-[11px] text-[#737B90] shrink-0">
                          {les.durationMinutes}m
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Quick AI Help trigger */}
          <div className="mt-6 pt-4 border-t border-[#E5E8F0] dark:border-slate-800">
            <button
              onClick={() => onOpenAiAssistant(activeLesson.title)}
              className="w-full py-2.5 rounded-xl bg-[#7057D9]/10 hover:bg-[#7057D9]/20 text-[#7057D9] dark:text-[#a89af0] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI About This Lesson</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
