import { useEffect, useState, useRef } from 'react';
import { Users, Globe, Award, Shield, Heart, Target, MapPin, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Réinitialiser et jouer la vidéo quand elle devient visible
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
              videoRef.current.play().catch(e => console.log("Auto-play prevented", e));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const values = [
    {
      icon: Shield,
      title: "Confidentialité",
      description: "Respect absolu de la confidentialité de vos données et informations",
      gradient: "from-emerald-400 via-teal-500 to-cyan-600",
      shadowColor: "shadow-emerald-500/50",
      hoverGlow: "group-hover:shadow-emerald-400/80"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Engagement constant vers la qualité et l'amélioration continue",
      gradient: "from-amber-400 via-orange-500 to-red-500",
      shadowColor: "shadow-amber-500/50",
      hoverGlow: "group-hover:shadow-amber-400/80"
    },
    {
      icon: Heart,
      title: "Relation humaine",
      description: "Proximité et écoute pour une collaboration personnalisée",
      gradient: "from-rose-400 via-pink-500 to-purple-600",
      shadowColor: "shadow-rose-500/50",
      hoverGlow: "group-hover:shadow-rose-400/80"
    },
    {
      icon: Target,
      title: "Efficacité",
      description: "Solutions pratiques et résultats mesurables pour votre business",
      gradient: "from-violet-400 via-purple-500 to-indigo-600",
      shadowColor: "shadow-violet-500/50",
      hoverGlow: "group-hover:shadow-violet-400/80"
    }
  ];

  const teamImages = [
    "/images/img1.jpg",
    "/images/img2.jpg",
    "/images/img3.jpg",
    "/images/img4.jpg",
    "/images/img5.jpg"
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 relative overflow-hidden">
      {/* Background simplifié */}
      <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Vidéo de fond */}
          <video 
            ref={videoRef}
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/9669111-hd_1080_1920_25fps.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas les vidéos HTML5.
          </video>
          
          {/* Overlay pour assombrir la vidéo */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-slate-900/80 to-gray-800/90"></div>
        </div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center space-y-6 mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm px-6 py-2 rounded-full border border-purple-500/30">
            <MapPin className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 font-medium">Basée à Antananarivo, Madagascar</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Confiez vos tâches à VILO ASSIST-PRO
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Votre partenaire de confiance pour l'assistance virtuelle depuis Madagascar. 
            Une équipe passionnée au service de votre réussite.
          </p>
        </div>

        {/* Hero Video Section avec vidéo */}
       <div className={`mb-20 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-50/50 to-blue-50/60 p-8 border border-purple-200/30 backdrop-blur-sm">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-gray-900 space-y-6">
                <h3 className="text-4xl font-bold">
                  + de 5 Années d'Excellence
                </h3>
                <p className="text-xl text-gray-800 leading-relaxed">
                  Depuis notre création, nous avons bâti notre réputation sur la qualité, 
                  la fiabilité et l'innovation dans l'assistance virtuelle.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {teamImages.slice(0, 4).map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Team member ${index + 1}`}
                        className="w-12 h-12 rounded-full border-3 border-purple-300 object-cover shadow-lg"
                      />
                    ))}
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-900">Notre équipe dédiée</div>
                    <div className="text-gray-600">+10 professionnels experts</div>
                  </div>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl w-full aspect-video">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover"
                  ref={videoRef}
                >
                  <source src="/images/apropos.mp4" type="video/mp4" />
                  Votre navigateur ne supporte pas les vidéos HTML5.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Histoire et Mission - Nouvelle structure alignée */}
        <div className={`mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Bloc Histoire */}
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/20 shadow-2xl h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white">Notre Histoire</h3>
              </div>
              
              <div className="space-y-4 text-gray-300">
                <p className="leading-relaxed">
                  Il y a plus de 5 ans, VILO ASSIST-PRO est née de la vision de deux assistantes
                  virtuelles passionnées par leur métier, chacune avec son parcours,
                  ses compétences, son envie de contribuer concrètement au quotidien des entrepreneurs.
                </p>
                <p className="leading-relaxed">
                  Basée à Madagascar, nos routes se sont croisées, partageant les mêmes valeurs : 
                  sens du service, rigueur, bienveillance et goût du travail bien fait. Ensemble, nous 
                  avons allié nos forces et nos savoir-faire pour répondre aux besoins grandissants de nos client·es.
                </p>
                <p className="leading-relaxed">
                  De fil en aiguille, l'activité s'est développée, nos missions se sont diversifiées... 
                  et l'idée a naturellement émergé : créer non plus simplement une collaboration, mais une entreprise 
                  à part entière.
                </p>
              </div>
            </div>

            {/* Bloc Mission */}
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/20 shadow-2xl h-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-indigo-900/70 z-0"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">Notre Mission</h3>
                </div>
                
                <div className="space-y-4 text-gray-300">
                  <p className="leading-relaxed">
                    Permettre aux entrepreneurs de se concentrer sur leur cœur de métier 
                    en déléguant leurs tâches chronophages à des professionnels qualifiés.
                  </p>
                  <p className="leading-relaxed">
                    Nous nous engageons à fournir un service personnalisé, réactif et de qualité, 
                    adapté aux besoins spécifiques de chaque client.
                  </p>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20 mt-6">
                    <p className="text-center font-semibold italic text-white">
                      "Votre succès est notre priorité. Ensemble, nous construisons votre avenir."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques sous les deux blocs */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="text-center bg-gray-800/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-purple-500/20 transform hover:scale-105 transition-all duration-500 group">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-2xl shadow-purple-500/50 group-hover:shadow-purple-400/70 transition-all duration-500 transform group-hover:rotate-12 group-hover:scale-110">
                  <Users className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
              </div>
              <div className="font-bold text-3xl text-white mb-1 group-hover:text-purple-400 transition-colors">+10</div>
              <div className="text-sm text-gray-400 font-medium">Collaborateurs</div>
            </div>
            
            <div className="text-center bg-gray-800/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-blue-500/20 transform hover:scale-105 transition-all duration-500 group">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-600 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-2xl shadow-blue-500/50 group-hover:shadow-cyan-400/70 transition-all duration-500 transform group-hover:rotate-12 group-hover:scale-110">
                  <Globe className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
              </div>
              <div className="font-bold text-3xl text-white mb-1 group-hover:text-cyan-400 transition-colors">3</div>
              <div className="text-sm text-gray-400 font-medium">Continents</div>
            </div>
            
            <div className="text-center bg-gray-800/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-emerald-500/20 transform hover:scale-105 transition-all duration-500 group">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-2xl shadow-emerald-500/50 group-hover:shadow-green-400/70 transition-all duration-500 transform group-hover:rotate-12 group-hover:scale-110">
                  <Award className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
              </div>
              <div className="font-bold text-3xl text-white mb-1 group-hover:text-emerald-400 transition-colors">+5</div>
              <div className="text-sm text-gray-400 font-medium">Années</div>
            </div>
          </div>
        </div>

        {/* Team showcase */}
        <div className={`mb-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="text-center mb-12">
    <h3 className="text-4xl font-bold text-white mb-4">Notre Équipe Dédiée</h3>
    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
      Des professionnels passionnés et expérimentés, unis par la même vision : votre réussite.
    </p>
  </div>

  {/* Conteneur élargi avec largeur maximale augmentée */}
  <div className="relative mx-auto p-8 max-w-7xl bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-700 shadow-2xl overflow-x-auto">
    {/* Effet de texture murale */}
    <div className="absolute inset-0 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-10"></div>
    </div>
        
    {/* Lignes décoratives (optionnelles) */}
    <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
    <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
        
    {/* Conteneur des photos en ligne horizontale */}
    <div className="relative flex justify-center items-center gap-4 z-10 px-4 min-w-max">
      {teamImages.map((img, index) => (
        <div
          key={index}
          className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105 flex-shrink-0"
        >
          {/* Support mural élégant */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-6 flex justify-center">
            <div className="w-8 h-8 bg-gray-700 border-t-2 border-gray-600 rounded-t-full shadow-inner"></div>
          </div>
                    
          {/* Fil métallique */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-gray-400 to-gray-600"></div>
                    
          {/* Photo avec cadre amélioré */}
          <div className="relative overflow-hidden rounded-xl border-4 border-purple-400/90 shadow-xl bg-gray-900 transition-all duration-300 group-hover:border-purple-300 group-hover:shadow-2xl">
            <img
              src={img}
              alt={`Membre de l'équipe ${index + 1}`}
              className="w-48 h-60 md:w-56 md:h-72 object-cover transform transition-transform duration-500 group-hover:scale-105"
            />
            {/* Overlay au hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
              <span className="text-white font-medium text-lg">Membre {index + 1}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

        {/* Values */}
        <div className="space-y-12">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-white mb-4">Nos Valeurs</h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Les principes qui guident chacune de nos actions et décisions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className={`border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-4 bg-gray-800/90 backdrop-blur-sm group cursor-pointer overflow-hidden relative border border-gray-700/50 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } ${value.shadowColor} ${value.hoverGlow}`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <CardContent className="p-8 text-center relative z-10">
                  <div className="relative mb-6">
                    <div className={`w-24 h-24 bg-gradient-to-br ${value.gradient} rounded-3xl mx-auto flex items-center justify-center shadow-2xl transform transition-all duration-700 group-hover:rotate-12 group-hover:scale-110`}>
                      <value.icon className="w-12 h-12 text-white drop-shadow-2xl" />
                    </div>
                  </div>
                  
                  <h4 className="text-2xl font-bold text-white mb-4">
                    {value.title}
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Office location showcase */}
        <div className={`mt-20 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden group">
            <div className="relative z-10 text-center">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-cyan-500/50 group-hover:shadow-cyan-400/70 transition-all duration-700 transform group-hover:rotate-12 group-hover:scale-110">
                  <MapPin className="w-12 h-12 text-white drop-shadow-2xl" />
                </div>
              </div>
              
              <h4 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-200 bg-clip-text text-transparent">
                Basés à Antananarivo
              </h4>
              <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
                Depuis le cœur de Madagascar, nous servons nos clients à travers le monde, 
                combinant proximité culturelle francophone et excellence technique.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;