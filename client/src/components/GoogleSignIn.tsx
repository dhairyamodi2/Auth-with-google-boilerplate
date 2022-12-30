import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { useNavigate } from "react-router-dom";


interface CredentialResponse{
    clientId?: string | undefined;
    credential?: string | undefined;
    select_by?: string | undefined;
}

interface Props{
    signup : boolean;
}
const GoogleSignIn: React.FC<Props> = (props) => {
    const navigate = useNavigate();
    const handleSuccess = async (credentialResponse : CredentialResponse) =>{
        if(credentialResponse.credential && credentialResponse.clientId){
            sessionStorage.setItem('credentials', credentialResponse.credential);
            sessionStorage.setItem('client_id', credentialResponse.clientId);
        }
        console.log('here');
        if(props.signup === true){
            navigate('/auth/bearer/completeprofile')
        }
    }
    return (
        <div className="google-services">
            <GoogleOAuthProvider clientId='885646979112-04k64t2b5po5i9mjm2t0n9h2lvlpci22.apps.googleusercontent.com'>
                <GoogleLogin
                    useOneTap={true}
                    onSuccess={handleSuccess}
                    onError={() => {
                        console.log("Login Failed");
                    }}
                />
            </GoogleOAuthProvider>
        </div>
    )
}

export default GoogleSignIn;