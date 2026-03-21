import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Music, Calendar, Clock, CreditCard, ArrowRight, Check } from "lucide-react";
import BackToHome from "@/layout/BackToHome";

const instruments = [
  { id: "guitare", name: "Guitare", emoji: "🎸" },
  { id: "piano", name: "Piano", emoji: "🎹" },
  { id: "batterie", name: "Batterie", emoji: "🥁" },
  { id: "violon", name: "Violon", emoji: "🎻" },
  { id: "chant", name: "Chant", emoji: "🎤" },
];

const days = [
  { id: "lundi", name: "Lundi" },
  { id: "mardi", name: "Mardi" },
  { id: "mercredi", name: "Mercredi" },
  { id: "jeudi", name: "Jeudi" },
  { id: "vendredi", name: "Vendredi" },
  { id: "samedi", name: "Samedi" },
];

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];

const Register = () => {
  const [step, setStep] = useState(1);
  const [selectedInstrument, setSelectedInstrument] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("");

  const toggleDay = (dayId: string) => {
    setSelectedDays(prev => 
      prev.includes(dayId) 
        ? prev.filter(d => d !== dayId)
        : [...prev, dayId]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BackToHome />
      <main className="flex-1 bg-gradient-to-b from-cream to-background py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="font-serif text-4xl font-bold text-charcoal mb-4">
                Inscription à <span className="text-primary">Kanto-Feo Academy</span>
              </h1>
              <p className="text-muted-foreground">
                Remplissez le formulaire ci-dessous pour commencer votre aventure musicale.
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-10">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                    {step > s ? <Check className="h-5 w-5" /> : s}
                  </div>
                  {s < 4 && (
                    <div className={`w-12 h-1 ${step > s ? 'bg-primary' : 'bg-muted'}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Personal Info */}
            {step === 1 && (
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="font-serif flex items-center gap-2">
                    <Music className="h-6 w-6 text-primary" />
                    Informations personnelles
                  </CardTitle>
                  <CardDescription>Commençons par vos coordonnées</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Prénom</Label>
                      <Input placeholder="Votre prénom" />
                    </div>
                    <div className="space-y-2">
                      <Label>Nom</Label>
                      <Input placeholder="Votre nom" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="votre@email.mg" />
                  </div>
                  <div className="space-y-2">
                    <Label>Téléphone</Label>
                    <Input placeholder="+261 34 XX XXX XX" />
                  </div>
                  <div className="space-y-2">
                    <Label>Âge</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre tranche d'âge" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="moins-12">Moins de 12 ans</SelectItem>
                        <SelectItem value="12-17">12 - 17 ans</SelectItem>
                        <SelectItem value="18-25">18 - 25 ans</SelectItem>
                        <SelectItem value="26-35">26 - 35 ans</SelectItem>
                        <SelectItem value="plus-35">Plus de 35 ans</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={() => setStep(2)} className="w-full gap-2 bg-primary hover:bg-primary/90">
                    Continuer
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Choose Instrument */}
            {step === 2 && (
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="font-serif flex items-center gap-2">
                    <Music className="h-6 w-6 text-primary" />
                    Choisissez votre instrument
                  </CardTitle>
                  <CardDescription>Quel instrument souhaitez-vous apprendre ?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={selectedInstrument} onValueChange={setSelectedInstrument}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {instruments.map((instrument) => (
                        <div key={instrument.id}>
                          <RadioGroupItem 
                            value={instrument.id} 
                            id={instrument.id}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={instrument.id}
                            className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:border-primary/50"
                          >
                            <span className="text-4xl">{instrument.emoji}</span>
                            <span className="font-semibold">{instrument.name}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Retour
                    </Button>
                    <Button 
                      onClick={() => setStep(3)} 
                      disabled={!selectedInstrument}
                      className="flex-1 gap-2 bg-primary hover:bg-primary/90"
                    >
                      Continuer
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Schedule */}
            {step === 3 && (
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="font-serif flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-primary" />
                    Choisissez vos disponibilités
                  </CardTitle>
                  <CardDescription>Sélectionnez vos jours et heures de cours préférés</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Jours de cours</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {days.map((day) => (
                        <div 
                          key={day.id}
                          onClick={() => toggleDay(day.id)}
                          className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedDays.includes(day.id) 
                              ? 'border-primary bg-primary/5' 
                              : 'hover:border-primary/50'
                          }`}
                        >
                          <Checkbox checked={selectedDays.includes(day.id)} />
                          <span className="font-medium">{day.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base font-semibold flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Heure de disponibilité
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une heure" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                      Retour
                    </Button>
                    <Button 
                      onClick={() => setStep(4)} 
                      disabled={selectedDays.length === 0}
                      className="flex-1 gap-2 bg-primary hover:bg-primary/90"
                    >
                      Continuer
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Payment */}
            {step === 4 && (
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="font-serif flex items-center gap-2">
                    <CreditCard className="h-6 w-6 text-primary" />
                    Mode de paiement
                  </CardTitle>
                  <CardDescription>Choisissez votre méthode de paiement préférée</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-4">
                      <div>
                        <RadioGroupItem value="orange" id="orange" className="peer sr-only" />
                        <Label
                          htmlFor="orange"
                          className="flex items-center gap-4 p-6 rounded-xl border-2 cursor-pointer transition-all peer-data-[state=checked]:border-orange-500 peer-data-[state=checked]:bg-orange-50 hover:border-orange-300"
                        >
                          <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                            OM
                          </div>
                          <div>
                            <p className="font-semibold">Orange Money</p>
                            <p className="text-sm text-muted-foreground">Paiement mobile rapide et sécurisé</p>
                          </div>
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem value="airtel" id="airtel" className="peer sr-only" />
                        <Label
                          htmlFor="airtel"
                          className="flex items-center gap-4 p-6 rounded-xl border-2 cursor-pointer transition-all peer-data-[state=checked]:border-red-500 peer-data-[state=checked]:bg-red-50 hover:border-red-300"
                        >
                          <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold">
                            AM
                          </div>
                          <div>
                            <p className="font-semibold">Airtel Money</p>
                            <p className="text-sm text-muted-foreground">Transfert mobile simple et fiable</p>
                          </div>
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem value="mvola" id="mvola" className="peer sr-only" />
                        <Label
                          htmlFor="mvola"
                          className="flex items-center gap-4 p-6 rounded-xl border-2 cursor-pointer transition-all peer-data-[state=checked]:border-yellow-500 peer-data-[state=checked]:bg-yellow-50 hover:border-yellow-300"
                        >
                          <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center text-charcoal font-bold">
                            MV
                          </div>
                          <div>
                            <p className="font-semibold">MVola</p>
                            <p className="text-sm text-muted-foreground">Paiement Telma mobile</p>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>

                  {/* Summary */}
                  <div className="bg-muted p-6 rounded-xl">
                    <h4 className="font-semibold mb-4">Récapitulatif</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Instrument</span>
                        <span className="font-medium">
                          {instruments.find(i => i.id === selectedInstrument)?.name || '-'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Jours de cours</span>
                        <span className="font-medium">
                          {selectedDays.length} jour(s)/semaine
                        </span>
                      </div>
                      <div className="border-t border-border my-3" />
                      <div className="flex justify-between text-base">
                        <span className="font-semibold">Total mensuel</span>
                        <span className="font-bold text-primary">50 000 Ar</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(3)} className="flex-1">
                      Retour
                    </Button>
                    <Button 
                      disabled={!paymentMethod}
                      className="flex-1 gap-2 bg-primary hover:bg-primary/90"
                    >
                      <Check className="h-4 w-4" />
                      Confirmer l'inscription
                    </Button>
                  </div>

                  <p className="text-center text-sm text-muted-foreground">
                    En vous inscrivant, vous acceptez nos{" "}
                    <Link to="/terms" className="text-primary hover:underline">conditions d'utilisation</Link>
                    {" "}et notre{" "}
                    <Link to="/privacy" className="text-primary hover:underline">politique de confidentialité</Link>.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
