function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070810]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1800px] items-center justify-between px-4 py-3 sm:px-6 lg:px-14">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center">
            <img
              src="https://www.bitget.com/baseasset/img/taxes-api/Koinx_D.png"
              alt="KoinX Logo"
              className="h-10 w-10 rounded-xl object-cover"
            />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">KoinX</h1>
        </div>
        
      </div>
    </header>
  );
}

export default Navbar;
