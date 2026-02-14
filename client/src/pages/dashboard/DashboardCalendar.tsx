import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import DashboardLayout from "./DashboardLayout";

const daysOfWeek = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const months = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

// Mock data for lessons
const scheduledLessons = [
  { date: new Date(2026, 1, 2), title: "Accords de base - Leçon 5", time: "15:00" },
  { date: new Date(2026, 1, 4), title: "Rythme et strumming", time: "10:00" },
  { date: new Date(2026, 1, 6), title: "Lecture de tablatures", time: "15:00" },
  { date: new Date(2026, 1, 9), title: "Accords de base - Leçon 6", time: "15:00" },
  { date: new Date(2026, 1, 11), title: "Exercices pratiques", time: "10:00" },
  { date: new Date(2026, 1, 13), title: "Premier morceau", time: "15:00" },
];

const DashboardCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // February 2026

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    
    return { daysInMonth, startingDay };
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getLessonsForDay = (day: number) => {
    return scheduledLessons.filter(lesson => 
      lesson.date.getDate() === day && 
      lesson.date.getMonth() === currentDate.getMonth() &&
      lesson.date.getFullYear() === currentDate.getFullYear()
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-charcoal mb-2">
            Calendrier
          </h1>
          <p className="text-muted-foreground">
            Consultez votre planning de cours
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-serif text-xl">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Days header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map(day => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before the first of the month */}
              {Array.from({ length: startingDay }).map((_, i) => (
                <div key={`empty-${i}`} className="min-h-24 p-2 bg-muted/30 rounded-lg" />
              ))}

              {/* Days of the month */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const lessons = getLessonsForDay(day);
                const today = isToday(day);

                return (
                  <div 
                    key={day}
                    className={`min-h-24 p-2 rounded-lg border transition-colors ${
                      today 
                        ? 'border-primary bg-primary/5' 
                        : 'border-transparent hover:bg-muted/50'
                    }`}
                  >
                    <div className={`text-sm font-medium mb-1 ${
                      today ? 'text-primary' : ''
                    }`}>
                      {day}
                    </div>
                    <div className="space-y-1">
                      {lessons.map((lesson, idx) => (
                        <div 
                          key={idx}
                          className="text-xs p-1 bg-primary/10 text-primary rounded truncate cursor-pointer hover:bg-primary/20"
                          title={`${lesson.title} - ${lesson.time}`}
                        >
                          {lesson.time}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming lessons list */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Prochains cours programmés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scheduledLessons.slice(0, 5).map((lesson, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div>
                    <p className="font-medium">{lesson.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {lesson.date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </p>
                  </div>
                  <Badge variant="outline">{lesson.time}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardCalendar;
