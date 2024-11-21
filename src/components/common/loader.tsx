const Loader = () => {
  return (
    <p className="flex gap-x-2 mb-1">
      <span className="w-1 h-1 rounded-full bg-black animate-bounce will-change-auto [animation-delay:.2s]"></span>
      <span className="w-1 h-1 rounded-full bg-black animate-bounce will-change-auto [animation-delay:.5s]"></span>
      <span className="w-1 h-1 rounded-full bg-black animate-bounce will-change-auto [animation-delay:.8s]"></span>
    </p>
  );
};

export default Loader;
