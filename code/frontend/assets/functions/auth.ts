import { localhost } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthResponse, User } from "@/domain/auth";

// the response status is checked here and inside loginAction (LoginScreen), there should be a way to be checked only once
export const login = async (email: string, password: string, setUserContext: React.Dispatch<React.SetStateAction<User | null>>) => {
  const response = await fetch(`${localhost}8080/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (response.ok) {
    const body: AuthResponse = await response.json();
    await storeUserLocally(body.obj);
    setUserContext(body.obj)
  }

  return response;
};

// the response status is checked here and inside signupAction (SignupScreen), there should be a way to be checked only once
export const signup = async (name: string, email: string, password: string, setUserContext: React.Dispatch<React.SetStateAction<User | null>>) => {

  const response = await fetch(`${localhost}8080/api/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: name,
      email: email,
      password: password,
    }),
  });

  if (response.ok) {
    const body: AuthResponse = await response.json();
    await storeUserLocally(body.obj);
    setUserContext(body.obj)
  }

  return response;
};

const storeUserLocally = async (user: User) => {
  const jsonValue = JSON.stringify(user);
  await AsyncStorage.setItem("user", jsonValue);
};

export const getLocalUser = async (): Promise<User | null> => {
  const userString = await AsyncStorage.getItem("user");

  if (!userString) return null;

  return JSON.parse(userString);
};
