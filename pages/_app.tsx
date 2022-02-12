import "../styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <div className="bg-gray-100 py-8 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default App;
