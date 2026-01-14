const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold tracking-tight text-foreground">
            Lienzo en Blanco
          </h1>
          <p className="text-xl text-muted-foreground">
            Empieza a construir algo increíble hoy mismo.
          </p>
        </div>

        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Powered by <a
              href="https://AppCreatorBr.com"
              className="font-medium text-primary hover:underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              AppCreatorBr.com
            </a>
          </p>
        </div>
      </div>
    </div>

  );
};

export default Index;
