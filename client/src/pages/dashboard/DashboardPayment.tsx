import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, CheckCircle, Clock, Download } from "lucide-react";
import DashboardLayout from "./DashboardLayout";

const paymentHistory = [
  { 
    id: 1, 
    date: "1 Fév 2026", 
    amount: "50 000 Ar", 
    method: "Orange Money",
    methodColor: "bg-orange-500",
    status: "paid",
    period: "Février 2026"
  },
  { 
    id: 2, 
    date: "1 Jan 2026", 
    amount: "50 000 Ar", 
    method: "Orange Money",
    methodColor: "bg-orange-500",
    status: "paid",
    period: "Janvier 2026"
  },
  { 
    id: 3, 
    date: "1 Déc 2025", 
    amount: "50 000 Ar", 
    method: "MVola",
    methodColor: "bg-yellow-500",
    status: "paid",
    period: "Décembre 2025"
  },
];

const DashboardPayments = () => {
  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-charcoal mb-2">
            Paiements
          </h1>
          <p className="text-muted-foreground">
            Gérez vos abonnements et consultez votre historique
          </p>
        </div>

        {/* Current Subscription */}
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-serif text-xl">Abonnement actuel</CardTitle>
                <CardDescription>Guitare - Programme Intermédiaire</CardDescription>
              </div>
              <Badge className="bg-green-500 text-white">Actif</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Montant mensuel</p>
                <p className="text-2xl font-bold text-primary">50 000 Ar</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Prochain paiement</p>
                <p className="text-lg font-semibold">1 Mars 2026</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Mode de paiement</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">
                    OM
                  </div>
                  <span className="font-medium">Orange Money</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Modes de paiement disponibles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border-2 border-orange-500 bg-orange-50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                    OM
                  </div>
                  <span className="font-semibold">Orange Money</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Numéro: 034 12 345 67
                </p>
              </div>

              <div className="p-4 rounded-lg border-2 border-transparent hover:border-red-500 hover:bg-red-50 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold">
                    AM
                  </div>
                  <span className="font-semibold">Airtel Money</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Cliquez pour configurer
                </p>
              </div>

              <div className="p-4 rounded-lg border-2 border-transparent hover:border-yellow-500 hover:bg-yellow-50 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center text-charcoal font-bold">
                    MV
                  </div>
                  <span className="font-semibold">MVola</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Cliquez pour configurer
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Historique des paiements</CardTitle>
            <CardDescription>Vos transactions passées</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentHistory.map((payment) => (
                <div 
                  key={payment.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{payment.period}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {payment.date}
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <div className={`w-3 h-3 rounded ${payment.methodColor}`} />
                          {payment.method}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-lg">{payment.amount}</span>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPayments;
