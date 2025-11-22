import { BorderGlowBox } from "./components/BorderGlowBox";
import { VictoryConditionsPanel } from "./components/VictoryConditionsPanel";

function App() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      >
        <source src="/BG-Blue-Red-Loop-V1.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 w-full h-full flex flex-col">
        <div className="flex-1 h-[70%] w-full flex px-12 pt-10 pb-4">
          <div className="w-1/4 flex flex-col gap-8">
            <div className="flex-1 w-full">
              <VictoryConditionsPanel />
            </div>
            <div className="flex-1 w-full">
              <BorderGlowBox lightColor="white" />
            </div>
          </div>

          <div className="w-1/2" />

          <div className="w-1/4 flex flex-col gap-8">
            <div className="flex-2 w-full">
              <BorderGlowBox />
            </div>

            <div className="flex-1 w-full py-28">
              <BorderGlowBox borderColor="#972B2B" lightColor="#ef4444" />
            </div>
          </div>
        </div>

        <div className="h-[30%] w-full" />
      </div>
    </div>
  );
}

export default App;
