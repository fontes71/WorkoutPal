import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Redirect, useRouter } from "expo-router";
import PasswordInput from "@/assets/components/auth/PasswordInput";
import styles from "@/assets/styles/auth";
import { deleteUser, getLocalUser, login } from "@/services/auth";
import LogoContainer from "@/assets/components/auth/LogoContainer";
import ErrorContainer from "@/assets/components/auth/ErrorContainer";
import ConnectWithGoogleContainer from "@/assets/components/auth/ConnectWithGoogleContainerSignup";
import { UserContext } from '@/assets/components/auth/AuthContext'

type ErrorInfo = {
  readonly responseError: ResponseError | undefined;
};

type InputInfo = {
  readonly email: string;
  readonly setEmail: React.Dispatch<React.SetStateAction<string>>;
  readonly password: string;
  readonly setPassword: React.Dispatch<React.SetStateAction<string>>;
};

type ButtonInfo = {
  readonly setResponseError: React.Dispatch<
    React.SetStateAction<ResponseError | undefined>
  >;
  readonly email: string;
  readonly password: string;
};

function LoginScreen() {
  const [user, setUser] = useState<User | null>(null)
  getLocalUser().then( u => {
    if (u != null) setUser(u)
  })

  return (
    <>
      { user ? <Redirect href="exercises"/> : 
        <View style={styles.main_container}>
          <LogoContainer imageStyle={styles.logo_image_login} />
          <LoginContainer />
        </View>
      }
    </>
  );
}

function LoginContainer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseError, setResponseError] = useState<
    ResponseError | undefined
  >();

  return (
    <View style={styles.login_container}>
      <LoginHeader />

      <ErrorContainer responseError={responseError} />
      <InputsContainer
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
      <LoginButton
        setResponseError={setResponseError}
        email={email}
        password={password}
      />

      <ConnectWithGoogleContainer />
    </View>
  );
}

function LoginHeader() {
  return (
    <View>
      <Text style={[styles.text, styles.header_text]}>Log In</Text>
      <Text style={[styles.text, styles.small_text]}>
        Sign In and start getting the most out of our app
      </Text>
    </View>
  );
}

function InputsContainer({
  email,
  setEmail,
  password,
  setPassword,
}: InputInfo) {
  return (
    <View style={styles.inputs_container}>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <PasswordInput
        password={password}
        setPassword={setPassword}
      ></PasswordInput>
    </View>
  );
}

function LoginButton({ setResponseError, email, password }: ButtonInfo) {
  const [fetching, setFetching] = useState(false);
  const router = useRouter();
  const { setUserContext } = useContext(UserContext);

  const loginAction = async () => {
    setFetching(true);
    const response = await login(email, password, setUserContext);
    setFetching(false);

    if (response.ok) {
      router.push("/exercises");
    } else {
      const body: ResponseError = await response.json();
      setResponseError(body);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={loginAction}>
      {!fetching ? (
        <Text style={styles.buttonText}>Log In</Text>
      ) : (
        <Text style={styles.buttonText}>Loading...</Text>
      )}
    </TouchableOpacity>
  );
}

export default LoginScreen;
