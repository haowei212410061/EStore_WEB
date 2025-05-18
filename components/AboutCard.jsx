"use client";

export default function AboutCard({content,title}) {
  return (
    <section className="aboutAs grid bg-white justify-center items-center text-center p-2 w-[300px] h-[250px] rounded-2xl">
      <h3 className="text-2xl block w-full h-[40px] relative mb-5 mt-2">{title}</h3>
      <p className="text-center block w-full h-[200px] text-gray-600">
        {content}
      </p>
    </section>
  );
}
