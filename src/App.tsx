import { BorderGlowBox } from './components/BorderGlowBox'

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
              <BorderGlowBox lightColor="white" />
            </div>
            <div className="flex-1 w-full">
              <BorderGlowBox lightColor="white" />
            </div>
          </div>

          <div className="w-1/2" />

          <div className="w-1/4 flex flex-col gap-8">
            <div className="flex-[2] w-full">
              <BorderGlowBox lightColor="white" />
            </div>

            <div className="flex-1 w-full py-28">
              <BorderGlowBox
                borderColor="#ef4444"
                borderOpacity={0.2}
                lightColor="#ef4444"
                glowWidth={5}
                glowInset={0}
              />
            </div>
          </div>
        </div>

        <div className="h-[30%] w-full" />
      </div>
    </div>
  )
}

export default App
