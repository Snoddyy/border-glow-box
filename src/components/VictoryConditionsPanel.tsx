import { BorderGlowBox } from "./BorderGlowBox";

// Exemple d'utilisation du BorderGlowBox (les couleurs/fonts etc.. sont pas les bonnes)
// Mais juste vous wrapper votre contenu dans le BorderGlowBox et c'est bon
// Vous avez toutes les propriétés du BorderGlowBox à votre disposition :
// borderColor, lightColor, borderOpacity, glowWidth, glowInset, borderWidth
// className, children, borderWidth
// borderColor = "#1f5899ff",
// lightColor = "#ffffff",
// borderOpacity = 0.5,
// glowWidth = 1,
// glowInset = 0,
// borderWidth = 1.5,

export const VictoryConditionsPanel = () => {
  return (
    <div className="w-[500px] h-[450px] p-1">
      <BorderGlowBox>
        <div className="flex flex-col w-full h-full p-8 text-slate-200 font-sans">
          <div className="mb-8">
            <h2 className="text-xl font-semibold tracking-wider text-white uppercase mb-2">
              CONDITIONS DE VICTOIRE
            </h2>
            <div className="h-px w-full bg-linear-to-r from-slate-700 to-transparent" />
          </div>

          <p className="text-lg mb-8">
            Être la première équipe à terminer les 3 grilles.
          </p>

          <div className="space-y-6">
            <p className="text-slate-300">Pour terminer une grille :</p>

            <div className="flex items-start gap-4">
              <span className="text-red-500 font-bold text-xl mt-0.5">1</span>
              <span className="text-slate-300 text-lg">
                Trouver 9 mots sur 10.
              </span>
            </div>

            <div className="pl-8 text-slate-400">ou</div>

            <div className="flex items-start gap-4">
              <span className="text-red-500 font-bold text-xl mt-0.5">2</span>
              <span className="text-slate-300 text-lg">
                Reconstituer le mot mystère grâce aux cases en surbrillance
                rouge.
              </span>
            </div>
          </div>
        </div>
      </BorderGlowBox>
    </div>
  );
};
