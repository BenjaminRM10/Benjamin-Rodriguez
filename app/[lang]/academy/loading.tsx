export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0e27]">
            <div className="relative flex flex-col items-center">
                {/* Spinner */}
                <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>

                {/* Logo/Text */}
                <div className="mt-6 text-center">
                    <span className="font-bold text-xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 animate-pulse">
                        Loading Academy...
                    </span>
                </div>
            </div>
        </div>
    );
}
