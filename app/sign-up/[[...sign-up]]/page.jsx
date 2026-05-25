import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black font-sans">
      <SignUp
        appearance={{
          cssLayerName: "clerk",
          variables: {
            borderRadius: "0px",
            colorBackground: "#000000",
            colorInputBackground: "#000000",
            colorInputText: "#ffffff",
          },
          options: {
            socialButtonsPlacement: "bottom",
          },
          elements: {
            card: "w-full bg-black shadow-none p-0",
            headerTitle: "text-2xl font-light tracking-tight text-white",
            headerSubtitle: "text-xs text-neutral-600 font-light tracking-widest uppercase",

            socialButtonsBlockButton:
              "w-full bg-transparent border-0 rounded-none px-0 shadow-none",
            socialButtonsBlockButtonText:
              "text-sm font-light text-neutral-600 hover:text-white transition-colors relative right-3",
            socialButtonsProviderIcon: "hidden",

            dividerLine: "bg-neutral-950",
            dividerText: "text-xs tracking-widest text-neutral-800",

            formFieldLabel: "hidden",
            formInput:
              "bg-black text-white text-sm border-0 border-b border-neutral-800 rounded-none px-0 py-2.5 placeholder:text-neutral-600 focus:outline-none focus:ring-0 focus:border-neutral-700 shadow-none [&:-webkit-autofill]:shadow-[0_0_0px_1000px_#000_inset] [&:-webkit-autofill]:[webkit-text-fill-color:#fff]",
            formFieldErrorText: "text-xs text-neutral-600 mt-1",
            formButtonPrimary:
              "bg-transparent text-white text-sm font-light shadow-none border-none rounded-none hover:bg-transparent",

            otpCodeFieldInput:
              "bg-black text-white border-0 border-b border-neutral-800 rounded-none shadow-none focus:outline-none focus:ring-0",

            footer: "hidden",
          },
        }}
      />
    </div>
  );
}
