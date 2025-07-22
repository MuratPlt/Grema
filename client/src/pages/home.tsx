import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion, useInView } from "framer-motion";
import { 
  Building2, 
  Phone, 
  Shield, 
  Leaf, 
  Award, 
  Heart, 
  Clock, 
  Users, 
  ShieldCheck,
  Star,
  MapPin,
  Mail,
  Loader2,
  CheckCircle,
  Calendar,
  Menu,
  X,
  Quote,
  Sparkles,
  Crown,
  CheckCheck,
  ArrowRight,
  Gift,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Hammer,
  Zap,
  Trash2,
  Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { GoogleReviews } from "../components/GoogleReviews";
import { insertContactInquirySchema, type InsertContactInquiry } from "@shared/schema";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  
  // Carousel setup  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Animation refs for scroll-triggered effects
  const aboutRef = useRef(null);
  const processRef = useRef(null);
  const reviewsRef = useRef(null);
  const faqRef = useRef(null);
  const contactRef = useRef(null);
  
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const processInView = useInView(processRef, { once: true, margin: "-100px" });
  const reviewsInView = useInView(reviewsRef, { once: true, margin: "-100px" });
  const faqInView = useInView(faqRef, { once: true, margin: "-100px" });
  const contactInView = useInView(contactRef, { once: true, margin: "-100px" });

  const form = useForm<InsertContactInquiry>({
    resolver: zodResolver(insertContactInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactInquiry) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Erfolgreich gesendet!",
        description: data.message,
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler beim Senden",
        description: "Bitte versuchen Sie es später erneut oder rufen Sie uns direkt an.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactInquiry) => {
    contactMutation.mutate(data);
  };

  const services = [
    {
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Unterhalts- & Gewerbereinigung",
      description: "Regelmäßige Reinigung für Büros, Praxen und Geschäfte. Flexible Zeiten und individuelle Reinigungspläne.",
      href: "/services/unterhaltsreinigung",
      icon: "🏢"
    },
    {
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Grundreinigung",
      description: "Tiefenreinigung für Wohnungen, Büros und Gewerbe. Professionelle Dampfreinigung für makellose Sauberkeit.",
      href: "/services/grundreinigung",
      icon: "✨"
    },
    {
      image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Fenster- & Glasreinigung",
      description: "Streifenfreie Ergebnisse durch Osmose-Technik und professionelle Steiger-Ausrüstung. Auch schwer erreichbare Bereiche.",
      href: "/services/fensterreinigung",
      icon: "🪟"
    },
    {
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Industriereinigung",
      description: "Maschinenreinigung, Produktionsanlagen, Chemie-/Säurebehandlungen. Hochdruck- und Heißreinigung für optimale Betriebseffizienz.",
      href: "/services/industriereinigung",
      icon: "🏭"
    },
    {
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Bauschlussreinigung",
      description: "Komplette Bauschlussreinigung inklusive Wertstofftrennung und fachgerechter Entsorgung. Übergabebereit in kürzester Zeit.",
      href: "/services/bauschlussreinigung",
      icon: "🏗️"
    }
  ];

  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
      setIsTransitioning(false);
    }, 0);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
      setIsTransitioning(false);
    }, 0);
  };

  const usps = [
    {
      title: "Streifenfrei seit 2014",
      subtitle: "1000+ glänzende Fenster in Moers",
      description: "Kristallklar, fleckenlos, porentief rein – wir haben uns das Vertrauen durch makelloses Arbeiten verdient."
    },
    {
      title: "Moers kennen wir blitzeblank",
      subtitle: "kurze Wege, persönlicher Service",
      description: "Wir sind echte Moerser. Wir kennen jeden Winkel der Stadt und machen ihn sauber."
    },
    {
      title: "Ein Team, ein Versprechen",
      subtitle: "Professionelle Reinigungsdienstleistung",
      description: "Blitzeblank oder nichts! Wir stehen persönlich dafür ein, dass alles perfekt sauber wird."
    }
  ];

  const testimonials = [
    {
      text: "Das Team war pünktlich, freundlich und äußerst gründlich. Besonders beeindruckt hat mich die Sorgfalt, mit der jedes Detail beachtet wurde. Unsere KiTa glänzen förmlich und alle Ecken und Winkel wurden sorgfältig gereinigt.",
      author: "Vera M.", 
      company: "KiTa Moers",
      location: "Google Bewertung",
      years: "⭐⭐⭐⭐⭐"
    },
    {
      text: "Hat alles super geklappt, schnelle Terminvergabe, freundliche Mitarbeiter und meine Fenster sind wieder blitzeblank 😊 werde ich aufjedenfall weiterempfehlen 👍",
      author: "Sandra K.",
      company: "Privatkunde",
      location: "Google Bewertung", 
      years: "⭐⭐⭐⭐⭐"
    },
    {
      text: "Wir als FoodTruck Event Caterer sind vollsten zufrieden mit Herrn Grema und seinen Mitarbeitern. Ob komplette Küchenreinigung, Büro oder unsere FoodTrucks wir sind zufrieden und wenn es mal nicht so sein sollte, wird nachgebessert.",
      author: "Mario R.",
      company: "FoodTruck Caterer",
      location: "Google Bewertung", 
      years: "⭐⭐⭐⭐⭐"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <motion.nav 
        className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 anthracite-bg flex items-center justify-center">
                <Crown className="w-6 h-6 gold-accent" />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold text-gray-900">Grema</h1>
                <p className="text-sm text-gray-600 tracking-wide">GEBÄUDESERVICE GMBH</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#leistungen" className="text-gray-700 hover:gold-accent transition-colors font-medium">Leistungen</a>
              <a href="#ueber-uns" className="text-gray-700 hover:gold-accent transition-colors font-medium">Über uns</a>
              <a href="#referenzen" className="text-gray-700 hover:gold-accent transition-colors font-medium">Referenzen</a>
              <Button 
                asChild 
                className="anthracite-bg text-white hover:gold-shine font-bold px-8 py-3 text-lg sparkle-effect"
              >
                <a href="#kontakt">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Jetzt kostenlos anrufen!
                </a>
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: mobileMenuOpen ? "auto" : 0,
            opacity: mobileMenuOpen ? 1 : 0 
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
        >
          {mobileMenuOpen && (
            <motion.div 
              className="px-6 py-4 space-y-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <a href="#leistungen" className="block py-2 text-gray-700 hover:gold-accent transition-colors font-medium">Leistungen</a>
              <a href="#ueber-uns" className="block py-2 text-gray-700 hover:gold-accent transition-colors font-medium">Über uns</a>
              <a href="#referenzen" className="block py-2 text-gray-700 hover:gold-accent transition-colors font-medium">Referenzen</a>
              <Button asChild className="w-full anthracite-bg hover:gold-shine text-white font-bold mt-4 sparkle-effect">
                <a href="#kontakt">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Jetzt kostenlos anrufen!
                </a>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative crystal-bg min-h-[95vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 wipe-animation opacity-20"></div>
        
        {/* Premium Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tl from-gray-600/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Left Content - Enhanced */}
            <div className="lg:col-span-7 space-y-12">
              {/* Premium Badge */}
              <motion.div 
                className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Crown className="w-5 h-5 gold-accent" />
                <span className="text-sm font-medium text-gray-800">Premium Gebäudeservice seit 2014 • 5.0⭐ bei Google</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </motion.div>
              
              {/* Main Headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-5xl lg:text-6xl font-serif leading-[0.9] text-gray-900 mb-8">
                  Ihr Büro wird
                  <br />
                  <span className="gold-accent sparkle-effect relative">
                    kristallklar
                    <div className="absolute -inset-2 gold-shine opacity-20 blur-sm"></div>
                  </span>
                  <br />
                  <span className="text-4xl lg:text-5xl font-normal italic text-gray-700">in 24h bereit</span>
                </h1>
                
                <div className="flex items-start space-x-4 mb-10">
                  <div className="w-1 h-16 gold-shine sparkle-effect flex-shrink-0 mt-2"></div>
                  <div>
                    <p className="text-xl text-gray-700 leading-relaxed font-medium mb-4">
                      Während Sie arbeiten, machen wir <span className="gold-accent font-bold">blitzeblank sauber</span>.
                    </p>
                    <p className="text-base text-gray-600 leading-relaxed">
                      Moers' führender Gebäudeservice für Büros, Praxen & Gewerbe. Garantiert streifenfrei, 
                      pünktlich und mit 5-Sterne-Service.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Stats */}
              <motion.div 
                className="flex flex-wrap gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 min-w-[140px]">
                  <div className="text-4xl font-serif font-bold text-gray-900 mb-1">10</div>
                  <div className="text-sm font-medium text-gray-600">Jahre Erfahrung</div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 min-w-[140px]">
                  <div className="text-4xl font-serif font-bold gold-accent mb-1">5.0</div>
                  <div className="text-sm font-medium text-gray-600">⭐ Google Bewertung</div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 min-w-[140px]">
                  <div className="text-4xl font-serif font-bold text-gray-900 mb-1">24h</div>
                  <div className="text-sm font-medium text-gray-600">Reaktionszeit</div>
                </div>
              </motion.div>

              {/* Enhanced CTA Section */}
              <motion.div 
                className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <div className="flex flex-col space-y-4">
                  <Button 
                    asChild 
                    size="lg" 
                    className="gold-shine hover:scale-105 text-white px-10 py-5 text-lg font-bold sparkle-effect shadow-2xl"
                  >
                    <a href="tel:017634446399" className="flex items-center">
                      <Phone className="w-5 h-5 mr-3" />
                      Sofort anrufen: 0176 34446399
                    </a>
                  </Button>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Kostenlose Beratung</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Angebot in 24h</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Visual - Redesigned */}
            <div className="relative lg:col-span-5">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* Before/After Showcase */}
                <div className="space-y-6">
                  {/* Top Card - Before/After */}
                  <div className="bg-white rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-serif font-bold text-gray-900">Vorher vs. Nachher</h3>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="w-full h-24 bg-gray-200 rounded-lg mb-2 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 opacity-70"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs text-gray-600">Stumpf & Fleckig</span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">Vorher</span>
                      </div>
                      <div className="text-center">
                        <div className="w-full h-24 bg-gradient-to-br from-blue-100 to-yellow-50 rounded-lg mb-2 relative overflow-hidden sparkle-effect">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Sparkles className="w-6 h-6 gold-accent" />
                          </div>
                        </div>
                        <span className="text-xs text-green-600 font-medium">Kristallklar</span>
                      </div>
                    </div>
                  </div>

                  {/* Service Promise Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
                      <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-sm font-medium text-gray-800">24h Service</div>
                      <div className="text-xs text-gray-600">Schnell & zuverlässig</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-sm font-medium text-gray-800">100% Garantie</div>
                      <div className="text-xs text-gray-600">Oder Geld zurück</div>
                    </div>
                  </div>

                  {/* Contact Card */}
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-white rounded-2xl p-6 text-center">
                    <Phone className="w-10 h-10 mx-auto mb-3" />
                    <div className="text-lg font-bold mb-1">Sofort erreichbar</div>
                    <div className="text-2xl font-bold">0176 34446399</div>
                    <div className="text-sm opacity-90 mt-2">Mo-Sa: 7:00-18:00 Uhr</div>
                  </div>
                </div>

                {/* Floating Trust Badge */}
                <div className="absolute -top-4 -left-4 bg-white rounded-full p-3 shadow-lg border-4 border-green-500">
                  <div className="text-center">
                    <div className="text-2xl font-bold gold-accent">5.0</div>
                    <div className="text-xs text-gray-600">⭐⭐⭐⭐⭐</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Premium Carousel */}
      <section id="services" className="py-20 bg-[hsl(220,13%,97%)] relative overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[hsl(187,96%,43%)]/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-[hsl(213,78%,32%)]/5 rounded-full blur-xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-5xl lg:text-6xl font-serif text-gray-900 mb-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="inline-block">Unsere</span>{" "}
              <span className="gold-accent inline-block">Dienstleistungen</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Professionelle Gebäudereinigung für jeden Bedarf - von der Industrie bis zum Büro
            </motion.p>
          </motion.div>
          
          {/* Desktop Carousel Layout */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Navigation Buttons */}
              <Button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-900 rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-300"
                size="sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              
              <Button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-900 rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-300"
                size="sm"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>

              {/* Carousel Container */}
              <div className="mx-12 overflow-hidden">
                <div 
                  className="flex gap-8 transition-transform duration-500 ease-in-out"
                  style={{ 
                    transform: `translateX(-${currentIndex * (100 / 3)}%)`,
                  }}
                >
                  {[...services, ...services].map((service, index) => {
                    return (
                      <motion.div
                        key={`${service.title}-${index}`}
                        initial={{ y: 50, opacity: 0, rotateX: -15 }}
                        animate={{ y: 0, opacity: 1, rotateX: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                          duration: 0.8,
                          delay: index * 0.1
                        }}
                        className="flex-shrink-0 w-80 hover:scale-102 hover:-translate-y-1 transition-transform"
                      >
                        <div className="relative h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                          <img 
                            src={service.image} 
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(45,95%,50%)]/20 via-[hsl(45,95%,50%)]/10 to-transparent transition-opacity duration-300 group-hover:opacity-60" />
                          
                          <div className="absolute bottom-0 left-0 right-0 text-white transition-transform duration-300 group-hover:translate-y-0 z-10">
                            <div className="bg-gradient-to-t from-black/80 via-black/60 to-transparent p-6">
                            <h3 className="text-xl font-bold mb-2 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-yellow-300 group-hover:to-yellow-200 group-hover:bg-clip-text group-hover:text-transparent">
                              {service.title}
                            </h3>
                            <p className="text-sm opacity-90 mb-4 leading-relaxed transition-opacity duration-300 group-hover:opacity-100">
                              {service.description}
                            </p>
                            <Button 
                              className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/40 group-hover:scale-102"
                              size="sm"
                            >
                              Mehr Infos <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center mt-8 space-x-2">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'gold-shine scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Horizontal Scroll Layout */}
          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ y: 50, opacity: 0, rotateX: -15 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    duration: 0.8,
                    delay: index * 0.1
                  }}
                  className="flex-shrink-0 w-80 snap-start"
                >
                  <div className="relative h-96 rounded-xl overflow-hidden shadow-lg group">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(45,95%,50%)]/20 via-[hsl(45,95%,50%)]/10 to-transparent transition-opacity duration-300 group-hover:opacity-60" />
                    
                    <div className="absolute bottom-0 left-0 right-0 text-white transition-transform duration-300 group-hover:translate-y-0 z-10">
                      <div className="bg-gradient-to-t from-black/80 via-black/60 to-transparent p-6">
                      <h3 className="text-xl font-bold mb-2 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-yellow-300 group-hover:to-yellow-200 group-hover:bg-clip-text group-hover:text-transparent">
                        {service.title}
                      </h3>
                      <p className="text-sm opacity-90 mb-4 leading-relaxed transition-opacity duration-300 group-hover:opacity-100">
                        {service.description}
                      </p>
                      <Button 
                        className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/40 group-hover:scale-102"
                        size="sm"
                      >
                        Mehr Infos <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section ref={aboutRef} id="ueber-uns" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h2 
                className="text-5xl lg:text-6xl font-serif text-gray-900 mb-12 sparkle-effect"
                initial={{ opacity: 0, y: 50 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                Warum sind wir so <span className="gold-accent">blitzeblank</span>?
              </motion.h2>
              
              <div className="space-y-10">
                {usps.map((usp, index) => (
                  <motion.div 
                    key={index}
                    className="glass-card p-6 rounded-xl clean-hover sparkle-effect"
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={aboutInView ? { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1 
                    } : { 
                      opacity: 0, 
                      y: 30, 
                      scale: 0.95 
                    }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.4 + (index * 0.2),
                      ease: "easeOut" 
                    }}
                    whileHover={{ 
                      scale: 1.02, 
                      y: -5,
                      transition: { duration: 0.2 } 
                    }}
                  >
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">{usp.title}</h3>
                    <p className="gold-accent text-lg font-medium mb-3">{usp.subtitle}</p>
                    <p className="text-gray-600 leading-relaxed text-lg">{usp.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            >
              <motion.div 
                className="crystal-clear shadow-2xl rounded-2xl sparkle-effect"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={aboutInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              >
                <div className="p-10">
                  <motion.div 
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <h3 className="text-3xl font-serif font-bold text-gray-900 mb-2">Die Sauberfrauen von Moers</h3>
                    <p className="text-gray-600">Ihre persönlichen Ansprechpartnerinnen</p>
                  </motion.div>
                  
                  <div className="space-y-8">
                    {[
                      { name: "Tanja Scheurenberg", role: "Geschäftsführerin", dept: "Kundenbetreuung & Operations" },
                      { name: "Ivana Grejic", role: "Geschäftsführerin", dept: "Qualitätsmanagement & Projektleitung" }
                    ].map((person, index) => (
                      <motion.div 
                        key={index}
                        className="text-center"
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={aboutInView ? { 
                          opacity: 1, 
                          y: 0, 
                          scale: 1 
                        } : { 
                          opacity: 0, 
                          y: 30, 
                          scale: 0.9 
                        }}
                        transition={{ duration: 0.6, delay: 0.7 + (index * 0.1) }}
                        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                      >
                        <motion.div 
                          className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center"
                          whileHover={{ rotate: 5, transition: { duration: 0.3 } }}
                        >
                          <Users className="w-16 h-16 text-gray-400" />
                        </motion.div>
                        <div>
                          <h4 className="text-xl font-serif font-bold text-gray-900">{person.name}</h4>
                          <p className="gold-accent font-medium mb-2">{person.role}</p>
                          <p className="text-sm text-gray-600">{person.dept}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div 
                    className="mt-10 pt-8 border-t border-gray-200 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    <Quote className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-700 italic text-lg">
                      „Über 10 Jahre Erfahrung in der professionellen Gebäudereinigung – 
                      Moers ist unser Zuhause."
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} id="prozess" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2 
              className="text-5xl lg:text-6xl font-serif text-gray-900 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={processInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              In drei einfachen Schritten zu <span className="gold-accent">blitzblanken</span> Räumen
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Vom ersten Kontakt bis zum kristallklaren Ergebnis – unser bewährter Prozess garantiert höchste Qualität
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12 relative">
            {/* Step 1: Contact */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center relative"
            >
              <div className="relative mb-8">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-lg relative z-10">
                  <Phone className="w-16 h-16 text-gray-700" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 gold-bg rounded-full flex items-center justify-center text-white font-bold text-sm z-20">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">Kontaktaufnahme</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Starten Sie Ihre Anfrage online oder telefonisch. Wir beraten Sie persönlich und gehen individuell auf Ihre Anforderungen ein.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 gold-accent" />
                  <span>Kostenlose Beratung</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 gold-accent" />
                  <span>Individuelle Lösungen</span>
                </div>
              </div>
            </motion.div>

            {/* Step 2: Quote */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center relative"
            >
              <div className="relative mb-8">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-lg relative z-10">
                  <Calendar className="w-16 h-16 text-gray-700" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 gold-bg rounded-full flex items-center justify-center text-white font-bold text-sm z-20">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">Angebot erhalten</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Wir senden Ihnen kostenlos und unverbindlich ein maßgeschneidertes Angebot mit transparenten Leistungen und fairen Preisen.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 gold-accent" />
                  <span>Transparente Preise</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 gold-accent" />
                  <span>Detaillierte Leistungsbeschreibung</span>
                </div>
              </div>
            </motion.div>

            {/* Step 3: Execution */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center relative"
            >
              <div className="relative mb-8">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-lg relative z-10">
                  <Sparkles className="w-16 h-16 text-gray-700" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 gold-bg rounded-full flex items-center justify-center text-white font-bold text-sm z-20">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">Perfekte Ausführung</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Nach Erhalt und Annahme des Angebots beginnen wir mit den professionellen Reinigungsarbeiten und liefern kristallklare Ergebnisse.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 gold-accent" />
                  <span>Pünktliche Ausführung</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 gold-accent" />
                  <span>Garantierte Qualität</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex justify-center mt-16"
          >
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg text-center max-w-md">
              <h4 className="text-xl font-serif font-bold text-gray-900 mb-2">
                Bereit für blitzblanke Räume?
              </h4>
              <p className="text-gray-600 mb-6">
                Starten Sie jetzt mit Schritt 1 – Ihre kostenlose Beratung wartet!
              </p>
              <a 
                href="tel:017634446399"
                className="inline-flex items-center space-x-2 gold-bg text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
              >
                <span>Jetzt kostenlos anrufen!</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <motion.div
        ref={reviewsRef}
        initial={{ opacity: 0, y: 100 }}
        animate={reviewsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <GoogleReviews />
      </motion.div>

      {/* Contact Section */}
      <section ref={contactRef} id="kontakt" className="py-32 anthracite-bg text-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2 
              className="text-5xl lg:text-6xl font-serif text-white mb-8 sparkle-effect"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={contactInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Alles <span className="gold-accent">blitzeblank</span> machen lassen?
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Sprechen Sie direkt mit unserem Team. Kostenlos, unverbindlich, und garantiert kristallklar.
            </motion.p>
          </motion.div>
          
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            {/* Contact Info */}
            <motion.div 
              className="lg:col-span-2 space-y-10"
              initial={{ opacity: 0, x: -80 }}
              animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <div>
                <h3 className="text-3xl font-serif font-bold text-white mb-8">Direkte Kontaktaufnahme</h3>
                
                <div className="space-y-6">
                  <motion.div 
                    className="p-8 bg-white/5 rounded-2xl border border-white/10"
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={contactInView ? { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1 
                    } : { 
                      opacity: 0, 
                      y: 30, 
                      scale: 0.95 
                    }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    whileHover={{ 
                      scale: 1.02, 
                      y: -5,
                      transition: { duration: 0.2 } 
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="gold-bg p-3 rounded-full flex-shrink-0">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-300 text-sm mb-2">Sprechen Sie direkt mit uns:</p>
                        <a href="tel:017634446399" className="text-2xl font-serif font-bold text-white hover:gold-accent transition-colors block">
                          0176 / 3444 6399
                        </a>
                        <p className="text-gray-400 text-sm mt-2">Mo-Fr: 8:00-18:00 Uhr • Sa: 9:00-14:00 Uhr</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="p-8 bg-white/5 rounded-2xl border border-white/10"
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={contactInView ? { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1 
                    } : { 
                      opacity: 0, 
                      y: 30, 
                      scale: 0.95 
                    }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    whileHover={{ 
                      scale: 1.02, 
                      y: -5,
                      transition: { duration: 0.2 } 
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="gold-bg p-3 rounded-full flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-300 text-sm mb-2">Unser Standort:</p>
                        <p className="text-xl font-serif font-bold text-white">Moers & Umgebung</p>
                        <p className="text-gray-400 text-sm">Nordrhein-Westfalen</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                <motion.div 
                  className="mt-10 p-6 bg-yellow-600/20 rounded-2xl border border-yellow-600/30"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={contactInView ? { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1 
                  } : { 
                    opacity: 0, 
                    y: 30, 
                    scale: 0.95 
                  }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  whileHover={{ 
                    scale: 1.02, 
                    y: -5,
                    transition: { duration: 0.2 } 
                  }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <CheckCircle className="w-6 h-6 gold-accent" />
                    <h4 className="text-lg font-serif font-bold text-white">Kostenlose Erstberatung</h4>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Tanja und Ivana nehmen sich persönlich Zeit für Sie. Unverbindlich und kostenfrei.
                  </p>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div 
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 80 }}
              animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <motion.div 
                className="bg-white/95 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={contactInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              >
                <div className="p-10">
                  <h3 className="text-3xl font-serif font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-8">Gespräch vereinbaren</h3>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 text-sm font-medium">Vollständiger Name *</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Max Mustermann" 
                                  className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 h-12 rounded-xl focus:border-yellow-600 focus:ring-yellow-600"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 text-sm font-medium">E-Mail Adresse *</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email"
                                  placeholder="m.mustermann@beispiel.de" 
                                  className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 h-12 rounded-xl focus:border-yellow-600 focus:ring-yellow-600"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 text-sm font-medium">Telefon (optional)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="tel"
                                  placeholder="0123 456789" 
                                  className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 h-12 rounded-xl focus:border-yellow-600 focus:ring-yellow-600"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="service"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 text-sm font-medium">Interesse</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-white border-gray-200 text-gray-900 h-12 rounded-xl focus:border-yellow-600 focus:ring-yellow-600">
                                    <SelectValue placeholder="Bitte auswählen..." />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="unterhaltsreinigung">Büro-/Praxisreinigung</SelectItem>
                                  <SelectItem value="fensterreinigung">Fenster & Glas</SelectItem>
                                  <SelectItem value="bauabschlussreinigung">Bauabschlussreinigung</SelectItem>
                                  <SelectItem value="sonderreinigung">Sonderreinigung</SelectItem>
                                  <SelectItem value="entruempelung">Entrümpelung</SelectItem>
                                  <SelectItem value="beratung">Persönliche Beratung</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 text-sm font-medium">Ihre Nachricht (optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Teilen Sie uns gerne weitere Details zu Ihrem Projekt mit..." 
                                className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 resize-none min-h-24 rounded-xl focus:border-yellow-600 focus:ring-yellow-600"
                                rows={4}
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                      
                      <div className="pt-4">
                        <Button 
                          type="submit" 
                          className="w-full gold-bg hover:bg-yellow-700 text-white font-serif font-bold py-4 text-lg rounded-xl transition-all duration-300"
                          disabled={contactMutation.isPending}
                        >
                          {contactMutation.isPending ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Nachricht wird gesendet...
                            </>
                          ) : contactMutation.isSuccess ? (
                            <>
                              <CheckCircle className="w-5 h-5 mr-2" />
                              Erfolgreich gesendet!
                            </>
                          ) : (
                            <>
                              <Calendar className="w-5 h-5 mr-2" />
                              Persönliches Gespräch vereinbaren
                            </>
                          )}
                        </Button>
                        
                        <p className="text-sm text-gray-600 text-center mt-4 leading-relaxed">
                          <ShieldCheck className="w-4 h-4 mr-1 inline gold-accent" />
                          Ihre Daten werden streng vertraulich behandelt. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
                        </p>
                      </div>
                    </form>
                  </Form>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} id="faq" className="py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2 
              className="text-5xl lg:text-6xl font-serif text-gray-900 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={faqInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Häufige <span className="gold-accent">Fragen</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Alles was Sie über unsere professionelle Gebäudereinigung wissen möchten
            </motion.p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "Welche Reinigungsleistungen bieten Sie an?",
                answer: "Wir bieten ein umfassendes Spektrum professioneller Reinigungsdienstleistungen: Büroreinigung, Fensterreinigung mit modernster Osmose-Technik, Grundreinigung, Industriereinigung, Bauschlussreinigung und Hausmeisterservice. Alle Leistungen werden von unserem erfahrenen Team in höchster Qualität durchgeführt."
              },
              {
                question: "Wie erhalte ich ein Angebot für meine Räumlichkeiten?",
                answer: "Kontaktieren Sie uns einfach telefonisch unter 0176 34446399 oder nutzen Sie unser Kontaktformular. Wir beraten Sie kostenlos und unverbindlich, erstellen nach Ihren Wünschen ein maßgeschneidertes Angebot mit transparenten Preisen und detaillierter Leistungsbeschreibung."
              },
              {
                question: "Sind Sie auch außerhalb von Moers tätig?",
                answer: "Ja, neben unserem Hauptstandort Moers sind wir in der gesamten Region Niederrhein aktiv. Wir bedienen Kunden in Duisburg, Krefeld, Oberhausen und den umliegenden Gemeinden. Sprechen Sie uns gerne auf Ihren Standort an."
              },
              {
                question: "Welche Qualitätsstandards gewährleisten Sie?",
                answer: "Qualität steht bei uns an erster Stelle. Unser Team wird regelmäßig geschult, wir verwenden professionelle Reinigungsgeräte und umweltfreundliche Reinigungsmittel. Jede Reinigung wird nach unseren hohen Standards durchgeführt und kontrolliert. Bei Problemen stehen wir sofort zur Verfügung."
              },
              {
                question: "Bieten Sie regelmäßige Reinigungsverträge an?",
                answer: "Selbstverständlich! Wir bieten flexible Reinigungsverträge für regelmäßige Büroreinigung, Praxisreinigung und Objektbetreuung. Die Intervalle stimmen wir individuell auf Ihre Bedürfnisse ab – täglich, wöchentlich oder monatlich. Langfristige Verträge bieten attraktive Kostenvorteile."
              },
              {
                question: "Sind Sie versichert und wie flexibel sind die Termine?",
                answer: "Ja, wir sind vollständig versichert und verfügen über alle erforderlichen Gewerbegenehmigungen. Bei den Terminen sind wir sehr flexibel – auch Reinigungen außerhalb der regulären Geschäftszeiten, an Wochenenden oder Feiertagen sind nach Absprache möglich."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={faqInView ? { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1 
                } : { 
                  opacity: 0, 
                  y: 30, 
                  scale: 0.95 
                }}
                transition={{ duration: 0.6, delay: 0.6 + (index * 0.1), ease: "easeOut" }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  transition: { duration: 0.2 } 
                }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <details className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                  <summary className="cursor-pointer p-8 flex items-center justify-between hover:bg-gray-50 transition-colors duration-300">
                    <h3 className="text-xl font-serif font-bold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full gold-bg flex items-center justify-center transition-transform duration-300 group-open:rotate-180">
                      <ChevronRight className="w-5 h-5 text-white transform rotate-90" />
                    </div>
                  </summary>
                  <div className="px-8 pb-8">
                    <div className="border-t border-gray-100 pt-6">
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h4 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                Ihre Frage war nicht dabei?
              </h4>
              <p className="text-gray-600 mb-6 text-lg">
                Kein Problem! Rufen Sie uns an oder schreiben Sie uns – wir beantworten gerne alle Ihre Fragen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="tel:017634446399"
                  className="inline-flex items-center space-x-2 gold-bg text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
                >
                  <Phone className="w-5 h-5" />
                  <span>0176 34446399</span>
                </a>
                <a 
                  href="#kontakt"
                  className="inline-flex items-center space-x-2 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold hover:border-gray-400 transition-colors duration-300"
                >
                  <Mail className="w-5 h-5" />
                  <span>Nachricht senden</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center border-t border-gray-700 pt-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 anthracite-bg flex items-center justify-center">
                <Crown className="w-4 h-4 gold-accent" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-white">Grema Gebäudeservice GmbH</h3>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Professionelle Gebäudereinigung in Moers seit 2014. 
              Geschäftsführerinnen: Tanja Scheurenberg & Ivana Grejic
            </p>
            
            <div className="flex justify-center items-center space-x-8 text-gray-400 text-sm mb-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 gold-accent" />
                <a href="tel:017634446399" className="hover:text-white transition-colors">0176/3444 6399</a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 gold-accent" />
                <span>Moers, NRW</span>
              </div>
            </div>
            
            <div className="text-gray-500 text-sm">
              <p>&copy; 2025 Grema Gebäudeservice GmbH. Alle Rechte vorbehalten.</p>
              <div className="flex justify-center space-x-6 mt-3">
                <a href="#" className="hover:text-white transition-colors">Impressum</a>
                <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
                <a href="#" className="hover:text-white transition-colors">AGB</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
