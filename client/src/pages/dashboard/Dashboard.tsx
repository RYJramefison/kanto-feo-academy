import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Play, Calendar, TrendingUp, Clock, Bell, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";

const upcomingLessons = [
  { id: 1, title: "Accords de base - Leçon 5", date: "Aujourd'hui", time: "15:00", duration: "45 min" },
  { id: 2, title: "Rythme et strumming", date: "Mercredi", time: "10:00", duration: "45 min" },
  { id: 3, title: "Lecture de tablatures", date: "Vendredi", time: "15:00", duration: "45 min" },
];

const recentCourses = [
  { id: 1, title: "Accords de base - Leçon 4", progress: 100, thumbnail: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=200&h=120&fit=crop" },
  { id: 2, title: "Accords de base - Leçon 3", progress: 100, thumbnail: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=200&h=120&fit=crop" },
  { id: 3, title: "Accords de base - Leçon 2", progress: 100, thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=120&fit=crop" },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-charcoal">
              Bonjour, Ravo ! 👋
            </h1>
            <p className="text-muted-foreground">
              Prêt à continuer votre apprentissage de la guitare ?
            </p>
          </div>
          <Link to="/dashboard/courses">
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Play className="h-4 w-4" />
              Reprendre le cours
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Play className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12/35</p>
                  <p className="text-sm text-muted-foreground">Leçons terminées</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">8h 30</p>
                  <p className="text-sm text-muted-foreground">Temps de pratique</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">34%</p>
                  <p className="text-sm text-muted-foreground">Progression</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Cours cette semaine</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Current Progress */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-serif">Progression actuelle</CardTitle>
              <CardDescription>Guitare - Niveau Intermédiaire</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Module 1: Les bases</span>
                  <span className="text-primary font-medium">100%</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Module 2: Accords</span>
                  <span className="text-primary font-medium">60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Module 3: Rythme</span>
                  <span className="text-muted-foreground">0%</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Module 4: Techniques avancées</span>
                  <span className="text-muted-foreground">0%</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Lessons */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Prochains cours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingLessons.map((lesson) => (
                <div 
                  key={lesson.id}
                  className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <p className="font-medium text-sm">{lesson.title}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="text-xs">
                      {lesson.date}
                    </Badge>
                    <span>{lesson.time}</span>
                    <span>•</span>
                    <span>{lesson.duration}</span>
                  </div>
                </div>
              ))}
              <Link to="/dashboard/calendar">
                <Button variant="outline" className="w-full gap-2">
                  Voir le calendrier
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Courses */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-serif">Cours récents</CardTitle>
              <CardDescription>Continuez là où vous vous êtes arrêté</CardDescription>
            </div>
            <Link to="/dashboard/courses">
              <Button variant="ghost" className="gap-1">
                Voir tout <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentCourses.map((course) => (
                <div 
                  key={course.id}
                  className="group cursor-pointer rounded-lg overflow-hidden border border-border hover:border-primary transition-colors"
                >
                  <div className="relative aspect-video">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <Play className="h-5 w-5 text-white ml-1" />
                      </div>
                    </div>
                    <Badge className="absolute top-2 right-2 bg-green-500">
                      Terminé
                    </Badge>
                  </div>
                  <div className="p-3">
                    <p className="font-medium text-sm line-clamp-2">{course.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications Banner */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="flex items-center gap-4 py-4">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Nouveau cours disponible !</p>
              <p className="text-sm text-muted-foreground">
                "Techniques de picking" vient d'être ajouté à votre programme.
              </p>
            </div>
            <Link to="/dashboard/courses">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Voir
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
