import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Alert
} from "react-native";
const avatarImage =
  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";

const Login = ({ route, navigation }) => {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [errorMessage, onChangeErrorMessage] = React.useState(false);
  const [errorMessageName, onChangeErrorMessageName] = React.useState(false);

  const _storeData = async () => {
    try {
      await AsyncStorage.setItem(
        'credentials', "email: anmol1616jha@gmail.com, password: 9876543210"
      );
    } catch (error) {
      // Error saving data
    }
  };

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('credentials');
      if (value === "email: " + email + ", password: " + password) {
        navigation.navigate('List');
      }
      else{
        Alert.alert('Incorrect credentials');
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  React.useEffect(() => {
    // Adding Login data
    _storeData();
  }, []);

  const onPress = () => {
    let validation = false;

    // Validate Email ID
    if (
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        email
      )
    ) {
      validation = true;
      onChangeErrorMessageName(false);
    } else {
      validation = false;
      onChangeErrorMessageName(true);
    }

    // Validate Password
    if (/^[a-zA-Z0-9!@#$%^&*]{6,}$/.test(password)) {
      if (validation) {
        validation = true;
        onChangeErrorMessage(false);
      } else {
        validation = false;
        onChangeErrorMessage(false);
      }
    } else {
      validation = false;
      onChangeErrorMessage(true);
    }

    if (validation) {
      _retrieveData()
    }
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.formHeader}>
        <Text style={styles.formHeaderText}>LOGIN</Text>
      </View>

      <View style={styles.formBody}>
        <View style={styles.formComponentAvatar}>
          <Image source={{uri: avatarImage}} style={styles.avatarStyle} />
        </View>

        <View style={styles.formComponent}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={email}
            placeholder="Enter Email id"
            placeholderTextColor={"rgba(0, 0, 0, 0.4)"}
          />
          {errorMessageName ? (
            <Text style={styles.errorMessage}>*Invalid Email id</Text>
          ) : null}

          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            placeholder="Enter Password"
            placeholderTextColor={"rgba(0, 0, 0, 0.4)"}
          />
          {errorMessage ? (
            <Text style={styles.errorMessage}>
              *Invalid password. Password should be at least 6 digits.
            </Text>
          ) : null}
        </View>

        <View style={styles.formComponent}>
          <TouchableOpacity style={styles.addButton} onPress={onPress}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: "#F6F8FA",
    flex: 1
  },
  formHeader: {
    backgroundColor: "#00CAA7",
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  formHeaderText : {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff"
  },
  formBody: {
    marginTop: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "15%",
    marginRight: "15%"
  },
  avatarStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 20
  },
  formComponent: {
    width: "100%"
  },
  inputLabel: {
    paddingLeft: 5,
    paddingBottom: 5,
    fontSize: 15,
    fontWeight: "500"
  },
  input: {
    height: 40,
    width: "100%",
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "#00CAA7",
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    backgroundColor: '#ffffff'
  },
  errorMessage: {
    fontSize: 10,
    fontWeight: "600",
    color: "red",
    paddingLeft: 5,
    marginTop: -12
  },
  addButton: {
    backgroundColor: "#00CAA7",
    height: 40,
    width: "100%",
    marginBottom: 12,
    padding: 10,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff"
  }
});

export default Login;
