import { SignIn } from "@clerk/nextjs";
import { ClerkProvider } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#09090b' }}>
      <SignIn />
    </main>
  );
}
