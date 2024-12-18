export default function SuccessPage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-4">Thank you for your purchase.</p>
          <a href="/home" className="text-white bg-green-500 py-2 px-3 hover:bg-green-700 transition-color duration-700">
            Return to Home
          </a>
        </div>
      </div>
    );
  }