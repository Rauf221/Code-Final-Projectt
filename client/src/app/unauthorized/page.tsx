
export default function UnauthorizedPage() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 text-center bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-600">YOU DONT HAVE PERMITION</h1>
          <p className="mt-2 text-gray-600">Unfortunately, you do not have permission to enter here.</p>
          <a 
            href="/home" 
            className="inline-block px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            back to Home page
          </a>
        </div>
      </div>
    )
  }