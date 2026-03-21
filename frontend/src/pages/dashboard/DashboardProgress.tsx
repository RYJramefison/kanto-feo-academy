import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Award, Clock, Target, CheckCircle } from "lucide-react";
import DashboardLayout from "./DashboardLayout";

const skills = [
  { name: "Posture et tenue", level: 100 },
  { name: "Accords majeurs", level: 75 },
  { name: "Accords mineurs", level: 40 },
  { name: "Rythme de base", level: 30 },
  { name: "Lecture de tablatures", level: 20 },
  { name: "Fingerpicking", level: 0 },
];

const achievements = [
  { id: 1, title: "Premier accord", description: "Jouer votre premier accord", unlocked: true, date: "15 Jan 2026" },
  { id: 2, title: "Série de 7 jours", description: "Pratiquer 7 jours consécutifs", unlocked: true, date: "22 Jan 2026" },
  { id: 3, title: "Module complété", description: "Terminer un module entier", unlocked: true, date: "28 Jan 2026" },
  { id: 4, title: "Premier morceau", description: "Jouer un morceau complet", unlocked: false },
  { id: 5, title: "10 heures de pratique", description: "Cumuler 10 heures de cours", unlocked: false },
];

const history = [
  { date: "2 Fév 2026", lesson: "Accords de base - Leçon 4", duration: "45 min" },
  { date: "31 Jan 2026", lesson: "Accords de base - Leçon 3", duration: "40 min" },
  { date: "29 Jan 2026", lesson: "Accords de base - Leçon 2", duration: "45 min" },
  { date: "27 Jan 2026", lesson: "Accords de base - Leçon 1", duration: "50 min" },
  { date: "24 Jan 2026", lesson: "Accordage de la guitare", duration: "30 min" },
];

const DashboardProgress = () => {
  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-charcoal mb-2">
            Suivi de progression
          </h1>
          <p className="text-muted-foreground">
            Suivez votre évolution et vos accomplissements
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">Intermédiaire</p>
                  <p className="text-sm text-muted-foreground">Niveau actuel</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Leçons terminées</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">8h 30m</p>
                  <p className="text-sm text-muted-foreground">Temps total</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Badges obtenus</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Skills Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Compétences
              </CardTitle>
              <CardDescription>Votre maîtrise par compétence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className={skill.level > 0 ? "text-primary" : "text-muted-foreground"}>
                      {skill.level}%
                    </span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Badges & Accomplissements
              </CardTitle>
              <CardDescription>Vos récompenses débloquées</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id}
                  className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                    achievement.unlocked 
                      ? 'bg-primary/5 border border-primary/20' 
                      : 'bg-muted/50 opacity-60'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    achievement.unlocked 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <Award className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{achievement.title}</p>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  {achievement.unlocked && achievement.date && (
                    <Badge variant="outline" className="border-primary text-primary">
                      {achievement.date}
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Learning History */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Historique d'apprentissage</CardTitle>
            <CardDescription>Vos dernières activités</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {history.map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{item.lesson}</p>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                  <Badge variant="secondary">{item.duration}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardProgress;
