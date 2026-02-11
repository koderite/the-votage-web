import { Heart, Flame, Award } from 'lucide-react';

export function CoreValues() {
  const values = [
    {
      title: 'Radical Honor & Relationship',
      description: 'We believe relationship is the glue of faith. We foster an "environment of honor" where no perfect people are allowed, building relevant, life-giving connections that anchor every believer.',
      bgColor: 'bg-black',
      textColor: 'text-white',
      offset: 'lg:translate-y-0',
      icon: Heart,
    },
    {
      title: 'Fervent Prayer & Power',
      description: 'We are a people of the Altar. Through consistent intercession and the Refresh mandate, we cultivate a spiritual atmosphere where the supernatural is a daily reality and the power of God is evidenced.',
      bgColor: 'bg-gray-200',
      textColor: 'text-black',
      offset: 'lg:translate-y-12',
      icon: Flame,
    },
    {
      title: 'Excellence in Mandate',
      description: 'We represent the Kingdom with distinction. From our digital reach to our local tribes, we "do all we can" with a spirit of excellence, ensuring the life-giving message of Jesus is presented with clarity, quality, and honor.',
      bgColor: 'bg-gray-800',
      textColor: 'text-white',
      offset: 'lg:translate-y-0',
      icon: Award,
    },
  ];

  return (
    <section className="bg-white py-20 px-6 md:px-[80px]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-copperplate text-black md:text-5xl font-bold mb-6 tracking-tight">
            OUR CORE VALUES
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Our values and beliefs are more than words; they define our identity and guide how we live, serve, and grow as a community.
          </p>
        </div>

        {/* Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-20">
          {values.map((value, index) => (
            <div
              key={index}
              className={`${value.bgColor} ${value.textColor} ${value.offset} p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.18)] transition-all duration-300 hover:scale-105`}
            >
              <value.icon className="w-10 h-10 mb-4" strokeWidth={1.5} />
              <h3 className="text-xl md:text-2xl font-bold mb-6 leading-tight">
                {value.title}
              </h3>
              <p className="text-base leading-relaxed opacity-90">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CoreValues;
