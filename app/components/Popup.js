// Popup component that renders a modal-like popup
export default function Popup({ setShow, children, title }) {
  return (
    // Fixed position container covering the entire viewport with a semi-transparent background
    <div className="fixed inset-0 bg-white md:bg-black md:bg-opacity-80 flex md:items-center">
      {/* Close button for larger screens (hidden on small screens) */}
      <button onClick={() => setShow(false)} className="hidden md:block fixed top-4 right-4 text-white">
        {/* Close icon */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="w-full">
        {/* Container for the popup content */}
        <div className="bg-white md:max-w-3xl md:mx-auto md:rounded-lg overflow-hidden">
          <div className="relative min-h-[40px] md:min-h-0">
            {/* Close button for smaller screens (hidden on larger screens) */}
            <button onClick={() => setShow(false)} className="absolute top-4 left-4 md:hidden text-gray-600">
              {/* Close icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </button>
            {/* Renders a title if provided */}
            {!!title && (
              <h2 className="py-4 text-center border-b">
                {title}
              </h2>
            )}
          </div>
          {/* Renders children components inside the popup */}
          {children}
        </div>
      </div>
    </div>
  );
}
