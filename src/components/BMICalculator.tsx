import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Activity, Heart } from 'lucide-react';

interface BMIResult {
  bmi: number;
  category: 'underweight' | 'normal' | 'overweight' | 'obese';
  categoryText: string;
  advice: string;
  color: string;
}

export const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [result, setResult] = useState<BMIResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const getBMICategory = (bmi: number): BMIResult => {
    if (bmi < 18.5) {
      return {
        bmi,
        category: 'underweight',
        categoryText: 'Oziq-ovqat yetishmovchiligi',
        advice: 'Sog\'lom va muvozanatli ovqatlanishni oshiring. Shifokor bilan maslahatlashing.',
        color: 'text-underweight'
      };
    } else if (bmi >= 18.5 && bmi < 25) {
      return {
        bmi,
        category: 'normal',
        categoryText: 'Normal vazn',
        advice: 'Ajoyib! Sog\'lom vazningizni saqlab qolish uchun faol turmush tarzini davom eting.',
        color: 'text-normal'
      };
    } else if (bmi >= 25 && bmi < 30) {
      return {
        bmi,
        category: 'overweight',
        categoryText: 'Ortiqcha vazn',
        advice: 'Sog\'lom ovqatlanish va muntazam jismoniy mashqlar bilan vaznni kamaytirishga harakat qiling.',
        color: 'text-overweight'
      };
    } else {
      return {
        bmi,
        category: 'obese',
        categoryText: 'Semizlik',
        advice: 'Shifokor bilan maslahatlashib, vazn yo\'qotish rejasini tuzing. Salomatligingiz uchun muhim!',
        color: 'text-obese'
      };
    }
  };

  const calculateBMI = () => {
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (heightNum > 0 && weightNum > 0) {
      const heightInMeters = heightNum / 100;
      const bmi = weightNum / (heightInMeters * heightInMeters);
      const bmiResult = getBMICategory(bmi);
      
      setResult(bmiResult);
      setShowResult(true);
    }
  };

  const resetCalculator = () => {
    setHeight('');
    setWeight('');
    setResult(null);
    setShowResult(false);
  };

  const isFormValid = height !== '' && weight !== '' && parseFloat(height) > 0 && parseFloat(weight) > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 animate-fade-in">
          <div className="w-16 h-16 bg-gradient-health rounded-full flex items-center justify-center mx-auto mb-4 shadow-card">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-health bg-clip-text text-transparent">
            BMI Kalkulyatori
          </h1>
          <p className="text-muted-foreground">
            Tana massasi indeksini hisoblang va sog'ligingizni kuzating
          </p>
        </div>

        {/* Calculator Card */}
        <Card className="bg-gradient-card shadow-card border-0 animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Ma'lumotlarni kiriting
            </CardTitle>
            <CardDescription>
              Bo'y va vaznni to'g'ri kiriting
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="height">Bo'y (sm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="Masalan: 170"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="transition-all duration-200 focus:scale-[1.02]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="weight">Vazn (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="Masalan: 70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="transition-all duration-200 focus:scale-[1.02]"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button 
                onClick={calculateBMI}
                disabled={!isFormValid}
                className="flex-1 bg-gradient-health hover:opacity-90 transition-all duration-200 hover:scale-[1.02]"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Hisoblash
              </Button>
              {showResult && (
                <Button 
                  variant="outline" 
                  onClick={resetCalculator}
                  className="transition-all duration-200 hover:scale-[1.02]"
                >
                  Tozalash
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Result Card */}
        {showResult && result && (
          <Card className="bg-gradient-result shadow-result border-0 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Natija
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-primary">
                  {result.bmi.toFixed(1)}
                </div>
                <div className={`text-lg font-semibold ${result.color}`}>
                  {result.categoryText}
                </div>
              </div>

              <div className="bg-background/60 rounded-lg p-4 space-y-2">
                <h4 className="font-semibold text-foreground/80">Tavsiya:</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {result.advice}
                </p>
              </div>

              {/* BMI Scale Visual */}
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground text-center">BMI shkalasi</div>
                <div className="flex rounded-full h-2 overflow-hidden">
                  <div className="flex-1 bg-underweight"></div>
                  <div className="flex-1 bg-normal"></div>
                  <div className="flex-1 bg-overweight"></div>
                  <div className="flex-1 bg-obese"></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>&lt;18.5</span>
                  <span>18.5-24.9</span>
                  <span>25-29.9</span>
                  <span>≥30</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};