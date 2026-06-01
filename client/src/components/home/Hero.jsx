export default function Hero() {
  return (
    <section className="pt-8 pb-6 sm:pt-10 sm:pb-8">
      <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Portfolio Generator</h1>
      <p className="mt-3 max-w-xl text-lg font-medium text-gray-800">
        Convert your resume into a professional portfolio website in seconds.
      </p>
      <p className="mt-2 max-w-xl text-base text-gray-600">
        Upload a PDF or DOCX resume and automatically generate a portfolio page.
      </p>
      <a href="#upload" className="btn-primary mt-5 inline-flex">
        Get started
      </a>
    </section>
  );
}
