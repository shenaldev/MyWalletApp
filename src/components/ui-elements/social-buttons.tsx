import { Facebook, Mail } from "lucide-react";

import { Button } from "../ui/button";

const APP_URL = import.meta.env.VITE_APP_URL;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const googleOptions = {
  client_id: GOOGLE_CLIENT_ID,
  redirect_uri: `${APP_URL}/auth/login?`,
  response_type: "token",
  scope:
    "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
};

function SocialButtons() {
  function handleGoogleAuth() {
    const url = new URL("https://accounts.google.com/o/oauth2/auth");
    url.search = new URLSearchParams(googleOptions).toString();
    window.location.replace(url.toString());
  }

  return (
    <div className="flex space-x-4">
      <Button
        variant="outline"
        className="w-full dark:bg-card dark:hover:bg-slate-700"
        type="button"
      >
        <Facebook className="mr-2 h-4 w-4" />
        Facebook
      </Button>
      <Button
        variant="outline"
        className="w-full dark:bg-card dark:hover:bg-slate-700"
        type="button"
        onClick={handleGoogleAuth}
      >
        <Mail className="mr-2 h-4 w-4" />
        Google
      </Button>
    </div>
  );
}

export default SocialButtons;
