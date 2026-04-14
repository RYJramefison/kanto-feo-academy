import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Music, Calendar, Clock, CreditCard, ArrowRight, Check } from "lucide-react";
import BackToHome from "@/layout/BackToHome";
import { authService } from "@/services/authService";
import { instrumentService } from "@/services/instrumentService";
import type { Instrument, CreateStudentDto } from "@/types";
import { PaymentMethod, DayOfWeek, CourseLevel } from "@/types";
import { toast } from "sonner";

const paymentMethods = [
  { id: "orange", name: "Orange Money", value: PaymentMethod.ORANGE_MONEY, emoji: "🟠" },
  { id: "airtel", name: "Airtel Money", value: PaymentMethod.AIRTEL_MONEY, emoji: "🔴" },
  { id: "mvola", name: "MVola", value: PaymentMethod.MVOLA, emoji: "🟡" },
];

const days = [
  { id: "lundi", name: "Lundi", value: DayOfWeek.MONDAY },
  { id: "mardi", name: "Mardi", value: DayOfWeek.TUESDAY },
  { id: "mercredi", name: "Mercredi", value: DayOfWeek.WEDNESDAY },
  { id: "jeudi", name: "Jeudi", value: DayOfWeek.THURSDAY },
  { id: "vendredi", name: "Vendredi", value: DayOfWeek.FRIDAY },
  { id: "samedi", name: "Samedi", value: DayOfWeek.SATURDAY },
];

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  
  // Form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    password: "",
    selectedInstrument: "",
    selectedLevel: "",
    selectedDays: [] as string[],
    selectedTime: "",
    paymentMethod: ""
  });

  useEffect(() => {
    loadInstruments();
  }, []);

  const loadInstruments = async () => {
    console.log('Register.tsx - Début du chargement des instruments');
    try {
      console.log('Register.tsx - Appel à instrumentService.getAll()');
      const data = await instrumentService.getAll();
      console.log('Register.tsx - Données reçues du service:', data);
      console.log('Register.tsx - Nombre d\'instruments:', data.length);
      setInstruments(data);
      console.log('Register.tsx - Instruments state mis à jour');
    } catch (error) {
      console.error('Register.tsx - Erreur lors du chargement:', error);
      toast.error('Erreur lors du chargement des instruments');
    }
  };

  const toggleDay = (dayId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(dayId)
        ? prev.selectedDays.filter(d => d !== dayId)
        : [...prev.selectedDays, dayId]
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Get first admin (for now, we'll use admin_id = 2 as it exists in the database)
      const adminId = 2;
      
      // Create student
      const studentData: CreateStudentDto = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        current_level: formData.selectedLevel as CourseLevel || undefined,
        instrument_id: parseInt(formData.selectedInstrument),
        admin_id: adminId
      };
      
      const authResponse = await authService.register(studentData);
      authService.setToken(authResponse.access_token);
      
      toast.success('Inscription réussie !');
      navigate('/login');
      
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as { response?: { data?: { message?: string } }}).response?.data?.message 
        : 'Erreur lors de l\'inscription';
      toast.error(errorMessage || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BackToHome />
      <main className="flex-1 bg-linear-to-b from-cream to-background py-12">
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
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                    {step > s ? <Check className="h-5 w-5" /> : s}
                  </div>
                  {s < 5 && (
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
                      <Input 
                        placeholder="Votre prénom" 
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Nom</Label>
                      <Input 
                        placeholder="Votre nom" 
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input 
                      type="email" 
                      placeholder="votre@email.mg" 
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Téléphone</Label>
                    <Input 
                      placeholder="+261 34 XX XXX XX" 
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Âge</Label>
                    <Input 
                      type="number" 
                      placeholder="Votre âge" 
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Mot de passe</Label>
                    <Input 
                      type="password" 
                      placeholder="Choisissez un mot de passe" 
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      required
                    />
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
                  <RadioGroup value={formData.selectedInstrument} onValueChange={(value) => handleInputChange('selectedInstrument', value)}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {instruments.map((instrument) => (
                        <div key={instrument.id}>
                          <RadioGroupItem 
                            value={instrument.id.toString()} 
                            id={instrument.id.toString()}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={instrument.id.toString()}
                            className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:border-primary/50"
                          >
                            <span className="text-4xl">🎵</span>
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
                      disabled={!formData.selectedInstrument}
                      className="flex-1 gap-2 bg-primary hover:bg-primary/90"
                    >
                      Continuer
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Choose Level */}
            {step === 3 && (
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="font-serif flex items-center gap-2">
                    <Music className="h-6 w-6 text-primary" />
                    Quel est votre niveau ?
                  </CardTitle>
                  <CardDescription>Sélectionnez votre niveau actuel</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={formData.selectedLevel} onValueChange={(value) => handleInputChange('selectedLevel', value)}>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <RadioGroupItem 
                          value={CourseLevel.BEGINNER} 
                          id="beginner"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="beginner"
                          className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:border-primary/50"
                        >
                          <span className="text-3xl"> beginner</span>
                          <span className="font-semibold">Débutant</span>
                          <span className="text-sm text-muted-foreground text-center">Je débute totalement</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem 
                          value={CourseLevel.INTERMEDIATE} 
                          id="intermediate"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="intermediate"
                          className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:border-primary/50"
                        >
                          <span className="text-3xl"> intermediate</span>
                          <span className="font-semibold">Intermédiaire</span>
                          <span className="text-sm text-muted-foreground text-center">J'ai déjà des bases</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem 
                          value={CourseLevel.ADVANCED} 
                          id="advanced"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="advanced"
                          className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:border-primary/50"
                        >
                          <span className="text-3xl"> advanced</span>
                          <span className="font-semibold">Avancé</span>
                          <span className="text-sm text-muted-foreground text-center">Je suis expérimenté</span>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                      Retour
                    </Button>
                    <Button 
                      onClick={() => setStep(4)} 
                      disabled={!formData.selectedLevel}
                      className="flex-1 gap-2 bg-primary hover:bg-primary/90"
                    >
                      Continuer
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Schedule */}
            {step === 4 && (
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
                            formData.selectedDays.includes(day.id) 
                              ? 'border-primary bg-primary/5' 
                              : 'hover:border-primary/50'
                          }`}
                        >
                          <Checkbox checked={formData.selectedDays.includes(day.id)} />
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
                    <Select value={formData.selectedTime} onValueChange={(value) => handleInputChange('selectedTime', value)}>
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
                    <Button variant="outline" onClick={() => setStep(3)} className="flex-1">
                      Retour
                    </Button>
                    <Button 
                      onClick={() => setStep(5)} 
                      disabled={formData.selectedDays.length === 0 || !formData.selectedTime}
                      className="flex-1 gap-2 bg-primary hover:bg-primary/90"
                    >
                      Continuer
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 5: Payment */}
            {step === 5 && (
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="font-serif flex items-center gap-2">
                    <CreditCard className="h-6 w-6 text-primary" />
                    Mode de paiement
                  </CardTitle>
                  <CardDescription>Choisissez votre méthode de paiement préférée</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={formData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                    <div className="space-y-4">
                      {paymentMethods.map((method) => (
                        <div key={method.id}>
                          <RadioGroupItem value={method.id} id={method.id} className="peer sr-only" />
                          <Label
                            htmlFor={method.id}
                            className={`flex items-center gap-4 p-6 rounded-xl border-2 cursor-pointer transition-all peer-data-[state=checked]:border-${method.id === 'orange' ? 'orange-500' : method.id === 'airtel' ? 'red-500' : 'yellow-500'} peer-data-[state=checked]:bg-${method.id === 'orange' ? 'orange' : method.id === 'airtel' ? 'red' : 'yellow'}-50 hover:border-${method.id === 'orange' ? 'orange' : method.id === 'airtel' ? 'red' : 'yellow'}-300`}
                          >
                            <div className={`w-12 h-12 bg-${method.id === 'orange' ? 'orange-500' : method.id === 'airtel' ? 'red-600' : 'yellow-500'} rounded-lg flex items-center justify-center text-white font-bold`}>
                              {method.emoji}
                            </div>
                            <div>
                              <p className="font-semibold">{method.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {method.id === 'orange' ? 'Paiement mobile rapide et sécurisé' : 
                                 method.id === 'airtel' ? 'Transfert mobile simple et fiable' : 
                                 'Paiement Telma mobile'}
                              </p>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>

                  {/* Summary */}
                  <div className="bg-muted p-6 rounded-xl">
                    <h4 className="font-semibold mb-4">Récapitulatif</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Instrument</span>
                        <span className="font-medium">
                          {instruments.find(i => i.id.toString() === formData.selectedInstrument)?.name || '-'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Jours de cours</span>
                        <span className="font-medium">
                          {formData.selectedDays.length} jour(s)/semaine
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
                    <Button variant="outline" onClick={() => setStep(4)} className="flex-1">
                      Retour
                    </Button>
                    <Button 
                      disabled={!formData.paymentMethod || loading}
                      onClick={handleSubmit}
                      className="flex-1 gap-2 bg-primary hover:bg-primary/90"
                    >
                      {loading ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Traitement...
                        </>
                      ) : (
                        <>
                          <Check className="h-4 w-4" />
                          Confirmer l'inscription
                        </>
                      )}
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
