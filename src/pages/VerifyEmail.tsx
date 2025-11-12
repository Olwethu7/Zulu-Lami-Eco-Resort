import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";


const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      const type = searchParams.get("type");
      
      if (!token || type !== "signup") {
        setStatus("error");
        setMessage("Invalid verification link");
        return;
      }
      
      try {
        // Verify the email using Supabase
        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'signup'
        });
        
        if (error) {
          console.error("Verification error:", error);
          setStatus("error");
          setMessage(error.message || "Verification failed");
        } else {
          setStatus("success");
          setMessage("Your email has been verified successfully!");
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setStatus("error");
        setMessage("An unexpected error occurred");
      }
    };
    
    verifyEmail();
  }, [searchParams]);
  
  return (
    <Layout>
      <div className="container max-w-md py-16">
        <Card>
          <CardHeader>
            <CardTitle className="font-montserrat text-center">
              Email Verification
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            {status === "loading" && (
              <>
                <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
                <p>Verifying your email...</p>
              </>
            )}
            
            {status === "success" && (
              <>
                <CheckCircle className="h-12 w-12 mx-auto text-green-600" />
                <p className="text-lg font-semibold">Email Verified Successfully!</p>
                <p className="text-muted-foreground">
                  {message}
                </p>
                <p className="text-muted-foreground">
                  Your account is now active. You can login to access your account.
                </p>
                <Button onClick={() => navigate("/login")} className="w-full">
                  Go to Login
                </Button>
              </>
            )}
            
            {status === "error" && (
              <>
                <XCircle className="h-12 w-12 mx-auto text-destructive" />
                <p className="text-lg font-semibold">Verification Failed</p>
                <p className="text-muted-foreground">
                  {message || "The verification link is invalid or has expired."}
                </p>
                <Button onClick={() => navigate("/login")} variant="outline" className="w-full">
                  Back to Login
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default VerifyEmail;
