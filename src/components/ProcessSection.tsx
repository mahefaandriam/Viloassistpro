import { useState, useEffect } from 'react';
import { MessageCircle, Users, Rocket, ArrowRight, UserCheck, Monitor } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ProcessSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('process');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 4);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const steps = [
    {
      icon: MessageCircle,
      title: "1. Premier contact",
      description: "Échange initial pour comprendre vos besoins spécifiques",
      details: [
        "Appel de découverte gratuit",
        "Analyse de vos besoins",
        "Définition des objectifs"
      ]
    },
    {
      icon: UserCheck,
      title: "2. Étude du/des profils adaptés",
      description: "Recherche du candidat idéal pour votre activité",
      details: [
        "Sélection du candidat idéal avec les compétences requises",
        "Présentation de l'assistant"
      ]
    },
    {
      icon: Rocket,
      title: "3. Lancement",
      description: "Mise en relation et démarrage de la collaboration",
      details: [
        "Échange de contact entre vous et l'assistant",
        "Accompagnement lors du démarrage",
        "Période test"
      ]
    },
    {
      icon: Monitor,
      title: "4. Suivi",
      description: "Accompagnement continu pour optimiser la collaboration",
      details: [
        "Suivi hebdomadaire",
        "Rapports réguliers"
      ]
    }
  ];

  return (
    <section id="process" className="relative py-20 bg-gradient-to-br from-black via-purple-900 via-pink-900 to-white overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-60">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover brightness-110 contrast-125"
        >
          <source src="/videos/8088612-uhd_4096_2160_25fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Overlay gradient for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-purple-900/20 via-pink-900/20 to-white/30 z-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center space-y-4 mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Comment ça marche ?
          </h2>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Un processus simple et transparent pour une collaboration efficace
          </p>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Timeline mobile */}
          <div className="md:hidden space-y-8">
            {steps.map((step, index) => (
              <Card 
                key={index}
                className={`border-l-4 transition-all duration-500 bg-white/80 backdrop-blur-sm border-gray-300 ${
                  activeStep === index 
                    ? 'border-l-purple-400 shadow-lg shadow-purple-500/20' 
                    : 'border-l-gray-400'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      activeStep === index
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                        : 'bg-gray-800 text-gray-400'
                    }`}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, i) => (
                          <li key={i} className="text-gray-700 text-sm flex items-start">
                            <span className="text-purple-500 mr-2">•</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Timeline desktop */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-700 -translate-y-1/2">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000 shadow-lg shadow-purple-500/50"
                  style={{ width: isVisible ? `${((activeStep + 1) / 4) * 100}%` : '0%' }}
                />
              </div>

              <div className="grid grid-cols-4 gap-8">
                {steps.map((step, index) => (
                  <div 
                    key={index}
                    className={`text-center transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <div className="relative">
                      <div 
                        className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 transition-all duration-500 ${
                          index <= activeStep
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-110 shadow-xl shadow-purple-500/40'
                            : 'bg-white text-gray-800 border-2 border-gray-300'
                        }`}
                      >
                        <step.icon className="w-8 h-8" />
                      </div>
                    </div>
                    
                    <Card className={`transition-all duration-500 bg-white/90 backdrop-blur-sm border-gray-300 ${
                      index === activeStep ? 'shadow-xl shadow-purple-500/20 scale-105 border-purple-500/50' : 'shadow-md'
                    }`}>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                        
                        <div className="space-y-2">
                          {step.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="flex items-center text-xs text-gray-700">
                              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2" />
                              {detail}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-black/40 via-purple-900/25 via-pink-900/25 to-white/40 rounded-2xl p-8 backdrop-blur-md border border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                Prêt à commencer ?
              </h3>
              <p className="text-white mb-6 max-w-2xl mx-auto">
                La première consultation est gratuite et sans engagement. 
                Découvrons ensemble comment VILO ASSIST-PRO peut vous faire gagner du temps.
              </p>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-medium transition-all inline-flex items-center shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105"
              >
                Planifier ma consultation gratuite
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;