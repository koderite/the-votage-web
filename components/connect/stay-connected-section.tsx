import { Logo } from "../ui/logo";

export default function StayConnectedSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-white px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="font-copperplate text-2xl md:text-3xl font-black text-black mb-12 uppercase">
          STAY CONNECTED
        </h2>

        {/* Content with circle and text */}
        <div className="flex items-start gap-8">
          <div className="flex-shrink-0">
            <div className="w-28 h-28 rounded-full bg-black flex items-center justify-center overflow-hidden p-2">
              <Logo />
            </div>
          </div>
          <div className="flex-1 flex items-center">
            <p className="font-copperplate text-black text-sm md:text-base font-black leading-relaxed max-w-3xl uppercase">
              AT THE VOTAGE, WE EXIST TO REACH PEOPLE WITH THE LIFE-GIVING MESSAGE OF JESUS, THAT THEY MIGHT BECOME FULLY DEVOTED FOLLOWERS OF CHRIST.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
