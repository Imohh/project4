/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Bell, 
  Settings, 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  TrendingUp,
  Trophy,
  Music,
  Beaker,
  Cpu,
  Palette,
  Book,
  ChevronRight,
  Sparkles,
  Filter
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { INTERESTS, QUESTIONS } from './constants';
import { Interest, Question } from './types';

const IconMap: Record<string, any> = {
  Trophy,
  Music,
  Beaker,
  Cpu,
  Palette,
  Book
};

export default function App() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['sports', 'tech']);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredQuestions = useMemo(() => {
    return QUESTIONS.filter(q => {
      const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           q.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesInterests = q.tags.some(tag => selectedInterests.includes(tag));
      return matchesSearch && (selectedInterests.length === 0 || matchesInterests);
    }).sort((a, b) => b.matchScore - a.matchScore);
  }, [selectedInterests, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 z-50 hidden lg:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">EduMatch AI</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          <NavItem icon={LayoutDashboard} label="Dashboard" active />
          <NavItem icon={BookOpen} label="My Courses" />
          <NavItem icon={Users} label="Community" />
          <NavItem icon={TrendingUp} label="Progress" />
        </nav>

        <div className="p-4 mt-auto">
          <Card className="bg-slate-50 border-none shadow-none rounded-2xl">
            <CardContent className="p-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Pro Plan</p>
              <p className="text-sm font-medium mb-3">Unlock advanced AI personalization</p>
              <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl">Upgrade</Button>
            </CardContent>
          </Card>
        </div>

        <div className="p-6 border-t border-slate-100 flex items-center gap-3">
          <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
            <AvatarImage src="https://picsum.photos/seed/user/100/100" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">Jay Pee</p>
            <p className="text-xs text-slate-500 truncate">jaypee@example.com</p>
          </div>
          <Settings className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600 transition-colors" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-4 lg:p-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Welcome back, Jay!</h1>
            <p className="text-slate-500">Your personalized learning path is ready for today.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search questions..." 
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full md:w-64 transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="rounded-xl bg-white border-slate-200 shadow-sm relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Column: Personalization & Interests */}
          <div className="xl:col-span-4 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Filter className="w-4 h-4 text-blue-500" />
                  Your Interests
                </h2>
                <span className="text-xs text-slate-400 font-medium">{selectedInterests.length} selected</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {INTERESTS.map((interest) => {
                  const Icon = IconMap[interest.icon];
                  const isActive = selectedInterests.includes(interest.id);
                  return (
                    <motion.button
                      key={interest.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleInterest(interest.id)}
                      className={`flex flex-col items-start p-4 rounded-2xl border transition-all text-left ${
                        isActive 
                          ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-200' 
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                      }`}
                    >
                      <div className={`p-2 rounded-lg mb-3 ${
                        isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-sm font-semibold ${isActive ? 'text-blue-900' : 'text-slate-700'}`}>
                        {interest.name}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </section>

            <Card className="border-slate-200 shadow-sm rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-200" />
                  AI Matching Engine
                </CardTitle>
                <CardDescription className="text-blue-100">
                  How we personalize your feed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium text-blue-100">
                    <span>Interest Alignment</span>
                    <span>94%</span>
                  </div>
                  <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '94%' }}
                      className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium text-blue-100">
                    <span>Difficulty Calibration</span>
                    <span>82%</span>
                  </div>
                  <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '82%' }}
                      className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    />
                  </div>
                </div>
                <Separator className="bg-white/10" />
                <p className="text-xs leading-relaxed text-blue-50">
                  Our system maps your <span className="font-bold text-white">{selectedInterests.join(', ')}</span> interests to complex concepts across Science and Technology.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Question Feed */}
          <div className="xl:col-span-8 space-y-6">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex items-center justify-between mb-6">
                <TabsList className="bg-white border border-slate-200 p-1 rounded-xl shadow-sm">
                  <TabsTrigger value="all" className="rounded-lg px-4 py-2 data-[state=active]:bg-slate-100 data-[state=active]:shadow-none">All Questions</TabsTrigger>
                  <TabsTrigger value="trending" className="rounded-lg px-4 py-2 data-[state=active]:bg-slate-100 data-[state=active]:shadow-none">Trending</TabsTrigger>
                  <TabsTrigger value="saved" className="rounded-lg px-4 py-2 data-[state=active]:bg-slate-100 data-[state=active]:shadow-none">Saved</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium hidden sm:inline">Sort by:</span>
                  <select className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer">
                    <option>Match Score</option>
                    <option>Newest</option>
                    <option>Difficulty</option>
                  </select>
                </div>
              </div>

              <TabsContent value="all" className="mt-0 outline-none">
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {filteredQuestions.length > 0 ? (
                      filteredQuestions.map((q, idx) => (
                        <QuestionCard key={q.id} question={q} index={idx} />
                      ))
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-20 text-center"
                      >
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Search className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-semibold mb-1">No questions found</h3>
                        <p className="text-slate-500">Try adjusting your interests or search query.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <a 
      href="#" 
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
        active 
          ? 'bg-blue-50 text-blue-600' 
          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <Icon className={`w-5 h-5 ${active ? 'text-blue-600' : 'text-slate-400'}`} />
      {label}
      {active && <motion.div layoutId="activeNav" className="ml-auto w-1 h-4 bg-blue-600 rounded-full" />}
    </a>
  );
}

interface QuestionCardProps {
  question: Question;
  index: number;
  key?: string | number;
}

function QuestionCard({ question, index }: QuestionCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="group hover:shadow-md transition-all duration-300 border-slate-200 rounded-3xl overflow-hidden cursor-pointer bg-white">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-100 border-none rounded-lg px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold">
                  {question.category}
                </Badge>
                <div className="flex gap-1">
                  {question.tags.map(tag => (
                    <Badge key={tag} className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-none rounded-lg px-2 py-0.5 text-[10px] font-bold capitalize">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">{question.title}</h3>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1.5 text-blue-600">
                <Sparkles className="w-4 h-4" />
                <span className="text-lg font-bold">{question.matchScore}%</span>
              </div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Match</span>
            </div>
          </div>
          
          <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-2">
            {question.content}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${
                  question.difficulty === 'Beginner' ? 'bg-green-500' :
                  question.difficulty === 'Intermediate' ? 'bg-amber-500' : 'bg-red-500'
                }`} />
                <span className="text-xs font-semibold text-slate-500">{question.difficulty}</span>
              </div>
              <Separator orientation="vertical" className="h-4 bg-slate-200" />
              <div className="flex items-center gap-1.5 text-slate-500">
                <Users className="w-4 h-4" />
                <span className="text-xs font-medium">1.2k students</span>
              </div>
            </div>
            
            <Button variant="ghost" size="sm" className="group/btn text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl font-semibold gap-1">
              View Question
              <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

