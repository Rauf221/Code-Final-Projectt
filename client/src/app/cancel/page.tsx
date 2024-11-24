export default function CancelPage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
          <p className="text-gray-600 mb-4">Your payment was cancelled.</p>
          <a href="/home" className="text-white bg-blue-600 py-2 px-3 hover:bg-red-600 transition-color duration-700">
            Return to Home
          </a>
        </div>
      </div>
    );
  }