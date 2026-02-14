import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Lock, CheckCircle, Clock } from "lucide-react";
import DashboardLayout from "./DashboardLayout";

const modules = [
  {
    id: 1,
    title: "Module 1: Les bases de la guitare",
    lessons: [
      { id: 1, title: "Introduction à la guitare", duration: "10 min", completed: true, videoUrl: "#" },
      { id: 2, title: "Anatomie de la guitare", duration: "8 min", completed: true, videoUrl: "#" },
      { id: 3, title: "Posture et tenue de la guitare", duration: "12 min", completed: true, videoUrl: "#" },
      { id: 4, title: "Accordage de la guitare", duration: "15 min", completed: true, videoUrl: "#" },
    ],
    progress: 100,
  },
  {
    id: 2,
    title: "Module 2: Les accords de base",
    lessons: [
      { id: 5, title: "L'accord de La majeur (A)", duration: "15 min", completed: true, videoUrl: "#" },
      { id: 6, title: "L'accord de Ré majeur (D)", duration: "15 min", completed: true, videoUrl: "#" },
      { id: 7, title: "L'accord de Mi majeur (E)", duration: "15 min", completed: true, current: true, videoUrl: "#" },
      { id: 8, title: "Enchaînement d'accords", duration: "20 min", completed: false, locked: false, videoUrl: "#" },
      { id: 9, title: "Premier morceau simple", duration: "25 min", completed: false, locked: false, videoUrl: "#" },
    ],
    progress: 60,
  },
  {
    id: 3,
    title: "Module 3: Rythme et strumming",
    lessons: [
      { id: 10, title: "Introduction au rythme", duration: "12 min", completed: false, locked: true, videoUrl: "#" },
      { id: 11, title: "Patterns de strumming basiques", duration: "18 min", completed: false, locked: true, videoUrl: "#" },
      { id: 12, title: "Strumming avancé", duration: "20 min", completed: false, locked: true, videoUrl: "#" },
    ],
    progress: 0,
  },
];

const DashboardCourses = () => {
  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-charcoal mb-2">
            Mes cours
          </h1>
          <p className="text-muted-foreground">
            Guitare - Programme Intermédiaire
          </p>
        </div>

        <Tabs defaultValue="lessons" className="space-y-6">
          <TabsList>
            <TabsTrigger value="lessons">Leçons</TabsTrigger>
            <TabsTrigger value="resources">Ressources</TabsTrigger>
          </TabsList>

          <TabsContent value="lessons" className="space-y-6">
            {modules.map((module) => (
              <Card key={module.id} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="font-serif text-xl">{module.title}</CardTitle>
                      <CardDescription>
                        {module.lessons.filter(l => l.completed).length} / {module.lessons.length} leçons terminées
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32">
                        <Progress value={module.progress} className="h-2" />
                      </div>
                      <span className="text-sm font-medium text-primary">{module.progress}%</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {module.lessons.map((lesson, idx) => (
                      <div 
                        key={lesson.id}
                        className={`flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors ${
                          lesson.locked ? 'opacity-50' : ''
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          lesson.completed 
                            ? 'bg-green-100 text-green-600'
                            : lesson.current
                              ? 'bg-primary text-primary-foreground'
                              : lesson.locked
                                ? 'bg-muted text-muted-foreground'
                                : 'bg-muted text-muted-foreground'
                        }`}>
                          {lesson.completed ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : lesson.locked ? (
                            <Lock className="h-5 w-5" />
                          ) : (
                            <span className="font-medium">{idx + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${lesson.current ? 'text-primary' : ''}`}>
                            {lesson.title}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {lesson.duration}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {lesson.current && (
                            <Badge className="bg-primary">En cours</Badge>
                          )}
                          {lesson.completed && (
                            <Badge variant="outline" className="border-green-500 text-green-600">
                              Terminé
                            </Badge>
                          )}
                          {!lesson.locked && (
                            <Button 
                              size="sm" 
                              variant={lesson.current ? "default" : "outline"}
                              className={lesson.current ? "bg-primary hover:bg-primary/90" : ""}
                            >
                              <Play className="h-4 w-4 mr-1" />
                              {lesson.completed ? "Revoir" : "Regarder"}
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Ressources téléchargeables</CardTitle>
                <CardDescription>Partitions, tablatures et documents PDF</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Les ressources seront disponibles prochainement.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DashboardCourses;
