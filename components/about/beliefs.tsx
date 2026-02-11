import { Globe, HandshakeIcon, Users } from 'lucide-react';

export function Beliefs() {
  const beliefs = [
    {
      icon: Globe,
      title: 'found people, FIND PEOPLE',
      iconBgColor: 'bg-white',
    },
    {
      icon: HandshakeIcon,
      title: 'Saved People, SERVE PEOPLE',
      iconBgColor: 'bg-white',
    },
    {
      icon: Users,
      title: 'You CANNOT DO LIFE ALONE',
      iconBgColor: 'bg-white',
    },
  ];

  return (
    <section className="bg-gray-100/50 py-20 px-6 md:px-[80px]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl text-black font-copperplate md:text-5xl font-bold text-center mb-16 md:mb-20 tracking-tight">
          WHAT WE BELIEVE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
          {beliefs.map((belief, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className={`${belief.iconBgColor} p-6 md:p-5 rounded-full mb-6 md:mb-8 shadow-lg`}>
                <belief.icon className="w-14 h-14 md:w-15 md:h-15 text-black" strokeWidth={1.5} />
              </div>

              {/* Text */}
              <p className="text-lg text-black/80 md:text-xl lg:text-2xl leading-relaxed">
                We believe that <strong>{belief.title}</strong>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Beliefs;
