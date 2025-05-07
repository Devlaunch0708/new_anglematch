import Image from "next/image";
import wtp1 from "../assets/wtp1.png";
import wtp2 from "../assets/wtp2.png";
import wtp3 from "../assets/wtp3.png";

export default function WhereToPitch() {
  return (
    <div className="bg-white text-black min-h-screen font-sans md:w-[90vw] lg:w-[85vw] mx-auto">
      {/* Main Heading */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-10">
          How to find your investor with{" "}
          <span className="text-blue-500">DevLaunch</span>
        </h1>
      </div>

      {/* Step 1 Section */}
      <div className="bg-gray-900 text-white md:rounded-xl px-8 rounded-lg mx-4">
        <div className="container mx-auto  py-16 flex flex-col lg:flex-row justify-between items-center gap-12 ">
          <div className="lg:w-1/3 space-y-4 px-4">
            <h2 className="text-3xl font-bold">1. SEARCH INVESTORS</h2>
            <p className="text-blue-300">
              Look and filter for investors according to location, industry, and
              other investment preferences.
            </p>
          </div>
          <div className="lg:w-2/3  mb-[-65px]">
            <Image
              src={wtp1}
              alt="Investor search interface"
              className="rounded-lg shadow-xl w-full "
            />
          </div>
        </div>
      </div>

      {/* Steps 2 and 3 Section */}
      <div className="text-white py-6 mt-8">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-6">
          {/* Step 2 */}
          <div className="bg-gray-900 p-8 rounded-lg  relative min-h-[400px] lg:min-h-[500px]">
            <h2 className="text-3xl font-bold text-center mb-4">
              2. CREATE INVESTOR LIST
            </h2>
            <p className="text-blue-300 text-center mb-8">
              Add and export investor leads as CSV files or directly email them
              on the platform
            </p>
            <div className="absolute bottom-0 w-4/5 left-[10%]">
              <Image
                src={wtp2}
                alt="Investor CRM interface"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-gray-900 p-8 rounded-lg relative min-h-[400px] lg:min-h-[500px]">
            <h2 className="text-3xl font-bold text-center mb-4">
              3. START PITCHING
            </h2>
            <p className="text-blue-300 text-center mb-8">
              Send personalized emails and manage investor interactions in one
              place.
            </p>
            <div className="absolute bottom-0 w-4/5 left-[10%]">
              <Image
                src={wtp3}
                alt="Email interface"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* CTA Button */}
        {/* <div className="flex justify-center mt-12 mb-16">
          <button 
            className={`bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-lg text-lg transition-colors`}
          >
            Get started!
          </button>
        </div> */}
      </div>
    </div>
  );
}
