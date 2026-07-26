"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Settings, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [consents, setConsents] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("cookie-consent");
    if (!saved) {
      setIsVisible(true);
    }
  }, []);

  const acceptAll = () => {
    const allConsents = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setConsents(allConsents);
    localStorage.setItem("cookie-consent", JSON.stringify(allConsents));
    setIsVisible(false);
  };

  const acceptSelected = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(consents));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Full-screen overlay with backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-md"
          />

          {/* Modal centered on screen */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-[71] flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden w-full max-w-lg">
              {/* Header */}
              <div className="flex items-center justify-center p-6 pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                    <Cookie className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-xl">
                    Gestion des cookies
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 pt-4">
                <p className="text-gray-600 text-sm leading-relaxed mb-6 text-center">
                  Free Day Parking Beauvais utilise des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu. En cliquant sur <strong>« Tout accepter »</strong>, vous consentez à l'utilisation de tous les cookies et pouvez accéder au site.
                </p>

                {/* Main CTA */}
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={acceptAll}
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 flex items-center justify-center gap-2 text-base font-semibold"
                  >
                    <Check className="w-5 h-5" />
                    Tout accepter
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setShowDetails(!showDetails)}
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    {showDetails ? "Masquer les options" : "Personnaliser mes choix"}
                  </Button>
                </div>

                {/* Detailed preferences */}
                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-3 mt-4 border-t pt-4">
                        {/* Necessary */}
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">Cookies nécessaires</p>
                            <p className="text-xs text-gray-500">
                              Indispensables au fonctionnement du site (réservation, sécurité).
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">Toujours actif</span>
                            <div className="w-11 h-6 bg-purple-600 rounded-full relative">
                              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
                            </div>
                          </div>
                        </div>

                        {/* Analytics */}
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">Cookies analytiques</p>
                            <p className="text-xs text-gray-500">
                              Nous aident à comprendre comment vous utilisez le site (Google Analytics).
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              setConsents((prev) => ({
                                ...prev,
                                analytics: !prev.analytics,
                              }))
                            }
                            className={`w-11 h-6 rounded-full relative transition-colors ${
                              consents.analytics ? "bg-purple-600" : "bg-gray-300"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${
                                consents.analytics ? "right-1" : "left-1"
                              }`}
                            />
                          </button>
                        </div>

                        {/* Marketing */}
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">Cookies marketing</p>
                            <p className="text-xs text-gray-500">
                              Permettent de personnaliser les offres et mesurer les campagnes (Meta Pixel).
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              setConsents((prev) => ({
                                ...prev,
                                marketing: !prev.marketing,
                              }))
                            }
                            className={`w-11 h-6 rounded-full relative transition-colors ${
                              consents.marketing ? "bg-purple-600" : "bg-gray-300"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${
                                consents.marketing ? "right-1" : "left-1"
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        onClick={acceptSelected}
                        className="w-full mt-4 border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        Enregistrer mes choix
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
