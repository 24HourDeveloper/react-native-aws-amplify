import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Amplify, { Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";

import config from "./aws-exports";

Amplify.configure(config);

const App = () => {
  useEffect(() => {
    const user = getUseCredentials().then(data =>
      console.log(data.signInUserSession.idToken.payload)
    );
  });

  const getUseCredentials = async () => {
    const user = await Auth.currentAuthenticatedUser();
    return user;
  };

  const signOut = async () => {
    await Auth.signOut()
      .then(() => {
        console.log(`You're sign out now!`);
      })
      .catch(err => {
        console.log(`There was an error: ${err}`);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to my AWS Amplify App</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default withAuthenticator(App);
