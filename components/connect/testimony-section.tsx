export default function TestimonySection() {
  return (
    <section className="w-full py-16 md:py-24 bg-[#FFF8F0] px-4">
      <div className="max-w-4xl mx-auto">
        {/* Testimonial Card */}
        <div className="bg-white rounded-3xl border-4 border-black p-8 md:p-12 text-center">
          {/* Heading */}
          <h3 className="font-copperplate text-black text-xl md:text-2xl lg:text-3xl font-black uppercase mb-6 leading-tight">
            CONNECT CHANGED MY LIFE!!
          </h3>

          {/* Testimony Text */}
          <p className="font-body text-black text-sm md:text-base leading-relaxed mb-6">
            "I Joined Connect As A Really Confused Person. I Was Unclear About Major Decisions Of My Life And Unsure Of Where To Go From Where I Was. The Connect System Of Church Got Me Looking And By Extension Gave Me Access To People Who Walked With Me And Results In My Subsequent Life Decisions. Safe To Say I Am Not The Same Clueless Person Who Came To The Votage Indecisive And Helpless.I Currently Have Real Friends And Godly Connections I'd Never Have Imagined In Previous Years!"
          </p>

          {/* Author */}
          <p className="font-copperplate text-black text-xs md:text-sm uppercase tracking-wider font-black">
            ABISOYE GABRIEL
          </p>
        </div>
      </div>
    </section>
  );
}
