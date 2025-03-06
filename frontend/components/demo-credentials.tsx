function DemoCredentials() {
  return (
    <div className="text-sm text-center text-muted-foreground">
      <span>Demo Credentials:</span>
      <div className="mt-1 grid grid-cols-2 gap-2 text-xs">
        <div className="rounded border p-2 hover:bg-muted cursor-pointer">
          <p className="font-semibold">User</p>
          <p>user@example.com</p>
          <p>password</p>
        </div>
        <div className="rounded border p-2 hover:bg-muted cursor-pointer">
          <p className="font-semibold">Admin</p>
          <p>admin@example.com</p>
          <p>password</p>
        </div>
      </div>
    </div>
  );
}

export default DemoCredentials;
